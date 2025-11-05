import { useState } from 'react';

const tabs = [
  { id: 'descripcion', label: 'Descripción' },
  { id: 'especificaciones', label: 'Especificaciones' },
  { id: 'cuidado', label: 'Cuidado' }
];

export default function ProductTabs({ product }) {
  const [active, setActive] = useState('descripcion');

  const description = product?.description;
  const specs = [
    product?.category && `Categoría: ${product.category}`,
    product?.sizes?.length && `Tallas: ${product.sizes.join(', ')}`,
    product?.colors?.length && `Colores: ${product.colors.join(', ')}`,
    product?.stock && `Stock disponible: ${product.stock}`,
    product?.rating && `Valoración: ${Number(product.rating).toFixed(1)} / 5`
  ]
    .filter(Boolean)
    .join(' • ');

  const care =
    'Lavar con prendas de colores similares, utilizar detergente suave y secar a la sombra para mantener la textura y el color.';

  const content = {
    descripcion: description || 'Descubre un diseño versátil que combina estilo y confort en cada detalle.',
    especificaciones: specs || 'Consulta la guía de tallas y colores disponibles para personalizar tu look diario.',
    cuidado: care
  };

  return (
    <div className="card-glass rounded-3xl p-6">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`rounded-full px-4 py-2 text-xs uppercase tracking-widest transition ${
              active === tab.id ? 'bg-secondary text-slate-900' : 'bg-white/5 text-slate-200'
            }`}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm leading-relaxed text-slate-300">{content[active]}</p>
    </div>
  );
}
