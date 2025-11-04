import { LayoutShell } from '@/components/layout-shell';
import { HeroSection } from '@/components/hero-section';
import { ProductCarousel } from '@/components/product-carousel';
import { Recommendations } from '@/components/recommendations';
import { fetchJson } from '@/lib/api';
import type { Product, Category } from '@/lib/types';

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    fetchJson<Product[]>('/catalog/products?page=1&pageSize=8'),
    fetchJson<Category[]>('/catalog/categories')
  ]);

  return (
    <LayoutShell>
      <HeroSection />
      <section className="container-responsive py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Colecciones destacadas</p>
            <h2 className="text-2xl font-semibold">Descubre nuestras novedades</h2>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            {categories.slice(0, 5).map((category) => (
              <span key={category.id} className="rounded-full border px-3 py-1">
                {category.name}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <ProductCarousel products={products} />
        </div>
      </section>
      <Recommendations products={products} />
    </LayoutShell>
  );
}
