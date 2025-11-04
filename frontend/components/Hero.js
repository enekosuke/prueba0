import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const heroImages = [
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1518544801976-3e159e81d1a4?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80'
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-3xl" />
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-24 lg:grid-cols-2">
        <div className="space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate-300"
          >
            Nueva colección cápsula
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-semibold tracking-tight text-white sm:text-6xl"
          >
            Lujo sensorial con tecnología que anticipa tus deseos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl text-lg text-slate-300"
          >
            Descubre piezas artesanales curadas por IA, recomendaciones personales y experiencias VIP con reservas inmediatas.
          </motion.p>
          <motion.div className="flex flex-wrap items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <Link
              href="/catalogo"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-primary/30 transition hover:-translate-y-0.5"
            >
              Ver catálogo
            </Link>
            <Link href="/experiencias" className="text-sm font-medium text-slate-200 underline-offset-4 hover:underline">
              Agenda una experiencia
            </Link>
          </motion.div>
          <motion.dl
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.15, delayChildren: 0.4 }
              }
            }}
            className="grid max-w-md grid-cols-2 gap-6 pt-10 text-slate-200"
          >
            {[{ value: '24h', label: 'Entrega express' }, { value: '+12k', label: 'Clientes felices' }, { value: '4.9/5', label: 'Valoración media' }, { value: 'VIP', label: 'Experiencias exclusivas' }].map((metric) => (
              <motion.div key={metric.label} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                <dt className="text-sm uppercase tracking-widest text-slate-400">{metric.label}</dt>
                <dd className="text-2xl font-semibold">{metric.value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2">
          {heroImages.map((src, idx) => (
            <motion.div
              key={src}
              className="card-glass group overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * idx }}
            >
              <div className="relative h-80 w-full">
                <Image src={src} alt="Pieza de lujo" fill className="object-cover transition duration-700 group-hover:scale-110" priority={idx === 0} />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">Colección Aurora</h3>
                <p className="mt-2 text-sm text-slate-300">Silhuetas orgánicas con acabados metálicos perlados.</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
