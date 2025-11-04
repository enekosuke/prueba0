import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '@/components/Layout';
import ProductGallery from '@/components/ProductGallery';
import ProductTabs from '@/components/ProductTabs';
import ReviewSection from '@/components/ReviewSection';
import { addToCart, optimisticAdd } from '@/slices/cartSlice';
import { fetchProductById } from '@/slices/productSlice';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function ProductPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.products);
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  if (!product) {
    return (
      <Layout title="Producto">
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="skeleton h-[420px] rounded-3xl" />
            <div className="space-y-6">
              <div className="skeleton h-10 w-1/2" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-3/4" />
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  const handleAddToCart = async () => {
    dispatch(optimisticAdd({ product, quantity: 1 }));
    toast.success('Añadido al carrito');
    await dispatch(addToCart({ productId: product._id, quantity: 1 }));
  };

  return (
    <Layout title={product.name}>
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)]">
          <ProductGallery images={product.images} />
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{product.category}</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">{product.name}</h1>
            </div>
            <p className="text-lg text-slate-300">{product.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-white">
              <span className="text-3xl font-semibold text-secondary">€{product.price}</span>
              <span className="rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.4em] text-slate-300">
                {product.availability === 'inStock' ? 'En stock' : 'Preventa'}
              </span>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="w-full rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white shadow-glow transition hover:bg-primary/80"
            >
              Añadir al carrito
            </motion.button>
            <ProductTabs product={product} />
            <ReviewSection reviews={product.reviews} />
          </div>
        </div>
      </section>
    </Layout>
  );
}
