"use client";

import Link from "next/link";
import Image from "next/image";

/* ===================== DATA ===================== */

const topProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    image: "/products/iphone-15-pro-max.jpg",
    price: "28.990.000đ",
    oldPrice: "32.990.000đ",
    discount: "-12%",
    rating: 4.9,
    sold: "2.3k",
    category: "Điện thoại",
    badge: "Bán chạy",
    badgeColor: "bg-orange-500",
  },
  {
    id: 2,
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
    id: 3,
    name: "MacBook Air M3 15 inch",
    image: "/products/macbook-air-m3.jpg",
    price: "31.990.000đ",
    oldPrice: "35.990.000đ",
    discount: "-11%",
    rating: 4.9,
    sold: "960",
    category: "Laptop",
    badge: "Top seller",
    badgeColor: "bg-blue-500",
  },
  {
    id: 4,
    name: "Áo khoác Uniqlo Ultra Light",
    image: "/products/uniqlo-jacket.jpg",
    price: "890.000đ",
    oldPrice: "1.290.000đ",
    discount: "-31%",
    rating: 4.7,
    sold: "5.6k",
    category: "Thời trang",
    badge: "Sale lớn",
    badgeColor: "bg-pink-500",
  },
  {
    id: 5,
    name: "Nike Air Max 270 React",
    image: "/products/nike-air-max-270.jpg",
    price: "2.490.000đ",
    oldPrice: "3.200.000đ",
    discount: "-22%",
    rating: 4.8,
    sold: "3.1k",
    category: "Thể thao",
    badge: "Yêu thích",
    badgeColor: "bg-emerald-500",
  },
];

/* ===================== STAR ===================== */

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 mt-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3 h-3 ${
            star <= Math.floor(rating) ? "text-amber-400" : "text-gray-200"
          }`}
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

/* ===================== COMPONENT ===================== */

export default function TopProduct() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-orange-500 rounded-full" />
          <h2 className="text-xl font-black text-gray-950">
            Top Sản Phẩm Bán Chạy
          </h2>
          <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
            🔥 HOT
          </span>
        </div>

        <Link
          href="#"
          className="text-sm font-semibold text-orange-500 hover:underline"
        >
          Xem tất cả →
        </Link>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
        {topProducts.map((product) => (
          <Link
            key={product.id}
            href="#"
            className="group bg-white border border-gray-100 rounded-3xl overflow-hidden
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
          >
            {/* Image */}
            <div className="relative aspect-square bg-gray-50">
              <span
                className={`absolute top-3 right-3 z-10 ${product.badgeColor}
                            text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}
              >
                {product.badge}
              </span>

              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 20vw"
                className="object-contain p-5 group-hover:scale-105 transition-transform duration-300"
              />

              <span className="absolute bottom-3 right-3 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                {product.discount}
              </span>
            </div>

            {/* Info */}
            <div className="p-4">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                {product.category}
              </span>

              <h3 className="text-sm font-bold text-gray-900 mt-1 line-clamp-2 group-hover:text-orange-500 transition-colors">
                {product.name}
              </h3>

              <StarRating rating={product.rating} />

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
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
