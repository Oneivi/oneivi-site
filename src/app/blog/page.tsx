// src/app/blog/page.tsx
import Image from "next/image";
import Link from "next/link";
import { allPosts, Post } from "contentlayer/generated";
import { compareDesc, parseISO, format } from "date-fns";

function formatDate(iso: string) {
  return format(parseISO(iso), "yyyy-MM-dd");
}

export default function BlogPage() {
  const posts = allPosts
    .filter((p) => !p.draft) // <- antes: p.published
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p: Post) => (
          <li key={p.slug} className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md">
            {p.cover && (
              <div className="relative aspect-[16/9] w-full">
                <Image src={p.cover} alt={p.title} fill className="object-cover" />
              </div>
            )}

            <div className="space-y-3 p-4">
              <time className="text-xs text-slate-500">{formatDate(p.date)}</time>
              <Link href={`/blog/${p.slug}`} className="block text-lg font-semibold leading-snug hover:text-blue-600">
                {p.title}
              </Link>
              {p.summary && <p className="line-clamp-3 text-sm text-slate-600">{p.summary}</p>}

              {!!p.tags?.length && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.tags.map((t: string) => (
                    <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
