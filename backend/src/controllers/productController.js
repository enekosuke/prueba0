import Product from '../models/Product.js';

export const listProducts = async (req, res, next) => {
  try {
    const { category, query, availability } = req.query;
    const filters = {};
    if (category && category !== 'todos') filters.category = category;
    if (availability && availability !== 'all') filters.availability = availability;
    if (query) {
      filters.$text = { $search: query };
    }
    const products = await Product.find(filters).limit(60);
    const featured = await Product.find().sort({ createdAt: -1 }).limit(6);
    const recommended = await Product.find().sort({ stock: -1 }).limit(3);
    res.json({ products, featured, recommended });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ $or: [{ _id: req.params.id }, { slug: req.params.id }] });
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const suggestions = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);
    const results = await Product.find({ name: new RegExp(query, 'i') }).limit(5).select('name');
    res.json(results.map((product) => product.name));
  } catch (error) {
    next(error);
  }
};
