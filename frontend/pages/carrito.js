import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '@/components/Layout';
import CartItem from '@/components/CartItem';
import CartSummary from '@/components/CartSummary';
import { fetchCart } from '@/slices/cartSlice';
import { AnimatePresence } from 'framer-motion';

export default function Carrito() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <Layout title="Carrito">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 max-w-3xl">
          <h1 className="text-4xl font-semibold text-white">Tu selección</h1>
          <p className="mt-4 text-lg text-slate-300">
            Visualiza la cesta en tiempo real con animaciones fluidas al añadir o eliminar piezas.
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr),320px]">
          <div className="space-y-4">
            <AnimatePresence>
              {cart.items.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </AnimatePresence>
            {cart.items.length === 0 && <p className="text-sm text-slate-400">Tu carrito está vacío.</p>}
          </div>
          <CartSummary subtotal={cart.subtotal} shipping={cart.shipping} taxes={cart.taxes} total={cart.total} />
        </div>
      </section>
    </Layout>
  );
}
