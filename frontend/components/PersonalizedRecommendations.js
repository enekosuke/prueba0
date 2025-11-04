import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchProducts } from '@/slices/productSlice';
import ProductCard from '@/components/ProductCard';
import SkeletonCard from '@/components/SkeletonCard';

export default function PersonalizedRecommendations() {
  const dispatch = useDispatch();
  const { recommended, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ curated: true }));
  }, [dispatch]);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="flex flex-col gap-4 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white">Recomendaciones personalizadas</h2>
          <p className="mt-2 max-w-2xl text-slate-300">
            Basadas en tus compras anteriores y preferencias de estilo. Actualizadas en tiempo real con aprendizaje federado.
          </p>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {status === 'loading'
          ? Array.from({ length: 3 }).map((_, idx) => <SkeletonCard key={idx} />)
          : recommended.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
      </div>
    </section>
  );
}
