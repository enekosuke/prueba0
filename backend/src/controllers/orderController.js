import Stripe from 'stripe';
import paypal from '@paypal/checkout-server-sdk';
import sanitizeHtml from 'sanitize-html';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const paypalEnvironment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const paypalClient = new paypal.core.PayPalHttpClient(paypalEnvironment);

export const createCheckout = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Carrito vacío' });
    }

    const shipping = {
      firstName: sanitizeHtml(req.body.firstName),
      lastName: sanitizeHtml(req.body.lastName),
      email: sanitizeHtml(req.body.email),
      phone: sanitizeHtml(req.body.phone),
      address: sanitizeHtml(req.body.address),
      city: sanitizeHtml(req.body.city),
      postalCode: sanitizeHtml(req.body.postalCode),
      country: sanitizeHtml(req.body.country)
    };

    const total = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0) * 1.21;

    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map((item) => ({ product: item.product._id, quantity: item.quantity, price: item.product.price })),
      total,
      paymentMethod: req.body.paymentMethod,
      reference: `LUM-${Date.now()}`,
      shipping
    });

    if (req.body.paymentMethod === 'stripe') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: cart.items.map((item) => ({
          price_data: {
            currency: 'eur',
            product_data: { name: item.product.name },
            unit_amount: Math.round(item.product.price * 100)
          },
          quantity: item.quantity
        })),
        success_url: `${process.env.CORS_ORIGIN}/checkout?success=true`,
        cancel_url: `${process.env.CORS_ORIGIN}/checkout?cancelled=true`
      });
      return res.json({ redirectUrl: session.url, order });
    }

    if (req.body.paymentMethod === 'paypal') {
      const request = new paypal.orders.OrdersCreateRequest();
      request.prefer('return=representation');
      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: total.toFixed(2)
            }
          }
        ]
      });
      const response = await paypalClient.execute(request);
      return res.json({ redirectUrl: response.result.links.find((link) => link.rel === 'approve')?.href, order });
    }

    res.json({ order });
  } catch (error) {
    next(error);
  }
};

export const listOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};
