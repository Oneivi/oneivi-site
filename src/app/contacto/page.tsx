export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto py-16 space-y-6 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Contacto</h1>
      <p className="text-lg text-muted-foreground">
        Si deseas ponerte en contacto conmigo, puedes hacerlo a través de mi{" "}
        <a
          href="https://www.linkedin.com/in/jose-oneivi-rodriguez-55489020b/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 underline hover:text-blue-800"
        >
          perfil de LinkedIn
        </a>.
      </p>
    </main>
  );
}
