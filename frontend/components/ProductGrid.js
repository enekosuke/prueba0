import { useSelector } from 'react-redux';
import ProductCard from '@/components/ProductCard';
import SkeletonCard from '@/components/SkeletonCard';

export default function ProductGrid() {
  const { items, status } = useSelector((state) => state.products);

  if (status === 'loading') {
    return (
      <div className="grid flex-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-slate-300">
        No encontramos productos que coincidan con la búsqueda.
      </div>
    );
  }

  return (
    <div className="grid flex-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((product) => (
        <ProductCard key={product._id || product.id} product={product} />
      ))}
    </div>
  );
}
