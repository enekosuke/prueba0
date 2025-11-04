import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiShoppingBag, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/experiencias', label: 'Experiencias' },
  { href: '/blog', label: 'Editorial' },
  { href: '/checkout', label: 'Checkout' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
        scrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold tracking-wide">
          Lumina Boutique
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm uppercase tracking-[0.3em] text-slate-300 hover:text-white">
              {link.label}
            </Link>
          ))}
          <Link href="/carrito" className="relative">
            <FiShoppingBag className="text-2xl" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold">
                {itemCount}
              </span>
            )}
          </Link>
          <Link href="/cuenta" aria-label="Cuenta">
            <FiUser className="text-2xl" />
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menú">
          {open ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-xl">
          <div className="space-y-4 px-6 py-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-lg tracking-wide text-slate-200"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-6 pt-4">
              <Link href="/carrito" className="flex items-center gap-2 text-lg" onClick={() => setOpen(false)}>
                <FiShoppingBag /> Carrito ({itemCount})
              </Link>
              <Link href="/cuenta" className="flex items-center gap-2 text-lg" onClick={() => setOpen(false)}>
                <FiUser /> Cuenta
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
