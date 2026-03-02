import { toSlug } from "@/app/data/products";

export type Glass = {
  id: number;
  name: string;
  image: string;
  price: string;
  discount: string;
  tab: string[];
};

export { toSlug };

export const glasses: Glass[] = [
  {
    id: 301,
    name: "Ray-Ban Original Wayfarer Classic RB2140",
    image: "/glasses/glass-1.png",
    price: "3,250,000 đ",
    discount: "-35%",
    tab: ["men", "rayban"],
  },
  {
    id: 302,
    name: "Gentle Monster South Side 01 Black",
    image: "/glasses/glass-2.png",
    price: "4,890,000 đ",
    discount: "-25%",
    tab: ["unisex", "gentlemonster"],
  },
  {
    id: 303,
    name: "Police SPLA59 Polarized Sunglasses",
    image: "/glasses/glass-3.png",
    price: "2,150,000 đ",
    discount: "-40%",
    tab: ["men", "rayban"],
  },
  {
    id: 304,
    name: "Oakley Holbrook Classic Matte Black",
    image: "/glasses/glass-4.png",
    price: "3,690,000 đ",
    discount: "-30%",
    tab: ["men", "rayban"],
  },
  {
    id: 305,
    name: "Gucci GG0061S Oversized Sunglasses",
    image: "/glasses/glass-5.png",
    price: "6,400,000 đ",
    discount: "-20%",
    tab: ["women", "gentlemonster"],
  },
];

export const glassTabs = [
  { key: "men", label: "Kính mát nam" },
  { key: "women", label: "Kính mát nữ" },
  { key: "unisex", label: "Kính Unisex" },
  { key: "rayban", label: "Ray-Ban" },
  { key: "gentlemonster", label: "Gentle Monster" },
];
