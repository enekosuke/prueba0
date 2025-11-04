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

  return (
    <div className="grid flex-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
