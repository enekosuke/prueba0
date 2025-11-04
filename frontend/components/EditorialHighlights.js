import Link from 'next/link';
import Image from 'next/image';

const posts = [
  {
    title: 'La moda regenerativa que reescribe el lujo',
    excerpt: 'Exploramos materiales biofabricados y su impacto en colecciones cápsula conscientes.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Tecnología háptica en accesorios premium',
    excerpt: 'Experiencias multisensoriales que elevan cada interacción con tus piezas favoritas.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'
  }
];

export default function EditorialHighlights() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-8">
        <div>
          <h2 className="text-3xl font-semibold text-white">Editorial Lumina</h2>
          <p className="mt-2 max-w-xl text-slate-300">
            Historias detrás de cada colección, entrevistas con artesanos y reportes de tendencias futuristas.
          </p>
        </div>
        <Link href="/blog" className="text-sm font-semibold text-secondary">
          Visitar blog →
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.title} className="card-glass overflow-hidden rounded-3xl">
            <div className="relative h-64">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white">{post.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
