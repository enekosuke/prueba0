import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '@/slices/productSlice';
import useAutocomplete from '@/hooks/useAutocomplete';

const categories = [
  { id: '', label: 'Todos' },
  { id: 'Camisetas', label: 'Camisetas' },
  { id: 'Sudaderas', label: 'Sudaderas' },
  { id: 'Pantalones', label: 'Pantalones' },
  { id: 'Vestidos', label: 'Vestidos' },
  { id: 'Abrigos', label: 'Abrigos' },
  { id: 'Accesorios', label: 'Accesorios' }
];

export default function FilterPanel() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);
  const [query, setQuery] = useState(filters.q);
  const { suggestions, open, setOpen } = useAutocomplete(query);

  useEffect(() => {
    setQuery(filters.q);
  }, [filters.q]);

  const priceLabel = useMemo(() => {
    const min = filters.minPrice ?? 5;
    const max = filters.maxPrice ?? 200;
    return `€${min} - €${max}`;
  }, [filters.minPrice, filters.maxPrice]);

  const updateFilters = (next) => {
    dispatch(setFilters(next));
  };

  return (
    <aside className="card-glass space-y-6 rounded-3xl p-6">
      <div>
        <label className="text-sm font-medium text-slate-300" htmlFor="search">
          Buscar producto
        </label>
        <div className="relative mt-2">
          <input
            id="search"
            value={query}
            onChange={(event) => {
              const value = event.target.value;
              setQuery(value);
              updateFilters({ q: value });
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 120)}
            className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-secondary focus:outline-none"
            placeholder="Busca por nombre, color o talla"
          />
          {open && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 top-14 z-20 rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur">
              {suggestions.map((suggestion) => (
                <li key={suggestion.id}>
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-left text-sm text-slate-200 hover:bg-white/10"
                    onClick={() => {
                      setQuery(suggestion.name);
                      updateFilters({ q: suggestion.name });
                      setOpen(false);
                    }}
                  >
                    {suggestion.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-300">Categoría</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id || 'all'}
              onClick={() => updateFilters({ category: category.id })}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-widest transition ${
                filters.category === category.id ? 'bg-secondary text-slate-900' : 'bg-white/5 text-slate-200'
              }`}
              type="button"
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-300">Rango de precio {priceLabel}</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className="flex flex-col text-xs uppercase tracking-widest text-slate-400">
            Mínimo
            <input
              type="number"
              min="5"
              max="200"
              step="5"
              value={filters.minPrice ?? ''}
              onChange={(event) => {
                const value = event.target.value;
                updateFilters({ minPrice: value === '' ? '' : Number(value) });
              }}
              className="mt-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-secondary focus:outline-none"
            />
          </label>
          <label className="flex flex-col text-xs uppercase tracking-widest text-slate-400">
            Máximo
            <input
              type="number"
              min="5"
              max="200"
              step="5"
              value={filters.maxPrice ?? ''}
              onChange={(event) => {
                const value = event.target.value;
                updateFilters({ maxPrice: value === '' ? '' : Number(value) });
              }}
              className="mt-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-secondary focus:outline-none"
            />
          </label>
        </div>
      </div>
    </aside>
  );
}
