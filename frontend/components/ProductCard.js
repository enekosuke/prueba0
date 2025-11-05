import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { FiHeart } from 'react-icons/fi';
import { addToCart, optimisticAdd } from '@/slices/cartSlice';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ImageWithFallback from '@/components/ImageWithFallback';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  if (!product) {
    return null;
  }

  const productId = product.id;
  const primaryImage = product.image;
  const priceValue = Number(product.price) || 0;

  const handleAddToCart = async () => {
    dispatch(optimisticAdd({ product, quantity: 1 }));
    toast.success('Añadido al carrito');
    if (productId) {
      await dispatch(addToCart({ productId, quantity: 1 }));
    }
  };

  return (
    <article className="card-glass group flex h-full flex-col overflow-hidden">
      <div className="relative h-64 w-full overflow-hidden">
        <ImageWithFallback
          src={primaryImage}
          alt={`Vista principal de ${product.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <button
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Añadir a favoritos"
          type="button"
        >
          <FiHeart />
        </button>
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{product.category}</p>
          <Link href={`/producto/${productId}`} className="mt-2 block text-lg font-semibold text-white">
            {product.name}
          </Link>
          <p className="mt-3 text-sm text-slate-300 line-clamp-2">{product.description}</p>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-secondary">€{priceValue.toFixed(2)}</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="rounded-full bg-primary/80 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-primary"
            aria-label={`Añadir ${product.name} al carrito`}
            type="button"
          >
            Añadir
          </motion.button>
        </div>
      </div>
    </article>
  );
}
