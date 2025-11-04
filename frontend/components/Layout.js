import Head from 'next/head';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FloatingCart = dynamic(() => import('@/components/FloatingCart'), { ssr: false });

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? `${title} | Lumina Boutique` : 'Lumina Boutique'}</title>
      </Head>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCart />
      </div>
    </>
  );
}
