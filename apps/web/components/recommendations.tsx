import { formatMoney } from '@aurora/utils';
import Image from 'next/image';
import Link from 'next/link';

import type { Product } from '@/lib/types';

interface RecommendationsProps {
  products: Product[];
}

export const Recommendations = ({ products }: RecommendationsProps) => (
  <section className="container-responsive py-16">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">También te puede interesar</p>
        <h2 className="mt-2 text-2xl font-semibold">Recomendaciones dinámicas</h2>
      </div>
      <Link href="/catalogo" className="text-sm font-medium text-primary">
        Ver catálogo completo
      </Link>
    </div>
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.slice(0, 4).map((product) => (
        <Link key={product.id} href={`/producto/${product.slug}`} className="group rounded-3xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
            <Image
              src={product.heroImage}
              alt={product.title}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
          <div className="mt-4 space-y-2">
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
            <p className="text-base font-bold text-primary">
              {formatMoney(Number(product.prices[0]?.amount ?? 0), 'EUR')}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </section>
);
