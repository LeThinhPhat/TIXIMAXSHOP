import { toSlug } from "@/app/data/products";

export type Shoe = {
  id: number;
  name: string;
  image: string;
  price: string;
  oldPrice: string;
  discount: string;
  tab: string[];
};

export { toSlug };

export const shoes: Shoe[] = [
  {
    id: 101,
    name: "Nike Air Force 1 '07",
    image: "/shoes/nike-air-force-1.png",
    price: "2.790.000 đ",
    oldPrice: "3.290.000 đ",
    discount: "-15%",
    tab: ["men", "nike"],
  },
  {
    id: 102,
    name: "Adidas Ultraboost",
    image: "/shoes/adidas-ultraboost.png",
    price: "3.490.000 đ",
    oldPrice: "3.990.000 đ",
    discount: "-12%",
    tab: ["men", "adidas"],
  },
  {
    id: 103,
    name: "Air Jordan 1 Low",
    image: "/shoes/jordan-1-low.png",
    price: "3.190.000 đ",
    oldPrice: "3.790.000 đ",
    discount: "-16%",
    tab: ["men", "nike"],
  },
  {
    id: 104,
    name: "Adidas Samba OG",
    image: "/shoes/adidas-samba.png",
    price: "2.690.000 đ",
    oldPrice: "3.090.000 đ",
    discount: "-13%",
    tab: ["unisex", "adidas"],
  },
  {
    id: 105,
    name: "Nike Dunk Low",
    image: "/shoes/nike-dunk-low.png",
    price: "3.290.000 đ",
    oldPrice: "3.890.000 đ",
    discount: "-15%",
    tab: ["unisex", "nike"],
  },
];

export const shoeTabs = [
  { key: "men", label: "Giày nam" },
  { key: "women", label: "Giày nữ" },
  { key: "unisex", label: "Giày Unisex" },
  { key: "nike", label: "Giày Nike" },
  { key: "adidas", label: "Giày Adidas" },
];
