import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '@/slices/cartSlice';
import { motion } from 'framer-motion';

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const { product, quantity, _id } = item;

  return (
    <motion.div layout className="card-glass flex items-center gap-4 rounded-3xl p-4">
      <div className="relative h-24 w-24 overflow-hidden rounded-2xl">
        <Image
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80'}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <h4 className="text-base font-semibold text-white">{product.name}</h4>
        <p className="text-sm text-slate-300">Cantidad: {quantity}</p>
        <p className="text-sm text-slate-400">{product.colorway}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-lg font-semibold text-secondary">€{(product.price * quantity).toFixed(2)}</span>
        <button
          onClick={() => dispatch(removeFromCart(_id))}
          className="text-sm text-slate-400 transition hover:text-red-300"
        >
          Eliminar
        </button>
      </div>
    </motion.div>
  );
}
