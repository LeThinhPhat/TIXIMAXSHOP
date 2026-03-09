"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconHeart, IconShoppingCart } from "@tabler/icons-react";
import {
  products,
  countries,
  categories,
  toSlug,
  type Product,
} from "@/app/data/products";

/* ===================== HELPERS ===================== */

function calcDiscount(price: string, oldPrice: string): string | null {
  const p = parseInt(price.replace(/\D/g, ""));
  const op = parseInt(oldPrice.replace(/\D/g, ""));
  if (!p || !op || op <= p) return null;
  return `-${Math.round((1 - p / op) * 100)}%`;
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

/* ===================== PRODUCT CARD ===================== */

function ProductCard({ p }: { p: Product }) {
  const discount = calcDiscount(p.price, p.oldPrice);

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* ── Image ── */}
      <Link href={`/products/${toSlug(p.name)}`} className="block relative aspect-square bg-gray-50">
        <Image
          src={p.image}
          alt={p.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount badge */}
        {discount && (
          <span className="absolute top-2.5 left-2.5 bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            {discount}
          </span>
        )}

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
        className="absolute top-2.5 right-2.5 z-10 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors"
      >
        <IconHeart size={14} />
      </button>

      {/* ── Info ── */}
      <Link href={`/products/${toSlug(p.name)}`} className="block p-3.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold text-orange-500 uppercase tracking-wider truncate max-w-[60%]">
            {p.category}
          </span>
          <span className="text-[10px] text-gray-400 truncate ml-1">{p.country}</span>
        </div>

        <h3 className="text-[13px] font-medium text-gray-900 leading-snug line-clamp-2 group-hover:text-orange-500 transition-colors min-h-[2.6em]">
          {p.name}
        </h3>

        <div className="mt-2.5 flex items-end justify-between gap-2">
          <div>
            <span className="block text-[15px] font-bold text-orange-500 leading-none">
              {p.price}
            </span>
            {p.oldPrice && (
              <span className="text-[11px] text-gray-400 line-through mt-0.5 block">
                {p.oldPrice}
              </span>
            )}
          </div>
          <span className="text-[11px] text-gray-400 shrink-0">
            Đã bán {p.sold}
          </span>
        </div>
      </Link>
    </div>
  );
}

/* ================= MAIN ================= */

export default function ListProduct() {
  const [activeCountry, setActiveCountry] = useState("Tất cả");
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = products.filter((p) => {
    const okCountry = activeCountry === "Tất cả" || p.country === activeCountry;
    const okCategory =
      activeCategory === "Tất cả" || p.category === activeCategory;
    return okCountry && okCategory;
  });

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    setActiveIndex(0);
  }, [activeCountry, activeCategory]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const cardWidth = el.scrollWidth / Math.max(filtered.length, 1);
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, filtered.length - 1));
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [filtered.length]);

  return (
    <>
      <style>{`
        .scroll-hide::-webkit-scrollbar { display: none; }
        .scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <section className="max-w-7xl mx-auto px-4 py-10">
        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 bg-orange-500 rounded-full" />
            <h2 className="text-2xl font-semibold text-gray-900">All Products</h2>
          </div>

          <div className="scroll-hide flex gap-2 overflow-x-auto">
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCountry(c)}
                className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition ${
                  activeCountry === c
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* ── Category filter ── */}
        <div className="scroll-hide flex gap-2 mb-6 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-[13px] font-medium transition ${
                activeCategory === cat
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-gray-200 mb-6" />

        {/* ── Mobile: horizontal scroll ── */}
        <div className="md:hidden">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-10 text-sm">
              Không có sản phẩm phù hợp
            </p>
          ) : (
            <>
              <div
                ref={scrollRef}
                className="scroll-hide flex gap-3 overflow-x-auto pb-2"
                style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", paddingRight: 32 }}
              >
                {filtered.map((p) => (
                  <div
                    key={p.id}
                    className="shrink-0"
                    style={{ width: "72vw", maxWidth: 260, scrollSnapAlign: "start" }}
                  >
                    <ProductCard p={p} />
                  </div>
                ))}
              </div>
              <ScrollDots total={filtered.length} active={activeIndex} />
            </>
          )}
        </div>

        {/* ── Desktop: grid ── */}
        <div className="hidden md:grid grid-cols-5 gap-4">
          {filtered.length === 0 ? (
            <p className="col-span-5 text-center text-gray-400 py-10 text-sm">
              Không có sản phẩm phù hợp
            </p>
          ) : (
            filtered.map((p) => <ProductCard key={p.id} p={p} />)
          )}
        </div>
      </section>
    </>
  );
}
