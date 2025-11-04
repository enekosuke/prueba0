import Link from 'next/link';

export default function CartSummary({ subtotal, shipping, taxes, total }) {
  return (
    <aside className="card-glass space-y-4 rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-white">Resumen</h3>
      <div className="space-y-2 text-sm text-slate-300">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>€{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Envío</span>
          <span>€{shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Impuestos</span>
          <span>€{taxes.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex justify-between border-t border-white/5 pt-4 text-base font-semibold text-white">
        <span>Total</span>
        <span>€{total.toFixed(2)}</span>
      </div>
      <Link
        href="/checkout"
        className="block rounded-full bg-secondary px-4 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-secondary/80"
      >
        Ir al checkout
      </Link>
    </aside>
  );
}
