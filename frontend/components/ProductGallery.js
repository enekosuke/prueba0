import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProductGallery({ images = [] }) {
  const fallback = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80';
  const [active, setActive] = useState(images[0] || fallback);

  return (
    <div className="space-y-4">
      <motion.div
        className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5"
        whileHover={{ scale: 1.01 }}
      >
        <Image src={active} alt="Producto" fill className="object-cover" />
      </motion.div>
      <div className="grid grid-cols-4 gap-3">
        {[active, ...images.filter((img) => img !== active)].slice(0, 4).map((image) => (
          <button
            key={image}
            onClick={() => setActive(image)}
            className={`relative h-24 overflow-hidden rounded-2xl border ${active === image ? 'border-secondary' : 'border-transparent'}`}
          >
            <Image src={image} alt="Miniatura" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
