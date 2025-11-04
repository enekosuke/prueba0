import User from '../models/User.js';
import Order from '../models/Order.js';

export const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password').populate('favourites');
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ profile: user, orders, favourites: user.favourites });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const toggleFavourite = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const index = user.favourites.findIndex((fav) => fav.equals(req.params.productId));
    if (index > -1) {
      user.favourites.splice(index, 1);
    } else {
      user.favourites.push(req.params.productId);
    }
    await user.save();
    await user.populate('favourites');
    res.json(user.favourites);
  } catch (error) {
    next(error);
  }
};
