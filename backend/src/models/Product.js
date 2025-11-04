import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: String,
    category: String,
    price: { type: Number, required: true },
    availability: { type: String, enum: ['inStock', 'preOrder'], default: 'inStock' },
    images: [String],
    colorway: String,
    specifications: [String],
    care: String,
    reviews: [
      {
        name: String,
        rating: Number,
        comment: String,
        date: String
      }
    ],
    tags: [String],
    stock: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
