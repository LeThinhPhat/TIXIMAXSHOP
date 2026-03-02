import { toSlug } from "@/app/data/products";

export type TopProduct = {
  id: number;
  name: string;
  image: string;
  price: string;
  oldPrice: string;
  discount: string;
  rating: number;
  sold: string;
  category: string;
  badge: string;
  badgeColor: string;
};

export { toSlug };

export const topProducts: TopProduct[] = [
  {
    id: 501,
    name: "iPhone 15 Pro Max 256GB",
    image: "/products/iphone-15-pro-max.jpg",
    price: "28.990.000đ",
    oldPrice: "32.990.000đ",
    discount: "-12%",
    rating: 4.9,
    sold: "2.3k",
    category: "Điện thoại",
    badge: "Best seller",
    badgeColor: "bg-orange-500",
  },
  {
    id: 502,
    name: "Samsung Galaxy S25 Ultra",
    image: "/products/samsung-s25-ultra.jpg",
    price: "26.490.000đ",
    oldPrice: "29.990.000đ",
    discount: "-12%",
    rating: 4.8,
    sold: "1.8k",
    category: "Điện thoại",
    badge: "Hot",
    badgeColor: "bg-red-500",
  },
  {
    id: 503,
    name: "MacBook Air M3 15-inch",
    image: "/products/macbook-air-m3.jpg",
    price: "31.990.000đ",
    oldPrice: "35.990.000đ",
    discount: "-11%",
    rating: 4.9,
    sold: "960",
    category: "Laptop",
    badge: "Top rated",
    badgeColor: "bg-blue-500",
  },
  {
    id: 504,
    name: "Uniqlo Ultra Light Down Jacket",
    image: "/products/uniqlo-jacket.jpg",
    price: "890.000đ",
    oldPrice: "1.290.000đ",
    discount: "-31%",
    rating: 4.7,
    sold: "5.6k",
    category: "Fashion",
    badge: "Big sale",
    badgeColor: "bg-pink-500",
  },
  {
    id: 505,
    name: "Nike Air Max 270 React",
    image: "/products/nike-air-max-270.jpg",
    price: "2.490.000đ",
    oldPrice: "3.200.000đ",
    discount: "-22%",
    rating: 4.8,
    sold: "3.1k",
    category: "Sports",
    badge: "Favorite",
    badgeColor: "bg-emerald-500",
  },
];
