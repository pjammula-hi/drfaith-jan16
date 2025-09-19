import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBlog } from "@/context/BlogContext";

const Blog = () => {
  const { posts } = useBlog();

  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-8 tracking-tight">Blog</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explore reflections on mental wellness, treatment insights, and stories from Discover Your Best Self.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {posts.length === 0 ? (
            <Card className="border-dashed border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">No posts yet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Once articles are published they will appear here. Use the blog manager to create your first story.
                </p>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="rounded-2xl border border-border/60 bg-card shadow-sm">
                <CardHeader className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <CardTitle className="text-3xl font-semibold text-foreground">{post.title}</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(post.createdAt), "MMMM d, yyyy")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">By {post.author || "Editorial Team"}</p>
                  <p className="text-base text-muted-foreground leading-relaxed">{post.summary}</p>
                  {post.tags.length ? (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-neutral max-w-none whitespace-pre-wrap text-foreground">
                    {post.content}
                  </div>

                  {post.attachments.length ? (
                    <div className="rounded-lg border border-border/70 bg-background/60 p-4">
                      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Attachments</h3>
                      <ul className="mt-3 space-y-2 text-sm">
                        {post.attachments.map((attachment) => (
                          <li key={attachment.id} className="flex items-center justify-between rounded-md bg-card/80 px-3 py-2">
                            <div>
                              <p className="font-medium text-foreground">{attachment.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {attachment.type === "file" ? "Document" : attachment.url}
                              </p>
                            </div>
                            <a
                              href={attachment.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              download={attachment.type === "file" ? attachment.name : undefined}
                              className="text-sm font-medium text-primary hover:underline"
                            >
                              {attachment.type === "file" ? "Download" : "Open"}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </CardContent>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default Blog;
