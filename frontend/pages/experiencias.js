import Layout from '@/components/Layout';

const agenda = [
  {
    title: 'Inmersión multisensorial',
    description: 'Recorrido privado por la colección Aurora con asistentes hápticos y proyecciones envolventes.',
    date: 'Cada viernes',
    seats: '8 plazas'
  },
  {
    title: 'Residencia creativa',
    description: 'Diseña junto a nuestros artesanos durante un fin de semana en el atelier de Madrid.',
    date: 'Mensual',
    seats: '4 plazas'
  }
];

export default function Experiencias() {
  return (
    <Layout title="Experiencias">
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold text-white">Agenda de experiencias</h1>
          <p className="mt-4 text-lg text-slate-300">
            Reserva rituales sensoriales, personalizaciones presenciales y eventos gastronómicos en colaboración.
          </p>
        </div>
        <div className="mt-10 space-y-6">
          {agenda.map((item) => (
            <article key={item.title} className="card-glass rounded-3xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-2 text-sm text-slate-300">{item.description}</p>
                </div>
                <div className="text-right text-sm text-slate-300">
                  <p>{item.date}</p>
                  <p>{item.seats}</p>
                </div>
              </div>
              <button className="mt-6 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-slate-900">
                Reservar plaza
              </button>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
