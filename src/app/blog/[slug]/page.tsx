// src/app/blog/[slug]/page.tsx
import Image from "next/image";
import { allPosts, type Post } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/Mdx";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return allPosts.map((p: Post) => ({ slug: p.slug }));
}

function fmtDate(iso: string) {
  return new Intl.DateTimeFormat("es-DO", { dateStyle: "long" }).format(new Date(iso));
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params; // ← satisface el constraint de Next
  const post =
    allPosts.find((p) => p.slug === slug) ??
    allPosts.find((p) => p._raw.flattenedPath.replace(/^blog\//, "") === slug);

  if (!post) return notFound();

  const summary = post.summary ?? post.description ?? "";
  const minutes = typeof post.readingTime === "number" ? post.readingTime : undefined;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl/tight font-bold tracking-tight">{post.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-500">
          <span>{fmtDate(post.date)}</span>
          {minutes ? (<><span>·</span><span>{minutes} min de lectura</span></>) : null}
          {post.tags?.length ? (
            <>
              <span>·</span>
              <ul className="flex flex-wrap gap-1">
                {post.tags.map((t) => (
                  <li key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                    {t}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
        {summary ? <p className="mt-3 text-slate-700">{summary}</p> : null}
        {post.cover ? (
          <div className="mt-6 overflow-hidden rounded-xl border">
            <Image src={post.cover} alt={post.title} width={1280} height={720} className="h-auto w-full" priority />
          </div>
        ) : null}
      </header>

      <article className="prose prose-slate max-w-none prose-headings:font-semibold prose-h2:mt-10 prose-h3:mt-6 prose-li:my-1 prose-blockquote:border-l-4 prose-blockquote:pl-4">
        <Mdx code={post.body.code} />
      </article>
    </main>
  );
}
