// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oneivi.dev",
  description: "Portafolio y blog de Jose Oneivi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-dvh bg-slate-50 text-slate-900 antialiased`}>
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
            <Link href="/" className="font-semibold">
              Oneivi<span className="text-blue-600">.dev</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/blog" className="hover:text-blue-600">Blog</Link>
              <Link href="/projects" className="hover:text-blue-600">Projects</Link>
              <Link href="/cv" className="hover:text-blue-600">CV</Link>
              <Link href="/contacto" className="hover:text-blue-600">Contacto</Link>
            </nav>
          </div>
        </header>

        {/* Main */}
        <main className="mx-auto max-w-7xl px-4 py-12">{children}</main>

        {/* Footer */}
        <footer className="mt-16 border-t bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-600">
            © {new Date().getFullYear()} Jose Oneivi
          </div>
        </footer>
      </body>
    </html>
  );
}
