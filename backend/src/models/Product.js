import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    shortDescription: { type: String, required: true, maxlength: 200 },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    gender: { type: String, enum: ['men', 'women', 'unisex'], required: true },
    sizes: [{ type: String, enum: ['XS', 'S', 'M', 'L', 'XL'], required: true }],
    colors: [{ type: String, required: true }],
    price: { type: Number, required: true, min: 5, max: 200 },
    discount: { type: Number, default: 0, min: 0, max: 40 },
    stock: { type: Number, required: true, min: 0 },
    rating: { type: Number, min: 0, max: 5 },
    images: [{ type: String, required: true }],
    tags: [{ type: String }]
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret._id = ret._id.toString();
        return ret;
      }
    }
  }
);

productSchema.index({ title: 'text', shortDescription: 'text', tags: 'text' });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
