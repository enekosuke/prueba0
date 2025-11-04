import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '@/components/Layout';
import FilterPanel from '@/components/FilterPanel';
import ProductGrid from '@/components/ProductGrid';
import { fetchProducts } from '@/slices/productSlice';

export default function Catalogo() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Layout title="Catálogo">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 max-w-3xl">
          <h1 className="text-4xl font-semibold text-white">Catálogo inteligente</h1>
          <p className="mt-4 text-lg text-slate-300">
            Explora colecciones limitadas con filtrado instantáneo por categoría, disponibilidad y precios dinámicos.
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-[320px,1fr]">
          <FilterPanel />
          <ProductGrid />
        </div>
      </section>
    </Layout>
  );
}
