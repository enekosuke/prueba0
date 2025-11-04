import { Button } from '@aurora/ui';
import Link from 'next/link';

export const HeroSection = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-purple-500/20 via-background to-background py-24">
    <div className="container-responsive grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <span className="rounded-full border border-foreground/10 px-3 py-1 text-sm uppercase tracking-widest text-foreground/80">
          Nueva temporada 2024
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Experiencias de compra sensoriales para personas que aman el diseño.
        </h1>
        <p className="text-lg text-muted-foreground">
          Aurora Shop combina tecnología, artesanía y personalización para ofrecer colecciones exclusivas, pagos seguros y logística sin fricción.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/catalogo">Descubrir colección</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/experiencias">Reservar showroom</Link>
          </Button>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-purple-500/30 blur-3xl" aria-hidden />
        <div className="grid gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="rounded-3xl border bg-card/80 p-6 shadow-xl">
              <p className="text-sm font-medium text-muted-foreground">Momento #{item}</p>
              <h3 className="mt-2 text-lg font-semibold">Atención personalizada y envíos neutros en carbono</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Unimos datos y servicio humano para recomendar combinaciones únicas, empaques reutilizables y seguimiento en vivo.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
