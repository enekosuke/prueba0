import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { FiHeart } from 'react-icons/fi';
import { addToCart, optimisticAdd } from '@/slices/cartSlice';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    dispatch(optimisticAdd({ product, quantity: 1 }));
    toast.success('Añadido al carrito');
    await dispatch(addToCart({ productId: product._id, quantity: 1 }));
  };

  return (
    <article className="card-glass group flex h-full flex-col overflow-hidden">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={product?.images?.[0] ?? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80'}
          alt={product.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <button
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Añadir a favoritos"
        >
          <FiHeart />
        </button>
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{product.category}</p>
          <Link href={`/producto/${product.slug || product._id}`} className="mt-2 block text-lg font-semibold text-white">
            {product.name}
          </Link>
          <p className="mt-3 text-sm text-slate-300 line-clamp-2">{product.description}</p>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-lg font-semibold text-secondary">€{product.price}</span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="rounded-full bg-primary/80 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-primary"
          >
            Añadir
          </motion.button>
        </div>
      </div>
    </article>
  );
}
