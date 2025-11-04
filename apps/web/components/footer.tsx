import Link from 'next/link';

export const Footer = () => (
  <footer className="border-t bg-background py-8">
    <div className="container-responsive flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Aurora Shop. Todos los derechos reservados.</p>
      <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <Link href="/legal/privacidad" className="hover:text-foreground">
          Privacidad
        </Link>
        <Link href="/legal/terminos" className="hover:text-foreground">
          Términos
        </Link>
        <Link href="/legal/cookies" className="hover:text-foreground">
          Cookies
        </Link>
      </nav>
    </div>
  </footer>
);
