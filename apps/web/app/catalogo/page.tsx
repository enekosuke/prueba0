import { formatMoney } from '@aurora/utils';
import Image from 'next/image';
import Link from 'next/link';

import { LayoutShell } from '@/components/layout-shell';
import { fetchJson } from '@/lib/api';
import type { Category, Product } from '@/lib/types';

export default async function CatalogPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const page = Number(searchParams.page ?? 1);
  const products = await fetchJson<Product[]>(`/catalog/products?page=${page}&pageSize=12`);
  const categories = await fetchJson<Category[]>('/catalog/categories');

  return (
    <LayoutShell>
      <section className="container-responsive py-16">
        <div className="grid gap-10 md:grid-cols-[240px_1fr]">
          <aside className="space-y-6 rounded-3xl border bg-card p-6">
            <div>
              <h2 className="text-lg font-semibold">Categorías</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link href={`/catalogo?category=${category.slug}`} className="hover:text-foreground">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Filtros rápidos</h2>
              <p className="mt-2 text-sm text-muted-foreground">Próximamente podrás filtrar por precio, disponibilidad y valoración.</p>
            </div>
          </aside>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Catálogo inteligente</h1>
              <p className="mt-2 text-muted-foreground">
                Explora colecciones modulares con disponibilidad en tiempo real, recomendaciones personalizadas y logística integrada.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Link key={product.id} href={`/producto/${product.slug}`} className="group rounded-3xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src={product.heroImage}
                      alt={product.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                    <p className="text-base font-semibold text-primary">
                      {formatMoney(Number(product.prices[0]?.amount ?? 0), 'EUR')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex items-center justify-between rounded-2xl border bg-muted/40 p-4 text-sm">
              <span>Página {page}</span>
              <div className="space-x-2">
                {page > 1 && (
                  <Link href={`/catalogo?page=${page - 1}`} className="font-medium text-primary">
                    Anterior
                  </Link>
                )}
                <Link href={`/catalogo?page=${page + 1}`} className="font-medium text-primary">
                  Siguiente
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
