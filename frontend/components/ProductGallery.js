import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ImageWithFallback from '@/components/ImageWithFallback';

const PLACEHOLDER_SRC = '/images/placeholder.svg';

export default function ProductGallery({ images, title = 'Producto' }) {
  const safeImages = useMemo(() => {
    if (Array.isArray(images) && images.length > 0) {
      return images;
    }
    if (typeof images === 'string' && images.trim() !== '') {
      return [images];
    }
    return [PLACEHOLDER_SRC];
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = safeImages[Math.min(activeIndex, safeImages.length - 1)];

  return (
    <div className="space-y-4">
      <motion.div
        className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5"
        whileHover={{ scale: 1.01 }}
      >
        <ImageWithFallback
          src={activeImage}
          alt={`Imagen destacada de ${title}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </motion.div>
      <div className="grid grid-cols-4 gap-3">
        {safeImages.slice(0, 4).map((image, index) => (
          <button
            key={`${image}-${index}`}
            onClick={() => setActiveIndex(index)}
            type="button"
            className={`relative h-24 overflow-hidden rounded-2xl border ${
              activeIndex === index ? 'border-secondary' : 'border-transparent'
            }`}
            aria-label={`Ver imagen ${index + 1} de ${title}`}
          >
            <ImageWithFallback src={image} alt={`Miniatura ${index + 1} de ${title}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
