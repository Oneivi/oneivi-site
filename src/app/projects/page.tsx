// src/app/projects/page.tsx
import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

type Row = { id: string; title: string; slug: string | null; year: number | null; created_at: string };

export const revalidate = 60; // cache ligera (o usa dynamic="force-dynamic")

export default async function ProjectsPage() {
  const supa = supabaseServer();

  const { data, count, error } = await supa
    .from("projects_public")
    .select("id, title, slug, year, created_at", { count: "exact" })
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="text-red-600">Error: {error.message}</div>;
  }

  const rows = (data ?? []) as Row[];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Proyectos</h1>
        <p className="text-slate-600">{count ?? 0} publicados</p>
      </header>

      {rows.length === 0 ? (
        <div className="text-slate-500">Pronto…</div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((p) => (
            <li key={p.id} className="rounded-xl border bg-white p-4">
              <h3 className="font-medium">
                <Link
                  className="text-blue-600 hover:underline"
                  href={p.slug ? { pathname: "/projects/[slug]", query: { slug: p.slug } } : { pathname: "/projects" }}
                >
                  {p.title}
                </Link>
              </h3>
              <div className="text-sm text-slate-500">{p.year ?? "s/f"}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
