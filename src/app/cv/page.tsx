export const dynamic = "force-static";

const cv = {
  name: "Jose Oneivi Rodriguez",
  title: "IT Superintendent",
  about:
    "Como Superintendente de IT, he liderado la transformación digital de la organización. Mi enfoque está en implementar soluciones tecnológicas que optimicen procesos y generen impacto positivo. Desde la gestión de proyectos hasta el desarrollo de aplicaciones personalizadas, mi pasión es encontrar formas innovadoras de mejorar la eficiencia y la calidad.",
  contact: {
    linkedin: "https://www.linkedin.com/in/jose-oneivi-rodriguez-55489020b/",
  },
  education: [
    {
      degree: "Ingeniería en Informatica",
      institution: "UniRomana",
    },
    {
      degree: "Gestión de Tecnología de la Información",
      institution: "Universidad de Palermo",
    },
  ],
  experience: [
    {
      role: "IT Superintendent",
      org: "DAS Medical UFPT",
      period: "Nov 2024 — Presente",
      bullets: [
        "Dirigí la implementación de soluciones tecnológicas a nivel organizacional.",
        "Coordino proyectos estratégicos garantizando la alta disponibilidad de sistemas, aplicaciones y redes.",
        "Lideré la implementación de software y hardware en más de 75 estaciones de trabajo y equipos de impresión.",
      ],
    },
    {
      role: "IT Lead",
      org: "DAS Medical UFPT",
      period: "Oct 2023 — Nov 2024",
      bullets: [
        "Analicé sistemas empresariales y necesidades de usuario, formulando soluciones a requerimientos de negocio.",
        "Desarrollé especificaciones funcionales, planes de prueba y procedimientos para nuevas implementaciones.",
        "Lideré proyectos complejos, capacitación de usuarios finales y coordinación con proveedores externos.",
        "Enlace con el equipo corporativo de IT en temas de ciberseguridad y cumplimiento.",
      ],
    },
  ],
  projects: [
    {
      year: 2024,
      name: "Software Implementation",
      desc: "Implementación de software de control de asistencia para más de 2000 empleados a nivel corporativo.",
    },
    {
      year: 2024,
      name: "ERP Update & QA",
      desc: "Lideré las últimas dos actualizaciones del ERP de la empresa, coordinando el proceso de QA y pruebas interdepartamentales.",
    },
    {
      year: 2024,
      name: "Product Management Migration",
      desc: "Migré una app de gestión de productos de Python/Tkinter a Electron, mejorando la UI/UX e integrando importación/exportación de datos en Excel y CSV.",
    },
    {
      year: 2023,
      name: "Scrap Report App",
      desc: "Desarrollé una aplicación y hardware para reportes de rechazo de materiales, usada en dos plantas con más de 20 usuarios activos.",
    },
    {
      year: 2023,
      name: "MDR Hardware & Software Implementation",
      desc: "Lideré un equipo de cinco técnicos en la implementación de software y hardware para 75 computadoras e impresoras, completando la transición sin interrupciones operativas.",
    },
  ],
  skills: [
    "Project Management",
    "ERP",
    "Leadership",
    "Networking",
    "Next.js",
    "Supabase",
    "PostgreSQL",
    "Python",
    "Electron",
    "Docker",
  ],
  certs: [
    "Python — Cisco",
    "DevOps — LinkedIn",
    "SCFPC — CertifPro",
    "Cybersecurity Applied in a Virtual Environment — Google",
    "SQL (Intermediate) — HackerRank",
    "SQL (Basics) — HackerRank",
    "Cyber Security Awareness — CertifPro",
    "SQL Server Administrator — ITLA",
  ],
  languages: ["Español (Nativo)", "Inglés (Fluido)", "Portugués (Básico)"],
};

export default function CVPage() {
  return (
    <main className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">{cv.name}</h1>
        <p className="text-zinc-600">{cv.title}</p>
        <p className="mt-2 max-w-2xl text-zinc-700">{cv.about}</p>
      </header>

      <section>
        <h2 className="text-xl font-semibold">Experiencia</h2>
        <ul className="mt-3 space-y-5">
          {cv.experience.map((e, i) => (
            <li key={i}>
              <p className="font-medium">{e.role} — {e.org}</p>
              <p className="text-sm text-zinc-600">{e.period}</p>
              <ul className="ml-5 list-disc text-sm text-zinc-700">
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Proyectos Destacados</h2>
        <ul className="mt-3 space-y-4 text-sm text-zinc-700">
          {cv.projects.map((p, i) => (
            <li key={i}>
              <span className="font-medium">{p.year} — {p.name}:</span> {p.desc}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Educación</h2>
        <ul className="mt-2 text-sm text-zinc-700">
          {cv.education.map((e, i) => (
            <li key={i}>
              <p className="font-medium">{e.degree}</p>
              <p className="text-zinc-600">{e.institution}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Habilidades</h2>
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          {cv.skills.map(s => (
            <span key={s} className="rounded bg-zinc-100 px-2 py-1">{s}</span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Certificaciones</h2>
        <ul className="ml-5 list-disc text-sm text-zinc-700">
          {cv.certs.map(c => <li key={c}>{c}</li>)}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Idiomas</h2>
        <ul className="text-sm text-zinc-700">
          {cv.languages.map(l => <li key={l}>{l}</li>)}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Contacto</h2>
        <ul className="text-sm">
          <li>
            <a className="text-brand-700 underline" href={cv.contact.linkedin}>
              LinkedIn
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
