import { z } from 'zod';

export const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string().optional(),
  postalCode: z.string(),
  country: z.string().default('ES')
});

export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().optional(),
  addresses: z.array(AddressSchema)
});

export const ProductVariantSchema = z.object({
  id: z.string().uuid(),
  sku: z.string(),
  name: z.string(),
  stock: z.number().int(),
  price: z.number().nonnegative(),
  attributes: z.record(z.string())
});

export const ProductSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  images: z.array(z.string().url()),
  variants: z.array(ProductVariantSchema),
  categories: z.array(z.string()),
  rating: z.number().min(0).max(5)
});

export const CartItemSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid(),
  quantity: z.number().int().positive()
});

export const CartSchema = z.object({
  id: z.string().uuid(),
  items: z.array(CartItemSchema),
  currency: z.enum(['EUR', 'USD']),
  subtotal: z.number(),
  discounts: z.number(),
  taxes: z.number(),
  total: z.number()
});

export type Address = z.infer<typeof AddressSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type Cart = z.infer<typeof CartSchema>;
