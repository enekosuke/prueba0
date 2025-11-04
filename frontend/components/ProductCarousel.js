import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {
    title: 'Set Nebula',
    description: 'Sastrería líquida con acabado perlado y cristales Swarovski reciclados.',
    image: 'https://images.unsplash.com/photo-1521572103907-7d4be5c107c6?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Bolso Halo',
    description: 'Piel vegana texturizada con interior lumínico y NFC para experiencias AR.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Anillo Prisma',
    description: 'Oro rosa ético con incrustaciones de cuarzo y trazabilidad blockchain.',
    image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80'
  }
];

export default function ProductCarousel() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="flex flex-col gap-6 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white">Destacados de la semana</h2>
          <p className="mt-2 max-w-2xl text-slate-300">
            Nuestra IA fusiona tendencias globales y datos biométricos para sugerirte colecciones hechas a tu medida.
          </p>
        </div>
      </div>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4500 }}
        pagination={{ clickable: true }}
        spaceBetween={32}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <article className="card-glass group h-full overflow-hidden rounded-3xl">
              <div className="relative h-72 w-full">
                <Image src={slide.image} alt={slide.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="flex h-48 flex-col justify-between p-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">{slide.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{slide.description}</p>
                </div>
                <button type="button" className="self-start text-sm font-semibold text-secondary transition hover:translate-x-1">
                  Añadir al carrito →
                </button>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
