import { formatMoney } from '@aurora/utils';
import Image from 'next/image';

import { LayoutShell } from '@/components/layout-shell';
import { fetchJson } from '@/lib/api';
import type { Product } from '@/lib/types';

import { AddToCart } from './add-to-cart';

interface ProductPageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await fetchJson<Product>(`/catalog/products/${params.slug}`);

  if (!product) {
    return (
      <LayoutShell>
        <div className="container-responsive py-16">
          <p className="text-lg font-semibold">Producto no encontrado.</p>
        </div>
      </LayoutShell>
    );
  }

  const price = product.prices[0];
  const currency = (price?.currency ?? 'EUR') as 'EUR' | 'USD';

  return (
    <LayoutShell>
      <section className="container-responsive py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 md:grid-cols-2">
            {product.images.map((image) => (
              <div key={image.url} className="relative aspect-square overflow-hidden rounded-3xl">
                <Image src={image.url} alt={image.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Colección cápsula</p>
              <h1 className="text-3xl font-semibold sm:text-4xl">{product.title}</h1>
              <p className="mt-4 text-base text-muted-foreground">{product.description}</p>
            </div>
            <div className="rounded-3xl border bg-card p-6">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary">
                  {formatMoney(Number(price?.amount ?? 0), currency)}
                </span>
                {price?.compareAt && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatMoney(Number(price.compareAt), currency)}
                  </span>
                )}
              </div>
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                {product.variants.map((variant) => (
                  <div key={variant.id} className="flex items-center justify-between rounded-2xl border p-3">
                    <div>
                      <p className="font-medium text-foreground">{variant.name}</p>
                      <p>Atributos: {Object.entries(variant.attributes).map(([key, value]) => `${key}: ${value}`).join(', ')}</p>
                    </div>
                    <p>
                      Stock: <span className="font-semibold text-foreground">{variant.inventory?.stock ?? 0}</span>
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <AddToCart variants={product.variants} currency={currency} />
              </div>
            </div>
            <div className="rounded-3xl border bg-muted/30 p-6">
              <h2 className="text-lg font-semibold">Reseñas destacadas</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Las reseñas verificadas aparecerán aquí una vez que iniciemos la importación automática desde la API.
              </p>
            </div>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
