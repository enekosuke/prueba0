import productsData from '../data/products.json' assert { type: 'json' };

const products = Array.isArray(productsData) ? productsData : [];

const sanitizePagination = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) return fallback;
  return parsed;
};

const normalizeString = (input) => (input || '').toString().toLowerCase();

const parseNumber = (value) => {
  if (value === undefined || value === null) return null;
  if (typeof value === 'string' && value.trim() === '') return null;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};

const filterProducts = ({ q, category, minPrice, maxPrice }) => {
  const query = normalizeString(q);
  const min = parseNumber(minPrice);
  const max = parseNumber(maxPrice);

  return products.filter((product) => {
    if (category && product.category !== category) {
      return false;
    }

    const price = Number(product.price) || 0;
    if (min !== null && price < min) {
      return false;
    }
    if (max !== null && price > max) {
      return false;
    }

    if (query) {
      const haystack = [
        product.name,
        product.description,
        ...(product.colors || []),
        ...(product.sizes || [])
      ]
        .map(normalizeString)
        .join(' ');

      if (!haystack.includes(query)) {
        return false;
      }
    }

    return true;
  });
};

export const listProducts = (req, res, next) => {
  try {
    const page = sanitizePagination(req.query.page, 1);
    const limit = Math.min(sanitizePagination(req.query.limit, 24), 100);
    const skip = (page - 1) * limit;

    const filtered = filterProducts({
      q: req.query.q,
      category: req.query.category,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice
    });

    const total = filtered.length;
    const paginated = filtered.slice(skip, skip + limit);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      products: paginated
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = (req, res, next) => {
  try {
    const { id } = req.params;
    const product = products.find((item) => item.id === id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const getProductBySlug = (_req, res) => {
  res.status(404).json({ message: 'Producto no encontrado' });
};

export const suggestions = (req, res, next) => {
  try {
    const query = normalizeString(req.query.query);
    if (!query || query.length < 3) {
      return res.json([]);
    }

    const matches = filterProducts({ q: query }).slice(0, 5);
    res.json(
      matches.map((product) => ({
        id: product.id,
        name: product.name
      }))
    );
  } catch (error) {
    next(error);
  }
};
