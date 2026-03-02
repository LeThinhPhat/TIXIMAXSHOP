import {
  products,
  toSlug,
  defaultReviews,
  defaultRatingStats,
} from "@/app/data/products";
import { shoes } from "@/app/data/shoes";
import { watches } from "@/app/data/watches";
import { glasses } from "@/app/data/glasses";
import { badmintonProducts } from "@/app/data/badminton";
import { topProducts } from "@/app/data/topProducts";

export type UniversalProduct = {
  id: number;
  name: string;
  image: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  category?: string;
  country?: string;
  sold?: string;
  description?: string;
  tab?: string[];
  rating?: number;
  badge?: string;
  badgeColor?: string;
  reviews?: import("@/app/data/products").Review[];
  ratingStats?: import("@/app/data/products").RatingStat[];
};

export { toSlug, defaultReviews, defaultRatingStats };
export type { Review, RatingStat } from "@/app/data/products";

export const allProducts: UniversalProduct[] = [
  ...products,
  ...shoes,
  ...watches,
  ...glasses,
  ...badmintonProducts,
  ...topProducts,
];
