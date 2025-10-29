// src/app/blog/[slug]/page.tsx
import Image from "next/image";
import { allPosts, type Post } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/Mdx";

type Params = { slug: string };

// Genera rutas estáticas para el blog
export function generateStaticParams(): Params[] {
  return allPosts.map((p: Post) => ({ slug: p.slug }));
}

function fmtDate(iso?: string) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("es-DO", { dateStyle: "long" }).format(new Date(iso));
}

// Campos opcionales del frontmatter que quizás no estén en tu schema de Contentlayer
type Extra = Partial<{
  summary: string;
  tags: string[];
  cover: string;
  readingTime: number;
}>;

// Narrowing sólido: asegura que tenemos un Post o hace 404
function assertPost(p: Post | undefined): asserts p is Post {
  if (!p) notFound();
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const maybePost: Post | undefined =
    allPosts.find((p) => p.slug === slug) ??
    allPosts.find((p) => p._raw.flattenedPath.replace(/^blog\//, "") === slug);

  // Si no existe, 404; a partir de aquí TS sabe que es Post
  assertPost(maybePost);
  const post = maybePost as Post & Extra;

  const summary = post.summary ?? post.description ?? "";
  const minutes =
    typeof post.readingTime === "number" ? post.readingTime : undefined;
  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl/tight font-bold tracking-tight">{post.title}</h1>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-500">
          {post.date ? <span>{fmtDate(post.date)}</span> : null}
          {minutes ? (
            <>
              <span>·</span>
              <span>{minutes} min de lectura</span>
            </>
          ) : null}
          {tags.length ? (
            <>
              <span>·</span>
              <ul className="flex flex-wrap gap-1">
                {tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
                  >
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
            <Image
              src={post.cover}
              alt={post.title}
              width={1280}
              height={720}
              className="h-auto w-full"
              priority
            />
          </div>
        ) : null}
      </header>

      <article className="prose prose-slate max-w-none prose-headings:font-semibold prose-h2:mt-10 prose-h3:mt-6 prose-li:my-1 prose-blockquote:border-l-4 prose-blockquote:pl-4">
        <Mdx code={post.body.code} />
      </article>
    </main>
  );
}
