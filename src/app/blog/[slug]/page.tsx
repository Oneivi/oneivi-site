import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { useMDXComponent } from "next-contentlayer/hooks";

export const dynamic = "force-static";

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find(p => p.slug === params.slug);
  if (!post) return notFound();
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="prose prose-zinc max-w-none prose-headings:scroll-mt-20">
      <h1>{post.title}</h1>
      <p className="!mt-0 text-sm text-zinc-500">{new Date(post.date).toLocaleDateString()} • {post.tags?.join(", ")}</p>
      <MDXContent />
    </article>
  );
}
