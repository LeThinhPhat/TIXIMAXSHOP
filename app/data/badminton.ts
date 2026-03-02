import { toSlug } from "@/app/data/products";

export type BadmintonProduct = {
  id: number;
  name: string;
  image: string;
  price: string;
  oldPrice: string;
  discount: string;
  tab: string[];
};

export { toSlug };

export const badmintonProducts: BadmintonProduct[] = [
  {
    id: 401,
    name: "Vợt cầu lông Yonex Astrox 99 Pro",
    image: "/badminton/yonex1.png",
    price: "4.290.000 đ",
    oldPrice: "4.990.000 đ",
    discount: "-14%",
    tab: ["men", "yonex"],
  },
  {
    id: 402,
    name: "Vợt cầu lông Victor Thruster Ryuga",
    image: "/badminton/yonex2.png",
    price: "3.890.000 đ",
    oldPrice: "4.590.000 đ",
    discount: "-15%",
    tab: ["men", "victor"],
  },
  {
    id: 403,
    name: "Vợt cầu lông Yonex Nanoflare 700",
    image: "/badminton/yonex3.png",
    price: "3.490.000 đ",
    oldPrice: "4.090.000 đ",
    discount: "-15%",
    tab: ["unisex", "yonex"],
  },
  {
    id: 404,
    name: "Vợt cầu lông Victor Auraspeed 90K",
    image: "/badminton/yonex4.png",
    price: "3.690.000 đ",
    oldPrice: "4.290.000 đ",
    discount: "-14%",
    tab: ["unisex", "victor"],
  },
  {
    id: 405,
    name: "Vợt cầu lông Yonex Arcsaber 11 Pro",
    image: "/badminton/yonex5.png",
    price: "4.090.000 đ",
    oldPrice: "4.790.000 đ",
    discount: "-15%",
    tab: ["women", "yonex"],
  },
];

export const badmintonTabs = [
  { key: "men", label: "Vợt Pickelball Nam" },
  { key: "women", label: "Vợt Pickelball Nữ" },
  { key: "unisex", label: "Vợt Pickelball Unisex" },
  { key: "yonex", label: "Pickelball Name Yonex" },
  { key: "victor", label: "Pickelball Name Victor" },
];
