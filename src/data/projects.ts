// src/data/projects.ts
export type Project = {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  url?: string;
  year?: number;
};

export const PROJECTS: Project[] = [
  {
    id: "freefire-pos",
    title: "FreeFire POS",
    summary:
      "MVP de punto de venta para recargas de diamantes con verificación por API, wallets y recibos.",
    stack: ["Next.js 15", "TypeScript", "Supabase", "Tailwind"],
    url: "/projects/freefire-pos",
    year: 2025,
  },
  {
    id: "divetrack",
    title: "DiveTrack",
    summary:
      "Inventarios multi-sede con transferencias, valuación y reportes. Integración con impresoras Zebra.",
    stack: ["Next.js", "Postgres", "ZPL", "Recharts"],
    year: 2024,
  },
  {
    id: "uatu",
    title: "Uatu (MVP)",
    summary:
      "QA de etiquetas con ML: detección de errores, templates y estadísticas de impresión.",
    stack: ["Python", "Electron", "OpenCV", "SQLite"],
    year: 2024,
  },
];
