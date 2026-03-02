"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { watches, watchTabs, toSlug, type Watch } from "@/app/data/watches";

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
            background: i === active ? "#111" : "#e5e7eb",
          }}
        />
      ))}
    </div>
  );
}

/* ===================== WATCH CARD ===================== */

function WatchCard({ product }: { product: Watch }) {
  return (
    <Link
      href={`/products/${toSlug(product.name)}`}
      className="group block focus:outline-none"
    >
      <div className="relative aspect-[3/4]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute bottom-3 left-3 bg-red-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
          {product.discount}
        </span>
      </div>
      <div className="mt-4 space-y-1.5">
        <h3 className="text-sm font-medium text-gray-900 leading-relaxed line-clamp-2 group-hover:underline">
          {product.name}
        </h3>
        <p className="text-base font-semibold text-black">{product.price}</p>
      </div>
    </Link>
  );
}

/* ===================== MAIN ===================== */

export default function FormWatchProduct() {
  const [activeTab, setActiveTab] = useState("men");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = watches.filter((w) => w.tab.includes(activeTab));

  // Reset scroll khi đổi tab
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    setActiveIndex(0);
  }, [activeTab]);

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

      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* ===== Tabs + View all ===== */}
        <div className="flex items-center justify-between mb-10 gap-4">
          <div className="scroll-hide flex items-center gap-6 md:gap-10 overflow-x-auto flex-1">
            {watchTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-shrink-0 text-xs font-semibold uppercase tracking-wide pb-2 border-b-2 transition-colors
                  ${
                    activeTab === tab.key
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-black"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Link
            href="/products"
            className="flex-shrink-0 text-xs font-semibold uppercase tracking-wide px-5 py-2 border border-black rounded-full hover:bg-black hover:text-white transition"
          >
            Xem tất cả
          </Link>
        </div>

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
                className="scroll-hide flex gap-5 overflow-x-auto pb-2"
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
                      width: "60vw",
                      maxWidth: 220,
                      scrollSnapAlign: "start",
                    }}
                  >
                    <WatchCard product={p} />
                  </div>
                ))}
              </div>

              <ScrollDots total={filtered.length} active={activeIndex} />
            </>
          )}
        </div>

        {/* ===== DESKTOP: Grid ===== */}
        <div className="hidden md:grid grid-cols-5 gap-x-8 gap-y-12">
          {filtered.length === 0 ? (
            <p className="col-span-5 text-center text-gray-400 py-10 text-sm">
              Không có sản phẩm phù hợp
            </p>
          ) : (
            filtered.map((p) => <WatchCard key={p.id} product={p} />)
          )}
        </div>
      </section>
    </>
  );
}
