import { LayoutShell } from '@/components/layout-shell';

const posts = [
  {
    slug: 'arquitectura-experiencial',
    title: 'Arquitectura experiencial aplicada al retail premium',
    excerpt: 'Integramos sensores, datos en tiempo real y storytelling inmersivo en el showroom de Barcelona.'
  },
  {
    slug: 'cadena-suministro',
    title: 'Cadena de suministro orquestada con IA y análisis predictivo',
    excerpt: 'Así optimizamos inventario y envíos neutros en carbono para clientes en la UE.'
  }
];

export default function BlogPage() {
  return (
    <LayoutShell>
      <section className="container-responsive py-16">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Editorial Aurora</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Historias sobre diseño, tecnología, sostenibilidad y comercio electrónico con enfoque europeo.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-3xl border bg-card p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Insights</p>
                <h2 className="mt-2 text-2xl font-semibold">{post.title}</h2>
                <p className="mt-4 text-sm text-muted-foreground">{post.excerpt}</p>
                <a href={`/blog/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Leer más
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
