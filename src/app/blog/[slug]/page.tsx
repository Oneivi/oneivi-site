import { allPosts, type Post } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { useMDXComponent } from "next-contentlayer/hooks";

export const dynamic = "force-static";

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = (allPosts as Post[]).find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="prose max-w-none">
      <h1>{post.title}</h1>
      <p className="text-sm text-slate-500">{new Date(post.date).toLocaleDateString()}</p>
      <MDXContent />
    </article>
  );
}
