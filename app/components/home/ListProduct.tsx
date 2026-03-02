"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  products,
  countries,
  categories,
  toSlug,
  type Product,
} from "@/app/data/products";

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
  return (
    <Link
      href={`/products/${toSlug(p.name)}`}
      className="group bg-white rounded-xl border border-gray-100 hover:shadow-lg transition block focus:outline-none"
    >
      <div className="relative aspect-square bg-gray-50 rounded-t-xl overflow-hidden">
        <Image
          src={p.image}
          alt={p.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{p.category}</span>
          <span>{p.country}</span>
        </div>

        <h3 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">
          {p.name}
        </h3>

        <div className="mt-3">
          <span className="text-base font-semibold text-orange-500">
            {p.price}
          </span>
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span className="line-through">{p.oldPrice}</span>
            <span>Sold {p.sold}</span>
          </div>
        </div>
      </div>
    </Link>
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
        {/* ===== HEADER ===== */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 bg-orange-500 rounded-full" />
            <h2 className="text-2xl font-semibold text-gray-900">
              All Products
            </h2>
          </div>

          <div className="scroll-hide flex gap-2 overflow-x-auto">
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCountry(c)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
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

        {/* ===== CATEGORY ===== */}
        <div className="scroll-hide flex gap-2 mb-6 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ===== DIVIDER ===== */}
        <div className="h-[2px] bg-black/60 mb-6" />

        {/* ===== MOBILE: Horizontal Scroll ===== */}
        <div className="md:hidden">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-10 text-sm">
              Không có sản phẩm phù hợp
            </p>
          ) : (
            <>
              <div
                ref={scrollRef}
                className="scroll-hide flex gap-4 overflow-x-auto pb-2"
                style={{
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  paddingRight: 32,
                }}
              >
                {filtered.map((p) => (
                  <div
                    key={p.id}
                    className="flex-shrink-0"
                    style={{
                      width: "72vw",
                      maxWidth: 280,
                      scrollSnapAlign: "start",
                    }}
                  >
                    <ProductCard p={p} />
                  </div>
                ))}
              </div>

              <ScrollDots total={filtered.length} active={activeIndex} />
            </>
          )}
        </div>

        {/* ===== DESKTOP: Grid ===== */}
        <div className="hidden md:grid grid-cols-5 gap-5">
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
