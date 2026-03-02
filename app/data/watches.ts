import { toSlug } from "@/app/data/products";

export type Watch = {
  id: number;
  name: string;
  image: string;
  price: string;
  oldPrice?: string;
  discount: string;
  tab: string[];
};

export { toSlug };

export const watches: Watch[] = [
  {
    id: 201,
    name: "Hampton Black Dial Men's Gift Set AX7101",
    image: "/watches/watch-1.png",
    price: "4.779.487 ₫",
    discount: "-33%",
    tab: ["men", "tissot"],
  },
  {
    id: 202,
    name: "Đồng hồ nam Maquina Quartz mặt số xanh 96B407",
    image: "/watches/watch-2.png",
    price: "9.400.874 ₫",
    discount: "-48%",
    tab: ["men", "hamilton"],
  },
  {
    id: 203,
    name: "Signature Blue Dial Brown Leather Men's Watch SKW6355",
    image: "/watches/watch-3.png",
    price: "2.416.854 ₫",
    discount: "-43%",
    tab: ["men", "tissot"],
  },
  {
    id: 204,
    name: "Đồng hồ nam Quartz mặt số đen BI5052-59E",
    image: "/watches/watch-4.png",
    price: "3.866.322 ₫",
    discount: "-43%",
    tab: ["unisex", "hamilton"],
  },
  {
    id: 205,
    name: "Neutra Chronograph Quartz Black Dial Men's Watch FS6093",
    image: "/watches/watch-5.png",
    price: "3.680.038 ₫",
    discount: "-38%",
    tab: ["men", "tissot"],
  },
];

export const watchTabs = [
  { key: "men", label: "Đồng hồ nam" },
  { key: "women", label: "Đồng hồ nữ" },
  { key: "unisex", label: "Đồng hồ Unisex" },
  { key: "tissot", label: "Đồng hồ Tissot" },
  { key: "hamilton", label: "Đồng hồ Hamilton" },
];
