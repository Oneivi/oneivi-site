// src/components/Mdx.tsx
"use client";
import { useMDXComponent } from "next-contentlayer2/hooks";

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <Component
      // registra aquí tus shortcodes/overrides si los necesitas
      components={{}}
    />
  );
}
