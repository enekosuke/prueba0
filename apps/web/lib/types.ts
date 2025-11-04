export interface Price {
  id: string;
  currency: string;
  amount: string;
  compareAt?: string | null;
}

export interface Inventory {
  stock: number;
  reserved: number;
  threshold: number;
}

export interface Variant {
  id: string;
  name: string;
  sku: string;
  attributes: Record<string, string>;
  inventory?: Inventory;
  stock?: number;
  price?: number | null;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  heroImage: string;
  images: { url: string; alt: string }[];
  variants: Variant[];
  prices: Price[];
  reviews?: { rating: number }[];
  rating?: number | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface CartItem {
  id: string;
  variantId: string;
  variantName: string;
  productTitle: string;
  productSlug: string;
  attributes: Record<string, string>;
  quantity: number;
  unitPrice: number;
  total: number;
  stock: number;
}

export interface CartTotals {
  subtotal: number;
  discounts: number;
  taxes: number;
  total: number;
}

export interface CartCoupon {
  id: string;
  code: string;
  type: string;
  value: number;
}

export interface Cart {
  id: string;
  currency: 'EUR' | 'USD';
  items: CartItem[];
  totals: CartTotals;
  coupons: CartCoupon[];
}
