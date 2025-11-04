import Link from 'next/link';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingCart() {
  const { items } = useSelector((state) => state.cart);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Link
            href="/carrito"
            className="card-glass flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow"
          >
            {itemCount} artículo{itemCount > 1 ? 's' : ''} en tu carrito
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
