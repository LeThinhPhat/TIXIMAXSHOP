"use client";
import { useState } from "react";
import Link from "next/link";

const tabs = [
  "Tất cả",
  "Điện tử",
  "Thời trang",
  "Nhà cửa",
  "Làm đẹp",
  "Thể thao",
];

const products = [
  {
    id: 1,
    name: "Tai nghe Sony WH-1000XM5",
    price: "6.490.000đ",
    oldPrice: "8.990.000đ",
    discount: "-28%",
    rating: 4.8,
    sold: "1.2k",
    category: "Điện tử",
    emoji: "🎧",
    isNew: false,
    isSale: true,
  },
  {
    id: 2,
    name: "Váy hoa nhí vintage phong cách Hàn Quốc",
    price: "345.000đ",
    oldPrice: "490.000đ",
    discount: "-30%",
    rating: 4.6,
    sold: "3.4k",
    category: "Thời trang",
    emoji: "👗",
    isNew: true,
    isSale: false,
  },
  {
    id: 3,
    name: "Máy xay sinh tố Philips HR2041",
    price: "890.000đ",
    oldPrice: "1.190.000đ",
    discount: "-25%",
    rating: 4.5,
    sold: "680",
    category: "Nhà cửa",
    emoji: "🥤",
    isNew: false,
    isSale: true,
  },
  {
    id: 4,
    name: "Serum Vitamin C The Ordinary",
    price: "290.000đ",
    oldPrice: "390.000đ",
    discount: "-26%",
    rating: 4.7,
    sold: "8.9k",
    category: "Làm đẹp",
    emoji: "✨",
    isNew: false,
    isSale: false,
  },
  {
    id: 5,
    name: "Giày chạy bộ Asics Gel-Nimbus 25",
    price: "3.290.000đ",
    oldPrice: "4.200.000đ",
    discount: "-22%",
    rating: 4.9,
    sold: "450",
    category: "Thể thao",
    emoji: "👟",
    isNew: true,
    isSale: false,
  },
  {
    id: 6,
    name: "Bàn phím cơ Keychron K2 Pro",
    price: "2.490.000đ",
    oldPrice: "2.990.000đ",
    discount: "-17%",
    rating: 4.8,
    sold: "920",
    category: "Điện tử",
    emoji: "⌨️",
    isNew: false,
    isSale: true,
  },
  {
    id: 7,
    name: "Áo polo nam Cotton cao cấp",
    price: "290.000đ",
    oldPrice: "450.000đ",
    discount: "-36%",
    rating: 4.5,
    sold: "4.1k",
    category: "Thời trang",
    emoji: "👔",
    isNew: false,
    isSale: false,
  },
  {
    id: 8,
    name: "Đèn bàn LED thông minh Xiaomi",
    price: "490.000đ",
    oldPrice: "690.000đ",
    discount: "-29%",
    rating: 4.6,
    sold: "2.3k",
    category: "Nhà cửa",
    emoji: "💡",
    isNew: true,
    isSale: false,
  },
  {
    id: 9,
    name: "Kem chống nắng Anessa SPF50+",
    price: "450.000đ",
    oldPrice: "590.000đ",
    discount: "-24%",
    rating: 4.9,
    sold: "12k",
    category: "Làm đẹp",
    emoji: "🌞",
    isNew: false,
    isSale: true,
  },
  {
    id: 10,
    name: "Bình nước thể thao 1L Hydro Flask",
    price: "790.000đ",
    oldPrice: "990.000đ",
    discount: "-20%",
    rating: 4.7,
    sold: "1.5k",
    category: "Thể thao",
    emoji: "🍶",
    isNew: false,
    isSale: false,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3 h-3 ${star <= Math.floor(rating) ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-[11px] text-gray-500 ml-1">{rating}</span>
    </div>
  );
}

export default function ListProduct() {
  const [activeTab, setActiveTab] = useState("Tất cả");

  const filtered =
    activeTab === "Tất cả"
      ? products
      : products.filter((p) => p.category === activeTab);

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-orange-500 rounded-full" />
          <h2 className="text-xl font-black text-gray-950">Tất Cả Sản Phẩm</h2>
        </div>
        <Link
          href="#"
          className="text-sm font-semibold text-orange-500 hover:underline"
        >
          Xem thêm →
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === tab
                ? "bg-gray-950 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {filtered.map((product) => (
          <Link
            key={product.id}
            href="#"
            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            {/* Image */}
            <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
              {product.isNew && (
                <span className="absolute top-2 left-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                  NEW
                </span>
              )}
              {product.isSale && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                  SALE
                </span>
              )}
              <div className="w-full h-full flex items-center justify-center text-5xl opacity-25 group-hover:scale-110 transition-transform duration-300">
                {product.emoji}
              </div>
              {/* Wishlist */}
              <button className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 duration-200">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <span className="absolute bottom-2 right-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                {product.discount}
              </span>
            </div>

            {/* Info */}
            <div className="p-3">
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                {product.category}
              </span>
              <h3 className="text-sm font-bold text-gray-900 mt-0.5 leading-snug line-clamp-2 group-hover:text-orange-500 transition-colors">
                {product.name}
              </h3>
              <div className="mt-1">
                <StarRating rating={product.rating} />
              </div>
              <div className="mt-2">
                <span className="text-base font-black text-orange-500">
                  {product.price}
                </span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs text-gray-400 line-through">
                    {product.oldPrice}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Đã bán {product.sold}
                  </span>
                </div>
              </div>
              <button className="w-full mt-3 py-2 bg-gray-950 hover:bg-orange-500 text-white text-xs font-bold rounded-lg transition-colors">
                Thêm vào giỏ
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* Load more */}
      <div className="mt-8 flex justify-center">
        <button className="px-10 py-3 border-2 border-gray-950 text-gray-950 font-bold text-sm rounded-full hover:bg-gray-950 hover:text-white transition-all duration-200">
          Xem thêm sản phẩm
        </button>
      </div>
    </section>
  );
}
