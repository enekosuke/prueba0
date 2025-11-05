import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuggestions } from '@/slices/productSlice';

export default function useAutocomplete(query) {
  const dispatch = useDispatch();
  const { suggestions } = useSelector((state) => state.products);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length > 2) {
      dispatch(fetchSuggestions(trimmed));
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [query, dispatch]);

  return { suggestions, open, setOpen };
}
