import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { Eye, FileText, Link as LinkIcon, LogIn, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Attachment, BlogPostDraft, useBlog } from "@/context/BlogContext";
import { useWriters, Writer } from "@/context/WritersContext";

interface BlogFormState {
  title: string;
  author: string;
  summary: string;
  content: string;
  tags: string;
}

interface LinkDraft {
  label: string;
  url: string;
}

const initialFormState: BlogFormState = {
  title: "",
  author: "",
  summary: "",
  content: "",
  tags: "",
};

const BlogManager = () => {
  const { addPost } = useBlog();
  const { verifyCredentials } = useWriters();
  const { toast } = useToast();

  const [writer, setWriter] = useState<Writer | null>(null);
  const [authError, setAuthError] = useState("");

  const [formData, setFormData] = useState<BlogFormState>(initialFormState);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [linkDraft, setLinkDraft] = useState<LinkDraft>({ label: "", url: "" });
  const [previewData, setPreviewData] = useState<BlogPostDraft | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);

  const isFormValid = useMemo(() => {
    return Boolean(formData.title.trim()) && Boolean(formData.content.trim()) && Boolean(formData.summary.trim());
  }, [formData]);

  const handleAuthSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "").trim();

    try {
      const credentials = await verifyCredentials(email, password);
      if (!credentials) {
        setAuthError("Those credentials do not match our records.");
        return;
      }

      if (credentials.role !== "admin" && credentials.role !== "writer") {
        setAuthError("Your account does not have permission to publish posts.");
        return;
      }

      setWriter(credentials);
      setAuthError("");
      toast({
        title: "Welcome back",
        description: `Logged in as ${credentials.name}`,
      });
    } catch (error) {
      console.error(error);
      setAuthError("Unable to verify your credentials right now.");
    }
  };

  const handleInputChange = (field: keyof BlogFormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((previous) => ({
      ...previous,
      [field]: event.target.value,
    }));
  };

  const handleAddLink = () => {
    const trimmedUrl = linkDraft.url.trim();
    if (!trimmedUrl) {
      return;
    }

    const label = linkDraft.label.trim() || trimmedUrl;
    setAttachments((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        type: "link",
        name: label,
        url: trimmedUrl,
      },
    ]);
    setLinkDraft({ label: "", url: "" });
  };

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFileAttachments = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) {
      return;
    }

    setIsProcessingFiles(true);

    try {
      const converted = await Promise.all(
        files.map(async (file) => ({
          id: crypto.randomUUID(),
          type: "file" as const,
          name: file.name,
          url: await fileToDataUrl(file),
          size: file.size,
        })),
      );

      setAttachments((previous) => [...previous, ...converted]);
      toast({
        title: `${converted.length} attachment${converted.length > 1 ? "s" : ""} added`,
        description: "Files will be available for download once the post is published.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Unable to read one of the files",
        description: "Please try again or use a different document format.",
      });
    } finally {
      setIsProcessingFiles(false);
      setFileInputKey((value) => value + 1);
    }
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments((previous) => previous.filter((attachment) => attachment.id !== id));
  };

  const handlePreview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) {
      toast({
        variant: "destructive",
        title: "Missing content",
        description: "Title, summary, and content are required before previewing.",
      });
      return;
    }

    const normalizedTags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    setPreviewData({
      title: formData.title.trim(),
      author: formData.author.trim() || "Editorial Team",
      summary: formData.summary.trim(),
      content: formData.content.trim(),
      tags: normalizedTags,
      attachments,
    });
    setIsPreviewOpen(true);
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setAttachments([]);
    setLinkDraft({ label: "", url: "" });
    setFileInputKey((value) => value + 1);
  };

  const handlePublish = () => {
    if (!previewData) {
      return;
    }

    addPost(previewData);
    setIsPreviewOpen(false);
    resetForm();
    toast({
      title: "Post published",
      description: "Your article is now live on the blog page.",
    });
  };

  if (!writer) {
    return (
      <main className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-6 max-w-lg">
          <Card className="border-primary/10 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <LogIn className="h-6 w-6" />
                Blog Editor Login
              </CardTitle>
              <CardDescription>
                Use the editorial credentials to access the blog publishing tools.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleAuthSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" placeholder="••••••••" required />
                </div>
                {authError ? <p className="text-sm text-destructive">{authError}</p> : null}
                <Button type="submit" className="w-full">
                  Access Editor
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
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-12 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-light text-foreground tracking-tight">Create a Blog Post</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Signed in as <span className="font-medium text-foreground">{writer.name}</span> ({writer.role}).
              </p>
            </div>
            <Button type="button" variant="outline" onClick={() => setWriter(null)}>
              Sign out
            </Button>
          </div>
          <p className="text-muted-foreground text-lg">
            Draft your article, attach supplemental documents or links, preview the final layout, and publish to the blog.
          </p>
        </div>

        <form className="space-y-10" onSubmit={handlePreview}>
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" value={formData.title} onChange={handleInputChange("title")} placeholder="Headline for the article" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" value={formData.author} onChange={handleInputChange("author")} placeholder="Dr. Faith Consiglio" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="summary">Summary *</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={handleInputChange("summary")}
                placeholder="A short paragraph that introduces the article."
                rows={4}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={handleInputChange("content")}
                placeholder="Write the full body of the article here."
                rows={12}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={handleInputChange("tags")}
                placeholder="Comma separated tags, e.g. mindfulness, anxiety"
              />
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="md:col-span-1 border-dashed border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <FileText className="h-5 w-5" />
                  Document Attachments
                </CardTitle>
                <CardDescription>Upload PDFs, handouts, or supporting materials.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  key={fileInputKey}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.rtf,.png,.jpg,.jpeg"
                  multiple
                  onChange={handleFileAttachments}
                  disabled={isProcessingFiles}
                />
                <p className="text-xs text-muted-foreground">
                  Accepted formats: PDF, Word documents, text files, and images. Files are stored locally in this browser session.
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-1 border-dashed border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <LinkIcon className="h-5 w-5" />
                  Reference Links
                </CardTitle>
                <CardDescription>Share helpful articles or external resources.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="link-label">Link label</Label>
                  <Input
                    id="link-label"
                    value={linkDraft.label}
                    onChange={(event) => setLinkDraft((previous) => ({ ...previous, label: event.target.value }))}
                    placeholder="Resource title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link-url">URL</Label>
                  <Input
                    id="link-url"
                    value={linkDraft.url}
                    onChange={(event) => setLinkDraft((previous) => ({ ...previous, url: event.target.value }))}
                    placeholder="https://"
                    type="url"
                  />
                </div>
                <Button type="button" variant="secondary" onClick={handleAddLink} disabled={!linkDraft.url.trim()}>
                  Add Link
                </Button>
              </CardContent>
            </Card>
          </section>

          {attachments.length ? (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Attachments</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {attachments.map((attachment) => (
                  <Card key={attachment.id} className="border-border/70">
                    <CardContent className="flex items-center justify-between gap-4 py-4">
                      <div>
                        <p className="font-medium text-foreground">{attachment.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {attachment.type === "file" ? "Document" : "External link"}
                        </p>
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveAttachment(attachment.id)}>
                        <Trash2 className="h-5 w-5" />
                        <span className="sr-only">Remove attachment</span>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <p className="text-sm text-muted-foreground">You will be able to review the full post before final publishing.</p>
            <Button type="submit" size="lg" disabled={!isFormValid || isProcessingFiles} className="gap-2">
              <Eye className="h-5 w-5" />
              Preview Post
            </Button>
          </div>
        </form>

        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Preview Post</DialogTitle>
              <DialogDescription>Review the article. Click publish when you are ready.</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-1">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold text-foreground">{previewData?.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {previewData?.author ? `By ${previewData.author}` : "Editorial Team"}
                </p>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">{previewData?.summary}</p>
              <article className="prose prose-neutral max-w-none whitespace-pre-wrap text-foreground">
                {previewData?.content}
              </article>

              {previewData?.tags.length ? (
                <div className="flex flex-wrap gap-2 pt-2">
                  {previewData.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}

              {previewData?.attachments.length ? (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Attachments</h3>
                  <ul className="space-y-2">
                    {previewData.attachments.map((attachment) => (
                      <li key={attachment.id} className="flex items-center justify-between rounded-md border border-border/70 px-3 py-2">
                        <div>
                          <p className="font-medium text-sm text-foreground">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {attachment.type === "file" ? "Downloadable document" : attachment.url}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={attachment.url} target="_blank" rel="noopener noreferrer" download={attachment.type === "file" ? attachment.name : undefined}>
                            {attachment.type === "file" ? "Download" : "Open link"}
                          </a>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
            <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Button type="button" variant="ghost" onClick={() => setIsPreviewOpen(false)}>
                Continue Editing
              </Button>
              <Button type="button" onClick={handlePublish} disabled={!previewData}>
                Publish to Blog
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
};

export default BlogManager;
