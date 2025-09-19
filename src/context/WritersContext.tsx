import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export type WriterRole = "admin" | "writer";

export interface Writer {
  id: string;
  name: string;
  email: string;
  role: WriterRole;
  passwordHash: string;
}

interface CreateWriterInput {
  name: string;
  email: string;
  role: WriterRole;
  password: string;
}

interface UpdateWriterInput {
  name?: string;
  role?: WriterRole;
  password?: string;
}

interface WritersContextValue {
  writers: Writer[];
  addWriter: (input: CreateWriterInput) => Promise<void>;
  updateWriter: (id: string, input: UpdateWriterInput) => Promise<void>;
  deleteWriter: (id: string) => Promise<void>;
  verifyCredentials: (email: string, password: string) => Promise<Writer | null>;
}

const STORAGE_KEY = "discover-your-best-self:writers";
const DEFAULT_ADMIN_EMAIL = "editor@discover.com";
const DEFAULT_ADMIN_PASSWORD_HASH = "7fd3e909f42a8d5edcd3e87cce00d38c3b42982a1edff7c104fb20b7c57eec16"; // sha256("care-admin")

const defaultAdmin: Writer = {
  id: "default-admin",
  name: "Content Admin",
  email: DEFAULT_ADMIN_EMAIL,
  role: "admin",
  passwordHash: DEFAULT_ADMIN_PASSWORD_HASH,
};

const WritersContext = createContext<WritersContextValue | undefined>(undefined);

const getSubtleCrypto = () => {
  if (typeof window !== "undefined" && window.crypto?.subtle) {
    return window.crypto.subtle;
  }

  if (typeof globalThis !== "undefined") {
    const globalCrypto = (globalThis as typeof globalThis & { crypto?: Crypto }).crypto;
    if (globalCrypto?.subtle) {
      return globalCrypto.subtle;
    }
    // @ts-expect-error Node's webcrypto lives under crypto.webcrypto
    if (globalCrypto?.webcrypto?.subtle) {
      // @ts-expect-error Node 18 specific
      return globalCrypto.webcrypto.subtle;
    }
  }

  return null;
};

const hashPassword = async (password: string) => {
  const subtle = getSubtleCrypto();
  const encoder = new TextEncoder();

  if (!subtle) {
    // Fallback – returns plaintext when hashing is unavailable
    return password;
  }

  const data = encoder.encode(password);
  const digest = await subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

const ensureDefaultAdmin = (writers: Writer[]) => {
  if (writers.some((writer) => writer.email === DEFAULT_ADMIN_EMAIL)) {
    return writers;
  }

  return [defaultAdmin, ...writers];
};

export const WritersProvider = ({ children }: { children: React.ReactNode }) => {
  const [writers, setWriters] = useState<Writer[]>(() => {
    if (typeof window === "undefined") {
      return [defaultAdmin];
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [defaultAdmin];
    }

    try {
      const parsed = JSON.parse(stored) as Writer[];
      if (!Array.isArray(parsed)) {
        return [defaultAdmin];
      }
      return ensureDefaultAdmin(parsed);
    } catch (error) {
      console.warn("Failed to parse writers from storage", error);
      return [defaultAdmin];
    }
  });

  const writersRef = useRef(writers);

  useEffect(() => {
    writersRef.current = writers;
  }, [writers]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(writers));
    } catch (error) {
      console.warn("Unable to persist writers", error);
    }
  }, [writers]);

  useEffect(() => {
    setWriters((previous) => ensureDefaultAdmin(previous));
  }, []);

  const addWriter = useCallback(async ({ name, email, role, password }: CreateWriterInput) => {
    const normalizedEmail = email.trim().toLowerCase();
    const sanitizedName = name.trim() || normalizedEmail;
    const passwordHash = await hashPassword(password);

    let duplicate = false;
    setWriters((previous) => {
      if (previous.some((writer) => writer.email === normalizedEmail)) {
        duplicate = true;
        return previous;
      }

      const newWriter: Writer = {
        id: crypto.randomUUID(),
        name: sanitizedName,
        email: normalizedEmail,
        role,
        passwordHash,
      };

      return [...previous, newWriter];
    });

    if (duplicate) {
      throw new Error("A writer with that email already exists.");
    }
  }, []);

  const updateWriter = useCallback(async (id: string, { name, role, password }: UpdateWriterInput) => {
    const sanitizedName = name?.trim();
    const passwordHash = password ? await hashPassword(password) : undefined;

    let result: "ok" | "missing" = "ok";

    setWriters((previous) => {
      const index = previous.findIndex((writer) => writer.id === id);
      if (index === -1) {
        result = "missing";
        return previous;
      }

      const updated: Writer = {
        ...previous[index],
        name: sanitizedName ?? previous[index].name,
        role: role ?? previous[index].role,
        passwordHash: passwordHash ?? previous[index].passwordHash,
      };

      const clone = [...previous];
      clone[index] = updated;
      return clone;
    });

    if (result === "missing") {
      throw new Error("Writer could not be found.");
    }
  }, []);

  const deleteWriter = useCallback(async (id: string) => {
    let outcome: "ok" | "missing" | "needsAdmin" = "ok";

    setWriters((previous) => {
      const index = previous.findIndex((writer) => writer.id === id);
      if (index === -1) {
        outcome = "missing";
        return previous;
      }

      const writer = previous[index];
      const remaining = previous.filter((item) => item.id !== id);

      if (writer.role === "admin" && !remaining.some((item) => item.role === "admin")) {
        outcome = "needsAdmin";
        return previous;
      }

      return remaining;
    });

    if (outcome === "missing") {
      throw new Error("Writer could not be found.");
    }

    if (outcome === "needsAdmin") {
      throw new Error("At least one admin account must remain.");
    }
  }, []);

  const verifyCredentials = useCallback(
    async (email: string, password: string) => {
      const normalizedEmail = email.trim().toLowerCase();
      const passwordHash = await hashPassword(password);
      const match = writersRef.current.find(
        (writer) => writer.email === normalizedEmail && writer.passwordHash === passwordHash,
      );
      return match ?? null;
    },
    [],
  );

  const value = useMemo(
    () => ({
      writers,
      addWriter,
      updateWriter,
      deleteWriter,
      verifyCredentials,
    }),
    [writers, addWriter, updateWriter, deleteWriter, verifyCredentials],
  );

  return <WritersContext.Provider value={value}>{children}</WritersContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWriters = () => {
  const context = useContext(WritersContext);
  if (!context) {
    throw new Error("useWriters must be used within a WritersProvider");
  }
  return context;
};
