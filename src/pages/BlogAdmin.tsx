import { FormEvent, useEffect, useMemo, useState } from "react";
import { Plus, ShieldCheck, Trash2, Users, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useWriters, Writer, WriterRole } from "@/context/WritersContext";

interface WriterFormState {
  name: string;
  email: string;
  password: string;
  role: WriterRole;
}

const initialWriterForm: WriterFormState = {
  name: "",
  email: "",
  password: "",
  role: "writer",
};

const NOTES_STORAGE_KEY = "discover-your-best-self:admin-notes";

const BlogAdmin = () => {
  const { writers, addWriter, updateWriter, deleteWriter, verifyCredentials } = useWriters();
  const { toast } = useToast();

  const [administrator, setAdministrator] = useState<Writer | null>(null);
  const [authError, setAuthError] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [addForm, setAddForm] = useState<WriterFormState>(initialWriterForm);
  const [editTarget, setEditTarget] = useState<Writer | null>(null);
  const [editPassword, setEditPassword] = useState("");
  const [notes, setNotes] = useState(() => {
    if (typeof window === "undefined") {
      return "There must always be at least one admin. Use strong passwords and share them securely.";
    }
    return window.localStorage.getItem(NOTES_STORAGE_KEY) ?? "There must always be at least one admin. Use strong passwords and share them securely.";
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(NOTES_STORAGE_KEY, notes);
  }, [notes]);

  const sortedWriters = useMemo(
    () =>
      [...writers].sort((a, b) => {
        if (a.role === b.role) {
          return a.name.localeCompare(b.name);
        }
        return a.role === "admin" ? -1 : 1;
      }),
    [writers],
  );

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "").trim();

    try {
      const account = await verifyCredentials(email, password);
      if (!account || account.role !== "admin") {
        setAuthError("You need an admin account to access this area.");
        return;
      }

      setAdministrator(account);
      setAuthError("");
      toast({
        title: "Admin access granted",
        description: `Welcome ${account.name}`,
      });
    } catch (error) {
      console.error(error);
      setAuthError("Unable to verify credentials right now.");
    }
  };

  const resetAddForm = () => {
    setAddForm(initialWriterForm);
  };

  const handleAddWriter = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await addWriter(addForm);
      toast({
        title: "Writer created",
        description: `${addForm.name || addForm.email} can now log in to the editor.`,
      });
      resetAddForm();
      setIsAddDialogOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast({ variant: "destructive", title: "Unable to create writer", description: error.message });
      } else {
        toast({ variant: "destructive", title: "Unable to create writer" });
      }
    }
  };

  const handleUpdateWriter = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editTarget) {
      return;
    }

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const role = (String(data.get("role") ?? editTarget.role) as WriterRole) ?? editTarget.role;
    const password = editPassword.trim();

    try {
      await updateWriter(editTarget.id, {
        name: name || editTarget.name,
        role,
        password: password || undefined,
      });
      toast({
        title: "Writer updated",
        description: `${name || editTarget.name} has been updated.`,
      });
      setEditTarget(null);
      setEditPassword("");
    } catch (error) {
      if (error instanceof Error) {
        toast({ variant: "destructive", title: "Unable to update writer", description: error.message });
      } else {
        toast({ variant: "destructive", title: "Unable to update writer" });
      }
    }
  };

  const handleDeleteWriter = async (writer: Writer) => {
    try {
      await deleteWriter(writer.id);
      toast({
        title: "Writer removed",
        description: `${writer.name} no longer has access.`,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({ variant: "destructive", title: "Unable to remove writer", description: error.message });
      } else {
        toast({ variant: "destructive", title: "Unable to remove writer" });
      }
    }
  };

  if (!administrator) {
    return (
      <main className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-6 max-w-lg">
          <Card className="border-primary/10 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <ShieldCheck className="h-6 w-6" />
                Admin Login
              </CardTitle>
              <CardDescription>Only administrator accounts can manage writers.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input id="admin-email" name="email" type="email" placeholder="admin@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input id="admin-password" name="password" type="password" placeholder="••••••••" required />
                </div>
                {authError ? <p className="text-sm text-destructive">{authError}</p> : null}
                <Button type="submit" className="w-full">
                  Enter Admin Panel
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-6 max-w-5xl space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-light text-foreground tracking-tight">Writer Access</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Signed in as <span className="font-medium text-foreground">{administrator.name}</span> (admin).
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setAdministrator(null)}>
              Sign out
            </Button>
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add writer
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Current writers
            </CardTitle>
            <CardDescription>
              Manage who can publish articles. Passwords update immediately and cannot be recovered once changed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sortedWriters.length === 0 ? (
              <p className="text-sm text-muted-foreground">No writers have been added yet.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {sortedWriters.map((writer) => (
                  <div key={writer.id} className="rounded-lg border border-border/70 bg-card p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-foreground">{writer.name}</p>
                        <p className="text-sm text-muted-foreground">{writer.email}</p>
                        <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
                          {writer.role}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditTarget(writer);
                            setEditPassword("");
                          }}
                          className="h-9 gap-2"
                        >
                          <Pencil className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteWriter(writer)}
                          className="h-9 gap-2 text-destructive hover:text-destructive"
                          disabled={writer.role === "admin" && sortedWriters.filter((item) => item.role === "admin").length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-dashed border-primary/20">
          <CardHeader>
            <CardTitle>Guidelines</CardTitle>
            <CardDescription>Share best practices or onboarding steps with new contributors.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} />
            <p className="text-xs text-muted-foreground">
              This note is stored locally in the browser so each admin can keep personal reminders.
            </p>
          </CardContent>
        </Card>

        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) {
            resetAddForm();
          }
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add writer</DialogTitle>
              <DialogDescription>Create login credentials for a new contributor.</DialogDescription>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleAddWriter}>
              <div className="space-y-2">
                <Label htmlFor="writer-name">Name</Label>
                <Input
                  id="writer-name"
                  value={addForm.name}
                  onChange={(event) => setAddForm((previous) => ({ ...previous, name: event.target.value }))}
                  placeholder="Full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="writer-email">Email</Label>
                <Input
                  id="writer-email"
                  type="email"
                  value={addForm.email}
                  onChange={(event) => setAddForm((previous) => ({ ...previous, email: event.target.value }))}
                  placeholder="writer@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="writer-password">Temporary password</Label>
                <Input
                  id="writer-password"
                  type="password"
                  value={addForm.password}
                  onChange={(event) => setAddForm((previous) => ({ ...previous, password: event.target.value }))}
                  placeholder="Generate a secure password"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select
                  value={addForm.role}
                  onValueChange={(value) => setAddForm((previous) => ({ ...previous, role: value as WriterRole }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="writer">Writer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create writer</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={Boolean(editTarget)} onOpenChange={(open) => {
          if (!open) {
            setEditTarget(null);
            setEditPassword("");
          }
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit writer</DialogTitle>
              <DialogDescription>Update name, role, or reset the password.</DialogDescription>
            </DialogHeader>
            {editTarget ? (
              <form className="space-y-4" onSubmit={handleUpdateWriter}>
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input id="edit-name" name="name" defaultValue={editTarget.name} required />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={editTarget.email} disabled />
                  <p className="text-xs text-muted-foreground">Email addresses cannot be changed.</p>
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select name="role" defaultValue={editTarget.role}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="writer">Writer</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-password">New password</Label>
                  <Input
                    id="edit-password"
                    name="password"
                    type="password"
                    value={editPassword}
                    onChange={(event) => setEditPassword(event.target.value)}
                    placeholder="Leave blank to keep current password"
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="ghost" onClick={() => {
                    setEditTarget(null);
                    setEditPassword("");
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
};

export default BlogAdmin;
