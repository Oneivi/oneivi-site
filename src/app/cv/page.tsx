export const dynamic = "force-static";

const cv = {
  name: "Jose Oneivi Rodriguez",
  title: "IT Superintendent / Full‑stack",
  summary: "+7 años implementando soluciones IT en manufactura, Next.js, Supabase, redes empresariales.",
  experience: [
    {
      role: "Superintendente de IT",
      org: "DAS Medical UFPT",
      period: "Nov 2024 — Presente",
      bullets: [
        "Lideré 30+ iniciativas IT (automatización, infraestructura, ERP)",
        "Diseño de red multi-edificio con failover Starlink",
      ],
    },
  ],
  skills: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Docker", "Networking"],
  certs: ["Python", "DevOps", "Ciberseguridad", "SQL", "SQL Server Admin"],
  links: {
    github: "https://github.com/Oneivi",
    linkedin: "https://linkedin.com/in/oneivi",
  },
};

export default function CVPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">{cv.name}</h1>
      <p className="text-zinc-600">{cv.title}</p>
      <p>{cv.summary}</p>

      <section>
        <h2 className="text-xl font-semibold">Experiencia</h2>
        <ul className="mt-2 space-y-4">
          {cv.experience.map((e, i) => (
            <li key={i}>
              <p className="font-medium">{e.role} — {e.org}</p>
              <p className="text-sm text-zinc-600">{e.period}</p>
              <ul className="ml-5 list-disc text-sm">
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          {cv.skills.map(s => <span key={s} className="rounded bg-zinc-100 px-2 py-1">{s}</span>)}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Certificaciones</h2>
        <ul className="ml-5 list-disc text-sm">
          {cv.certs.map(c => <li key={c}>{c}</li>)}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Links</h2>
        <ul className="text-sm">
          <li><a className="text-brand-700 underline" href={cv.links.github}>GitHub</a></li>
          <li><a className="text-brand-700 underline" href={cv.links.linkedin}>LinkedIn</a></li>
        </ul>
      </section>
    </main>
  );
}
