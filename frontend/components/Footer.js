import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:justify-between">
        <div>
          <h3 className="text-xl font-semibold">Lumina Boutique</h3>
          <p className="mt-2 max-w-xs text-sm text-slate-400">
            Boutique de lujo con colecciones limitadas y experiencias inmersivas en cada compra.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Tienda</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li><Link href="/catalogo">Catálogo</Link></li>
              <li><Link href="/checkout">Checkout</Link></li>
              <li><Link href="/carrito">Carrito</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Empresa</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li><Link href="/experiencias">Experiencias</Link></li>
              <li><Link href="/blog">Editorial</Link></li>
              <li><Link href="/cuenta">Cuenta</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Contacto</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>hola@lumina-boutique.com</li>
              <li>+34 600 000 000</li>
              <li>Madrid, España</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Lumina Boutique. Todos los derechos reservados.
      </div>
    </footer>
  );
}
