// src/app/page.tsx
import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";
import { allPosts } from "contentlayer/generated";
import type { Route } from "next";

type ProjectLite = { id: string; title: string; year: number | null; created_at?: string };

export const dynamic = "force-dynamic"; // para que los proyectos se actualicen en SSR

export default async function HomePage() {
  // 1) BLOG (Contentlayer, build-time)
  const posts = allPosts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);
  const postsCount = allPosts.filter((p) => !p.draft).length;

  // 2) PROYECTOS (Supabase, runtime)
  const supa = supabaseServer();
  const projRes = await supa
    .from("projects_public")
    .select("id, title, year, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(3);

  const latestProjects = (projRes.data ?? []) as ProjectLite[];
  const projectsCount = projRes.count ?? 0;

  // si aún no tienes tabla de consultorías, déjalo fijo
  const consultingCount = 5;

  return (
    <section className="grid gap-10 md:grid-cols-2 md:items-center">
      {/* IZQUIERDA */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-slate-600">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Disponible para proyectos y consultoría
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Hola, soy <span className="text-blue-600">Jose Oneivi</span>
        </h1>

        <p className="max-w-prose text-base leading-7 text-slate-700">
          IT Superintendent @ DAS Medical. Desarrollo con Next.js, Supabase, Python y Electron.
          También diseño e implemento redes empresariales (Ruckus) e integraciones con ERP.
        </p>

        <ul className="grid gap-2 text-sm text-slate-700">
          <li>• {projectsCount}+ proyectos entregados</li>
          <li>• Especialidad: Next.js 15 (App Router), Supabase/Postgres, Electron</li>
          <li>• Infra: Ruckus Wi-Fi, Acumatica ERP, impresión Zebra ZT411</li>
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
          <li className="rounded-full bg-slate-100 px-2 py-1">Next.js 15</li>
          <li className="rounded-full bg-slate-100 px-2 py-1">TypeScript</li>
          <li className="rounded-full bg-slate-100 px-2 py-1">Supabase</li>
          <li className="rounded-full bg-slate-100 px-2 py-1">Python</li>
          <li className="rounded-full bg-slate-100 px-2 py-1">Electron</li>
          <li className="rounded-full bg-slate-100 px-2 py-1">Ruckus/Wi-Fi</li>
        </ul>
      </div>

      {/* DERECHA */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Stack</p>
              <p className="mt-1 font-medium">Next.js · React · TypeScript · Python · Electron</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Infra</p>
              <p className="mt-1 font-medium">Supabase/Postgres · Ruckus Wi-Fi · Acumatica ERP · Zebra</p>
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
            {latestProjects.length ? (
              latestProjects.map((p) => (
                <li key={p.id}>
                  <Link
                    href={{ pathname: "/projects" }}
                    className="text-blue-600 hover:underline"
                  >
                    • {p.title} {p.year ? `(${p.year})` : ""}
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-slate-500">Pronto…</li>
            )}
          </ul>

          </div>

          <div className="rounded-xl border bg-white p-4">
            <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">Del blog</div>
            <ul className="space-y-2 text-sm">
              {posts.length ? (
                posts.map((p) => (
                  <li key={p.slug}>
                    <Link href={p.url as Route}>
                      • {p.title}
                    </Link>
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
    </section>
  );
}
