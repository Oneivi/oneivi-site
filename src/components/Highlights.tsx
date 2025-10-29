// src/components/Highlights.tsx
import { FC } from "react";
import {
  BadgeCheck,
  Wifi,
  Cable,
  Workflow,
  type LucideIcon,
} from "lucide-react";



export type Highlight = {
  id: string;
  title: string;          // “30+ proyectos de IT”
  subtitle?: string;      // “Impacto reciente”, “Caso destacado”, etc. (opcional)
  description: string;    // texto corto de 2–3 líneas
  icon?: LucideIcon;      // icono opcional (lucide-react)
  badge?: string;         // chip pequeño arriba a la izquierda
  href?: string;          // si quieres que la tarjeta sea clickeable
};

type Props = {
  items: Highlight[];
  title?: string;         // “Destacados”
};

const Highlights: FC<Props> = ({ items, title = "Destacados" }) => {
  return (
    <section className="md:col-span-2">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((h) => {
          const Icon = h.icon ?? BadgeCheck;
          const Card = (
            <div className="group relative h-full rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md">
              {h.badge ? (
                <span className="absolute left-3 top-3 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                  {h.badge}
                </span>
              ) : null}

              <div className="mb-3 mt-1 inline-flex h-9 w-9 items-center justify-center rounded-xl border bg-slate-50">
                <Icon className="h-5 w-5 text-slate-700" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold leading-5 text-slate-900">
                  {h.title}
                </h3>
                {h.subtitle ? (
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">
                    {h.subtitle}
                  </p>
                ) : null}
                <p className="text-sm leading-6 text-slate-700">
                  {h.description}
                </p>
              </div>
            </div>
          );

          return h.href ? (
            <a key={h.id} href={h.href} className="h-full">{Card}</a>
          ) : (
            <div key={h.id} className="h-full">{Card}</div>
          );
        })}
      </div>
    </section>
  );
};

export default Highlights;

// Helpers para iconos más “temáticos” si los quieres usar en tus items:
export const HighlightIcons = { BadgeCheck, Wifi, Cable, Workflow };
