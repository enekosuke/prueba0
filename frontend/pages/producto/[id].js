import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
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
  const { product, status, error } = useSelector((state) => state.products);
  const { id } = router.query;
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    if (!id) return;
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (product?.sizes?.length) {
      setSelectedSize(product.sizes[0]);
    }
    if (product?.colors?.length) {
      setSelectedColor(product.colors[0]);
    }
  }, [product?.sizes, product?.colors]);

  const productId = product?.id;
  const priceValue = product ? Number(product.price) || 0 : 0;

  const finalPrice = useMemo(() => {
    if (!product) return 0;
    return priceValue;
  }, [product, priceValue]);

  const handleAddToCart = async () => {
    if (!product || !productId) return;
    const productWithOptions = {
      ...product,
      selectedSize,
      selectedColor
    };
    dispatch(optimisticAdd({ product: productWithOptions, quantity: 1 }));
    toast.success('Añadido al carrito');
    await dispatch(addToCart({ productId, quantity: 1 }));
  };

  if (status === 'loading' && !product) {
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

  if (!product) {
    return (
      <Layout title="Producto">
        <section className="mx-auto max-w-4xl px-6 py-24 text-center text-slate-200">
          <h1 className="text-3xl font-semibold">Producto no disponible</h1>
          <p className="mt-4 text-slate-400">
            {error ? `Ocurrió un error al cargar la información: ${error}` : 'No pudimos encontrar el producto solicitado.'}
          </p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout title={product.name}>
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)]">
          <ProductGallery images={product.image} title={product.name} />
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{product.category}</p>
              <h1 className="text-4xl font-semibold text-white">{product.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                <span className="rounded-full border border-white/10 px-3 py-1">Stock: {product.stock}</span>
                <span className="rounded-full border border-white/10 px-3 py-1">⭐ {Number(product.rating).toFixed(1)}</span>
              </div>
            </div>
            <p className="text-lg text-slate-300">{product.description}</p>
            <div className="flex items-baseline gap-4 text-white">
              <span className="text-3xl font-semibold text-secondary">€{finalPrice.toFixed(2)}</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {product.sizes?.length > 0 && (
                <label className="flex flex-col gap-2 text-sm text-slate-200" htmlFor="size">
                  Talla
                  <select
                    id="size"
                    aria-label="Seleccionar talla"
                    value={selectedSize}
                    onChange={(event) => setSelectedSize(event.target.value)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-secondary focus:outline-none"
                  >
                    {product.sizes.map((size) => (
                      <option key={size} value={size} className="text-slate-900">
                        {size}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {product.colors?.length > 0 && (
                <label className="flex flex-col gap-2 text-sm text-slate-200" htmlFor="color">
                  Color
                  <select
                    id="color"
                    aria-label="Seleccionar color"
                    value={selectedColor}
                    onChange={(event) => setSelectedColor(event.target.value)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-secondary focus:outline-none"
                  >
                    {product.colors.map((color) => (
                      <option key={color} value={color} className="text-slate-900">
                        {color}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="w-full rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white shadow-glow transition hover:bg-primary/80"
              aria-label="Añadir producto al carrito"
              type="button"
            >
              Añadir al carrito
            </motion.button>
            <ProductTabs product={product} />
            <ReviewSection reviews={product.reviews || []} />
          </div>
        </div>
      </section>
    </Layout>
  );
}
