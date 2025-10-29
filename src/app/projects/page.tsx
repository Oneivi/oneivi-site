import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const revalidate = 60;

type Row = {
  id: string;
  title: string;
  slug: string | null;
  year: number | null;
  created_at: string;
};

export default async function ProjectsPage() {
  const supa = supabaseServer();
  const { data, error } = await supa
    .from("projects_public")
    .select("id, title, slug, year, created_at")
    .order("year", { ascending: false });

  if (error) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
          Hubo un problema cargando los proyectos: {error.message}
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="rounded-xl border border-dashed p-8 text-center">
          <h2 className="text-xl font-semibold">Aún no hay proyectos publicados</h2>
          <p className="mt-2 text-sm text-slate-600">
            Cuando agregues proyectos en Supabase, aparecerán aquí.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-5xl p-6">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Proyectos</h1>
          <p className="mt-1 text-sm text-slate-600">Algunos de los trabajos recientes.</p>
        </div>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/*
        {data.map((p: Row) => (
          <li key={p.id}>
            {p.slug ? (
              <Link href={`/projects/${p.slug}`} className="group block h-full">
                <article className="h-full rounded-2xl border bg-white/70 p-5 shadow-sm ring-1 ring-black/5 transition
                                     hover:-translate-y-0.5 hover:shadow-md">
                  <div className="mb-3 flex items-center gap-2">
                    {p.year && (
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium
                                        text-slate-700">
                        Año {p.year}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold leading-snug text-slate-900 group-hover:text-blue-700">
                    {p.title}
                  </h3>
                  <div className="mt-4 text-xs text-slate-500">
                    Actualizado {new Date(p.created_at).toLocaleDateString("es-DO")}
                  </div>
                </article>
              </Link>
            ) : (
              <article className="rounded-2xl border bg-white/70 p-5 shadow-sm ring-1 ring-black/5 opacity-70">
                <h3 className="text-base font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600">Sin slug</p>
              </article>
            )}
          </li>
        ))}*/}
      </ul>

      <span>Pronto...</span>


    </section>
  );
}
