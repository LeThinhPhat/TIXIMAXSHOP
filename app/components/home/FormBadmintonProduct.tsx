"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ===================== TABS ===================== */

type Tab = {
  key: string;
  label: string;
};

const tabs: Tab[] = [
  { key: "men", label: "Vợt Pickelball Nam" },
  { key: "women", label: "Vợt Pickelball Nữ" },
  { key: "unisex", label: "Vợt Pickelball Unisex" },
  { key: "yonex", label: "Pickelball Name Yonex" },
  { key: "victor", label: "Pickelball Name Victor" },
];

/* ===================== DATA ===================== */

type BadmintonProduct = {
  id: number;
  name: string;
  image: string;
  price: string;
  oldPrice: string;
  discount: string;
};

const products: BadmintonProduct[] = [
  {
    id: 1,
    name: "Vợt cầu lông Yonex Astrox 99 Pro",
    image: "/badminton/yonex1.png",
    price: "4.290.000 đ",
    oldPrice: "4.990.000 đ",
    discount: "-14%",
  },
  {
    id: 2,
    name: "Vợt cầu lông Victor Thruster Ryuga",
    image: "/badminton/yonex2.png",
    price: "3.890.000 đ",
    oldPrice: "4.590.000 đ",
    discount: "-15%",
  },
  {
    id: 3,
    name: "Vợt cầu lông Yonex Nanoflare 700",
    image: "/badminton/yonex3.png",
    price: "3.490.000 đ",
    oldPrice: "4.090.000 đ",
    discount: "-15%",
  },
  {
    id: 4,
    name: "Vợt cầu lông Victor Auraspeed 90K",
    image: "/badminton/yonex4.png",
    price: "3.690.000 đ",
    oldPrice: "4.290.000 đ",
    discount: "-14%",
  },
  {
    id: 5,
    name: "Vợt cầu lông Yonex Arcsaber 11 Pro",
    image: "/badminton/yonex5.png",
    price: "4.090.000 đ",
    oldPrice: "4.790.000 đ",
    discount: "-15%",
  },
];

/* ===================== COMPONENT ===================== */

export default function FormBadmintonProduct() {
  const [activeTab, setActiveTab] = useState<string>("men");

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 border-b">
      {/* Header + Tabs */}
      <div className="flex items-center justify-between mb-8">
        {/* Tabs */}
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap text-sm font-semibold pb-2 border-b-2 transition
                ${
                  activeTab === tab.key
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-black hover:border-gray-300"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* View all */}
        <Link
          href="#"
          className="text-sm font-semibold px-4 py-1.5 border rounded-full
                     hover:bg-black hover:text-white transition"
        >
          Xem tất cả
        </Link>
      </div>

      {/* Product grid – luôn 5 sản phẩm */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        {products.map((item) => (
          <Link key={item.id} href="#" className="group">
            {/* Image */}
            <div className="relative aspect-[3/4]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />

              {/* Discount */}
              <span className="absolute bottom-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {item.discount}
              </span>
            </div>

            {/* Info */}
            <div className="mt-4 space-y-2">
              <h3 className="text-sm leading-snug text-gray-900 line-clamp-2 group-hover:underline">
                {item.name}
              </h3>

              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-black">
                  {item.price}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {item.oldPrice}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
