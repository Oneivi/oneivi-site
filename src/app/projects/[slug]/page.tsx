// src/app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabaseServer";

export const revalidate = 60;

export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  const supa = supabaseServer();
  const { data, error } = await supa
    .from("projects_public")
    .select("id, title, slug, year, created_at")
    .eq("slug", params.slug)
    .single();

  if (error || !data) return notFound();

  return (
    <article className="prose max-w-none">
      <h1>{data.title}</h1>
      <p className="text-slate-600">Año: {data.year ?? "s/f"}</p>
      {/* Aquí puedes renderizar más campos si los agregas (descripcion, stack, links, etc.) */}
    </article>
  );
}
