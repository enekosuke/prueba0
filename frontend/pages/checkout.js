import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '@/components/Layout';
import CheckoutForm from '@/components/CheckoutForm';
import CartSummary from '@/components/CartSummary';
import { fetchCart } from '@/slices/cartSlice';

export default function Checkout() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <Layout title="Checkout">
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-12 max-w-3xl">
          <h1 className="text-4xl font-semibold text-white">Checkout seguro</h1>
          <p className="mt-4 text-lg text-slate-300">
            Conectado con Stripe y PayPal, protegido con CSRF y validaciones avanzadas.
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr),320px]">
          <CheckoutForm totals={cart} />
          <CartSummary subtotal={cart.subtotal} shipping={cart.shipping} taxes={cart.taxes} total={cart.total} />
        </div>
      </section>
    </Layout>
  );
}
