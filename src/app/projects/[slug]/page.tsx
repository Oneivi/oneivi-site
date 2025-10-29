// src/app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabaseServer";

export const revalidate = 60;

type Params = { slug: string };

export default async function ProjectDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const supa = supabaseServer(); // si tu helper es async, usa: const supa = await supabaseServer();
  const { data, error } = await supa
    .from("projects_public")
    .select("id, title, slug, year, created_at")
    .eq("slug", slug)
    .single();

  if (error || !data) return notFound();

  return (
    <article className="mx-auto max-w-3xl p-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
        <h1 className="text-2xl font-bold tracking-tight">{data.title}</h1>
        <p className="mt-1 text-sm text-slate-600">Año: {data.year ?? "s/f"}</p>
        <hr className="my-6" />
        <p className="text-slate-700">Próximamente: descripción, stack, links, capturas…</p>
      </div>
    </article>
  );
}

// (Opcional) Si tienes generateMetadata aquí, también debe usar await params:
// export async function generateMetadata({ params }: { params: Promise<Params> }) {
//   const { slug } = await params;
//   return { title: `Proyecto: ${slug}` };
// }
