import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Atelier inmersivo',
    description: 'Reserva cita privada con hologramas 3D y IA para personalizar cada prenda.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Cena sensorial',
    description: 'Maridaje de moda y gastronomía molecular en nuestro showroom secreto.',
    image: 'https://images.unsplash.com/photo-1523365280197-f1783db9fe62?auto=format&fit=crop&w=1200&q=80'
  }
];

export default function ExperiencePreview() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-8">
        <div>
          <h2 className="text-3xl font-semibold text-white">Experiencias immersivas</h2>
          <p className="mt-2 max-w-xl text-slate-300">
            Vive Lumina más allá de la compra con rituales sensoriales, personal shoppers y realidad aumentada.
          </p>
        </div>
        <Link href="/experiencias" className="text-sm font-semibold text-secondary">
          Ver agenda completa →
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {experiences.map((experience, idx) => (
          <motion.article
            key={experience.title}
            className="card-glass overflow-hidden rounded-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="relative h-72">
              <Image src={experience.image} alt={experience.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white">{experience.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{experience.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
