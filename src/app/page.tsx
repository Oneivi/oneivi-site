// src/app/page.tsx
import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";
import { allPosts } from "contentlayer/generated";
import type { Post } from "contentlayer/generated";
import type { Route } from "next";
import Highlights, { HighlightIcons, type Highlight } from "@/components/Highlights";


type ProjectLite = { id: string; title: string; year: number | null; created_at?: string };

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // BLOG (Contentlayer, build-time)
  const published: Post[] = (allPosts as Post[]).filter((p: Post) => !p.draft);
  const posts: Post[] = [...published]
    .sort((a: Post, b: Post) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);
  const postsCount = published.length;

  // PROYECTOS (Supabase, runtime)
  const supa = supabaseServer();
  const projRes = await supa
    .from("projects_public")
    .select("id, title, year, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(3);

  const latestProjects = (projRes.data ?? []) as ProjectLite[];
  const projectsCount = projRes.count ?? 0;

  const consultingCount = 5;

  const highlights = [
  {
    id: "h-it-projects",
    title: "30+ proyectos de IT",
    subtitle: "Entrega & liderazgo",
    description:
      "Automatización, ERP, redes e infraestructura en DAS Medical. Resultados medibles.",
  },

  {
    id: "h-erp-iot",
    title: "Integraciones ERP + IoT",
    subtitle: "ERP & Zebra",
    description:
      "Integración con ERP e impresoras Zebra.",
  },

];

  return (
    <section className="grid gap-10 md:grid-cols-2 md:items-center">
      {/* IZQUIERDA */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-slate-600">
          <span className="h-2 w-2 rounded-full bg-green-500" />
        {/* Disponible para proyectos y consultoría */}
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Hola, soy <span className="text-blue-600">Jose Oneivi</span>
        </h1>

        <p className="max-w-prose text-base leading-7 text-slate-700">
          Soy una persona apasionada por la tecnología, la innovación y el aprendizaje constante.
          Actualmente trabajo como IT Superintendent en DAS Medical UFPT, pero este espacio no busca centrarse solo en mi experiencia profesional, sino en compartir conocimiento: desde proyectos y retos de las distintas areas de TI hasta ideas, tareas o temas que me llaman la atención en mi día a día como estudiante y profesional.
          Creo que compartir conocimiento es una de las mejores formas de seguir creciendo.
        </p>

        <ul className="grid gap-2 text-sm text-slate-700">
          <li>• {projectsCount}+ proyectos publicados e iniciativas lideradas en TI</li>
           <li>• Especialidad: Next.js 15 (App Router), Supabase/Postgres, Electron</li>
          <li>• Experiencia en infraestructura: Cisco, Ruckus Wi-Fi, SonicWall, Acumatica ERP, Zebra</li>
          <li>• Enfoque en innovacion, automatización, integración y eficiencia operativa</li>
        </ul>

        <div className="flex flex-wrap gap-3">
          <Link href="/blog" className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-white shadow-sm transition hover:bg-blue-700">
            Leer el blog
          </Link>
          <Link href="/projects" className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 shadow-sm transition hover:bg-slate-50">
            Ver proyectos
          </Link>
          <Link href="/cv" className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 shadow-sm transition hover:bg-slate-50">
            Ver CV
          </Link>
          <Link href="/contacto" className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 shadow-sm transition hover:bg-slate-50">
            Contacto
          </Link>
        </div>

        <ul className="flex flex-wrap gap-2 text-xs text-slate-500">
        <li className="rounded-full bg-slate-100 px-2 py-1">Next.js 15 (App Router)</li>
        <li className="rounded-full bg-slate-100 px-2 py-1">TypeScript</li>
        <li className="rounded-full bg-slate-100 px-2 py-1">Supabase / Postgres</li>
        <li className="rounded-full bg-slate-100 px-2 py-1">Python</li>
        <li className="rounded-full bg-slate-100 px-2 py-1">Electron</li>
        <li className="rounded-full bg-slate-100 px-2 py-1">ERP Integrations (Acumatica)</li>
        <li className="rounded-full bg-slate-100 px-2 py-1">Power BI</li>
        <li className="rounded-full bg-slate-100 px-2 py-1">SQL Server</li>
        <li className="rounded-full bg-slate-100 px-2 py-1">Power Automate</li>
        <li className="rounded-full bg-slate-100 px-2 py-1">Ruckus Wi-Fi / Network Design</li>
        <li className="rounded-full bg-slate-100 px-2 py-1">Automation & IT Management</li>
      </ul>
      </div>

      {/* DERECHA */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Stack</p>
            <p className="mt-1 font-medium">
              Next.js 15 · TypeScript · Supabase/Postgres · Python · Electron
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Infra</p>
            <p className="mt-1 font-medium">
              Acumatica ERP · Ruckus Wi-Fi · SQL Server · Power BI · Zebra ZT411
            </p>
          </div>
        </div>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg border bg-white p-3">
              <div className="text-xs text-slate-500">Proyectos</div>
              <div className="text-2xl font-semibold">{projectsCount}</div>
            </div>
            <div className="rounded-lg border bg-white p-3">
              <div className="text-xs text-slate-500">Artículos</div>
              <div className="text-2xl font-semibold">{postsCount}</div>
            </div>
            <div className="rounded-lg border bg-white p-3">
              <div className="text-xs text-slate-500">Consultorías</div>
              <div className="text-2xl font-semibold">{consultingCount}</div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border bg-white p-4">
            <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">Últimos proyectos</div>
            <ul className="space-y-2 text-sm">
              {/*
              {latestProjects.length ? (
                latestProjects.map((p: ProjectLite) => (
                  <li key={p.id}>
                    <Link href={{ pathname: "/projects" }} className="text-blue-600 hover:underline">
                      • {p.title} {p.year ? `(${p.year})` : ""}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-slate-500">Pronto…</li>
              )}*/}
            </ul>
          </div>

          <div className="rounded-xl border bg-white p-4">
            <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">Del blog</div>
            <ul className="space-y-2 text-sm">
              {posts.length ? (
                posts.map((p: Post) => (
                  <li key={p._id}>
                    {/* Usa slug para construir la URL si no tienes 'url' como computedField */}
                    <Link href={`/blog/${p.slug}` as Route}>• {p.title}</Link>
                  </li>
                ))
              ) : (
                <li className="text-slate-500">Pronto…</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-4 rounded-xl border bg-slate-50 p-4 text-sm">
          ¿Buscas ayuda con un proyecto?{" "}
          <Link href="/contacto" className="font-medium text-blue-700 underline">Hablemos</Link>.
        </div>
      </div>

      <Highlights items={highlights} />

    </section>

  );
}
