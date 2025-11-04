import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, fetchProducts } from '@/slices/productSlice';
import useAutocomplete from '@/hooks/useAutocomplete';

const categories = ['todos', 'vestuario', 'accesorios', 'joyería', 'hogar'];

export default function FilterPanel() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);
  const [query, setQuery] = useState(filters.query);
  const { suggestions, open, setOpen } = useAutocomplete(query);

  const applyFilters = (nextFilters) => {
    dispatch(setFilters(nextFilters));
    dispatch(fetchProducts({ ...filters, ...nextFilters }));
  };

  return (
    <aside className="card-glass space-y-6 rounded-3xl p-6">
      <div>
        <label className="text-sm font-medium text-slate-300" htmlFor="search">
          Búsqueda inteligente
        </label>
        <div className="relative mt-2">
          <input
            id="search"
            value={query}
            onChange={(event) => {
              const value = event.target.value;
              setQuery(value);
              applyFilters({ query: value });
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 100)}
            className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-secondary focus:outline-none"
            placeholder="Busca por nombre, color o colección"
          />
          {open && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 top-14 z-20 rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur">
              {suggestions.map((suggestion) => (
                <li key={suggestion}>
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-left text-sm text-slate-200 hover:bg-white/10"
                    onClick={() => {
                      setQuery(suggestion);
                      applyFilters({ query: suggestion });
                      setOpen(false);
                    }}
                  >
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-300">Categorías</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => applyFilters({ category })}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-widest transition ${
                filters.category === category ? 'bg-secondary text-slate-900' : 'bg-white/5 text-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300" htmlFor="price">
          Rango de precio €{filters.priceRange[0]} - €{filters.priceRange[1]}
        </label>
        <input
          id="price"
          type="range"
          min="50"
          max="5000"
          step="50"
          value={filters.priceRange[1]}
          onChange={(event) => applyFilters({ priceRange: [filters.priceRange[0], Number(event.target.value)] })}
          className="mt-2 w-full"
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-300">Disponibilidad</p>
        {[
          { id: 'all', label: 'Todos los productos' },
          { id: 'inStock', label: 'En stock inmediato' },
          { id: 'preOrder', label: 'Preventa exclusiva' }
        ].map((option) => (
          <label key={option.id} className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="radio"
              checked={filters.availability === option.id}
              onChange={() => applyFilters({ availability: option.id })}
            />
            {option.label}
          </label>
        ))}
      </div>
    </aside>
  );
}
