import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface Attachment {
  id: string;
  type: "file" | "link";
  name: string;
  url: string;
  size?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  summary: string;
  content: string;
  tags: string[];
  createdAt: string;
  attachments: Attachment[];
}

export type BlogPostDraft = Omit<BlogPost, "id" | "createdAt">;

interface BlogContextValue {
  posts: BlogPost[];
  addPost: (post: BlogPostDraft) => void;
}

const STORAGE_KEY = "discover-your-best-self:blog-posts";

const fallbackPosts: BlogPost[] = [
  {
    id: "welcome-post",
    title: "Welcome to Discover Your Best Self",
    author: "Editorial Team",
    summary: "An introduction to our practice philosophy and what you can expect from our care team.",
    content:
      "At Discover Your Best Self we combine evidence-based psychiatry with compassionate listening. This space will feature educational resources, reflections from Dr. Faith Consiglio, and practical tips you can apply between visits. Check back often for updates.",
    tags: ["introduction", "practice"],
    createdAt: new Date().toISOString(),
    attachments: [],
  },
];

const BlogContext = createContext<BlogContextValue | undefined>(undefined);

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    if (typeof window === "undefined") {
      return fallbackPosts;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return fallbackPosts;
    }

    try {
      const parsed = JSON.parse(stored) as BlogPost[];
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (error) {
      console.warn("Failed to parse blog posts from storage", error);
    }

    return fallbackPosts;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (error) {
      console.warn("Unable to persist blog posts", error);
    }
  }, [posts]);

  const addPost = useCallback((draft: BlogPostDraft) => {
    setPosts((prev) => [
      {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...draft,
      },
      ...prev,
    ]);
  }, []);

  const value = useMemo(
    () => ({
      posts,
      addPost,
    }),
    [posts, addPost],
  );

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBlog = () => {
  const context = useContext(BlogContext);

  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }

  return context;
};
