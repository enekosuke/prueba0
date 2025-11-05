import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '@/components/Layout';
import FilterPanel from '@/components/FilterPanel';
import ProductGrid from '@/components/ProductGrid';
import { fetchProducts } from '@/slices/productSlice';

export default function Catalogo() {
  const dispatch = useDispatch();
  const { filters, status, error, total, totalPages, items } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters.q, filters.category, filters.minPrice, filters.maxPrice]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: currentPage,
        limit: 24,
        q: filters.q,
        category: filters.category,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice
      })
    );
  }, [dispatch, currentPage, filters.q, filters.category, filters.minPrice, filters.maxPrice]);

  const showingRange = useMemo(() => {
    if (!items || items.length === 0) {
      return '0 de 0';
    }
    const start = (currentPage - 1) * 24 + 1;
    const end = start + items.length - 1;
    return `${start}-${end} de ${total}`;
  }, [currentPage, items, total]);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <Layout title="Catálogo">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 max-w-3xl">
          <h1 className="text-4xl font-semibold text-white">Catálogo inteligente</h1>
          <p className="mt-4 text-lg text-slate-300">
            Explora colecciones limitadas con filtrado instantáneo por categoría y rango de precios.
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-[320px,1fr]">
          <FilterPanel />
          <div className="space-y-6">
            {error && (
              <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                Ocurrió un error al cargar los productos: {error}
              </div>
            )}
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>{status === 'loading' ? 'Cargando productos...' : `Mostrando ${showingRange}`}</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentPage === 1 || status === 'loading'}
                  className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-widest text-slate-200 transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-white/10"
                  aria-label="Página anterior"
                >
                  Anterior
                </button>
                <span className="text-xs uppercase tracking-widest text-slate-400">
                  Página {totalPages === 0 ? 0 : currentPage} de {totalPages}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentPage >= totalPages || status === 'loading'}
                  className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-widest text-slate-200 transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-white/10"
                  aria-label="Página siguiente"
                >
                  Siguiente
                </button>
              </div>
            </div>
            <ProductGrid />
          </div>
        </div>
      </section>
    </Layout>
  );
}
