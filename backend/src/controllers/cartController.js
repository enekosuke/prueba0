import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const hydrateCart = async (cart) => {
  await cart.populate('items.product');
  const subtotal = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 300 ? 0 : 15;
  const taxes = subtotal * 0.21;
  const total = subtotal + shipping + taxes;
  return { items: cart.items, subtotal, shipping, taxes, total };
};

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }) || (await Cart.create({ user: req.user._id, items: [] }));
    res.json(await hydrateCart(cart));
  } catch (error) {
    next(error);
  }
};

export const addItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    const cart = await Cart.findOne({ user: req.user._id }) || (await Cart.create({ user: req.user._id, items: [] }));
    const existing = cart.items.find((item) => item.product.equals(productId));
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    res.json(await hydrateCart(cart));
  } catch (error) {
    next(error);
  }
};

export const removeItem = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
    cart.items = cart.items.filter((item) => !item._id.equals(req.params.itemId));
    await cart.save();
    res.json(await hydrateCart(cart));
  } catch (error) {
    next(error);
  }
};
