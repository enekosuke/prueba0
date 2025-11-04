import Layout from '@/components/Layout';

const posts = [
  {
    title: 'La artesanía aumentada',
    date: '12 mayo 2024',
    tags: ['Innovación', 'Sostenibilidad'],
    excerpt: 'Cómo combinamos realidad extendida y técnicas centenarias para diseñar colecciones únicas.'
  },
  {
    title: 'Tendencias lumínicas 2025',
    date: '28 abril 2024',
    tags: ['Color', 'Experiencias'],
    excerpt: 'Predicciones de colorimetría generativa y experiencias retail basadas en datos biométricos.'
  }
];

export default function Blog() {
  return (
    <Layout title="Editorial">
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold text-white">Editorial Lumina</h1>
          <p className="mt-4 text-lg text-slate-300">
            Insights exclusivos del equipo creativo, entrevistas y reportes desde nuestras residencias artísticas.
          </p>
        </div>
        <div className="mt-10 space-y-6">
          {posts.map((post) => (
            <article key={post.title} className="card-glass rounded-3xl p-6">
              <div className="flex flex-wrap items-center justify-between text-sm text-slate-400">
                <p>{post.date}</p>
                <p>{post.tags.join(' · ')}</p>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-white">{post.title}</h2>
              <p className="mt-3 text-sm text-slate-300">{post.excerpt}</p>
              <button className="mt-6 text-sm font-semibold text-secondary">Leer artículo →</button>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
