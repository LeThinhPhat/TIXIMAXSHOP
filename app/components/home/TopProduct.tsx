"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { IconHeart, IconShoppingCart } from "@tabler/icons-react";
import { topProducts, toSlug, type TopProduct } from "@/app/data/topProducts";

/* ===================== STAR ===================== */

function StarRating({ rating, sold }: { rating: number; sold: string }) {
  return (
    <div className="flex items-center gap-1.5 mt-1.5">
      <div className="flex items-center gap-0.5">
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
      </div>
      <span className="text-[11px] font-semibold text-amber-500">{rating}</span>
      <span className="text-[10px] text-gray-400">· {sold} đã bán</span>
    </div>
  );
}

/* ===================== PRODUCT CARD ===================== */

function ProductCard({ product }: { product: TopProduct }) {
  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
      {/* ── Image ── */}
      <Link href={`/products/${toSlug(product.name)}`} className="block relative aspect-square bg-gray-50">
        {/* Top-right badge */}
        <span
          className={`absolute top-2.5 right-2.5 z-10 ${product.badgeColor} text-white text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-sm`}
        >
          {product.badge}
        </span>

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-5 group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount badge — bottom left */}
        <span className="absolute bottom-2.5 left-2.5 bg-red-500 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
          {product.discount}
        </span>

        {/* Quick add — slides up on hover (desktop) */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
          <button
            onClick={(e) => e.preventDefault()}
            className="w-full bg-gray-900/90 backdrop-blur-sm text-white text-[12px] font-semibold py-2.5 flex items-center justify-center gap-1.5 hover:bg-gray-900 transition-colors"
          >
            <IconShoppingCart size={13} />
            Thêm vào giỏ
          </button>
        </div>
      </Link>

      {/* Wishlist button */}
      <button
        aria-label="Yêu thích"
        className="absolute top-2.5 left-2.5 z-10 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors"
      >
        <IconHeart size={14} />
      </button>

      {/* ── Info ── */}
      <Link href={`/products/${toSlug(product.name)}`} className="block p-3.5">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
          {product.category}
        </span>

        <h3 className="text-[13px] font-medium text-gray-900 mt-1 line-clamp-2 group-hover:text-orange-500 transition-colors leading-snug min-h-[2.6em]">
          {product.name}
        </h3>

        <StarRating rating={product.rating} sold={product.sold} />

        <div className="mt-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-bold text-orange-500 leading-none">
              {product.price}
            </span>
            <span className="text-[11px] font-semibold text-white bg-red-500 rounded px-1.5 py-0.5 leading-none">
              {product.discount}
            </span>
          </div>
          <span className="text-[11px] text-gray-400 line-through mt-0.5 block">
            {product.oldPrice}
          </span>
        </div>
      </Link>
    </div>
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
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-orange-500 rounded-full" />
            <h2 className="text-xl font-semibold text-gray-900">
              Top Selling Products
            </h2>
            <span className="text-[11px] font-bold text-orange-500 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full">
              HOT
            </span>
          </div>
          <Link
            href="/products"
            className="text-[13px] font-medium text-orange-500 hover:text-orange-600 transition-colors"
          >
            Xem tất cả →
          </Link>
        </div>

        {/* ── Mobile: horizontal scroll ── */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            className="scroll-hide flex gap-3 overflow-x-auto pb-2"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", paddingRight: 32 }}
          >
            {topProducts.map((product) => (
              <div
                key={product.id}
                className="shrink-0"
                style={{ width: "72vw", maxWidth: 260, scrollSnapAlign: "start" }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <ScrollDots total={topProducts.length} active={activeIndex} />
        </div>

        {/* ── Desktop: grid ── */}
        <div className="hidden md:grid grid-cols-5 gap-4">
          {topProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
