"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { topProducts, toSlug, type TopProduct } from "@/app/data/topProducts";

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
      <span className="text-xs text-gray-500 ml-1">{rating}</span>
    </div>
  );
}

/* ===================== PRODUCT CARD ===================== */

function ProductCard({ product }: { product: TopProduct }) {
  return (
    <Link
      href={`/products/${toSlug(product.name)}`}
      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden
                 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300
                 focus:outline-none"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-50">
        <span
          className={`absolute top-3 right-3 z-10 ${product.badgeColor}
            text-white text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-sm`}
        >
          {product.badge}
        </span>

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-5 group-hover:scale-105 transition-transform duration-300"
        />

        <span className="absolute bottom-3 left-3 bg-red-500 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
          {product.discount}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
          {product.category}
        </span>

        <h3 className="text-sm font-medium text-gray-900 mt-1 line-clamp-2 group-hover:text-orange-500 transition-colors leading-snug">
          {product.name}
        </h3>

        <StarRating rating={product.rating} />

        <div className="mt-3">
          <span className="text-base font-bold text-orange-500">
            {product.price}
          </span>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-xs text-gray-400 line-through">
              {product.oldPrice}
            </span>
            <span className="text-xs text-gray-400">Đã bán {product.sold}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ===================== SCROLL DOTS ===================== */

function ScrollDots({ total, active }: { total: number; active: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5 mt-5 md:hidden">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="block rounded-full transition-all duration-300"
          style={{
            width: i === active ? 20 : 6,
            height: 6,
            background: i === active ? "#f97316" : "#e5e7eb",
          }}
        />
      ))}
    </div>
  );
}

/* ===================== MAIN ===================== */

export default function TopProduct() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const cardWidth = el.scrollWidth / topProducts.length;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, topProducts.length - 1));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .scroll-hide::-webkit-scrollbar { display: none; }
        .scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <section className="max-w-7xl mx-auto px-4 py-10">
        {/* ===== Header ===== */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-orange-500 rounded-full" />
            <h2 className="text-xl font-semibold text-gray-900">
              Top Selling Products
            </h2>
            <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
              HOT
            </span>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium text-orange-500 hover:underline"
          >
            Xem tất cả →
          </Link>
        </div>

        {/* ===== MOBILE: Horizontal Scroll ===== */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            className="scroll-hide flex gap-4 overflow-x-auto pb-2"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              paddingRight: 32,
            }}
          >
            {topProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0"
                style={{
                  width: "72vw",
                  maxWidth: 280,
                  scrollSnapAlign: "start",
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <ScrollDots total={topProducts.length} active={activeIndex} />
        </div>

        {/* ===== DESKTOP: Grid ===== */}
        <div className="hidden md:grid grid-cols-5 gap-5">
          {topProducts.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
