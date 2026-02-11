"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ===================== TABS ===================== */

const tabs = [
  { key: "men", label: "Giày nam" },
  { key: "women", label: "Giày nữ" },
  { key: "unisex", label: "Giày Unisex" },
  { key: "nike", label: "Giày Nike" },
  { key: "adidas", label: "Giày Adidas" },
];

/* ===================== DATA ===================== */

const shoes = [
  {
    id: 1,
    name: "Nike Air Force 1 '07",
    image: "/shoes/nike-air-force-1.png",
    price: "2.790.000 đ",
    oldPrice: "3.290.000 đ",
    discount: "-15%",
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    image: "/shoes/adidas-ultraboost.png",
    price: "3.490.000 đ",
    oldPrice: "3.990.000 đ",
    discount: "-12%",
  },
  {
    id: 3,
    name: "Air Jordan 1 Low",
    image: "/shoes/jordan-1-low.png",
    price: "3.190.000 đ",
    oldPrice: "3.790.000 đ",
    discount: "-16%",
  },
  {
    id: 4,
    name: "Adidas Samba OG",
    image: "/shoes/adidas-samba.png",
    price: "2.690.000 đ",
    oldPrice: "3.090.000 đ",
    discount: "-13%",
  },
  {
    id: 5,
    name: "Nike Dunk Low",
    image: "/shoes/nike-dunk-low.png",
    price: "3.290.000 đ",
    oldPrice: "3.890.000 đ",
    discount: "-15%",
  },
];

/* ===================== COMPONENT ===================== */

export default function FormShoseProduct() {
  const [activeTab, setActiveTab] = useState("men");

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

      {/* Product grid – LUÔN 5 SẢN PHẨM */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        {shoes.map((item) => (
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
