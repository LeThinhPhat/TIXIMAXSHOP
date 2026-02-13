"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

/* ===================== DATA ===================== */

type Product = {
  id: number;
  name: string;
  price: string;
  discount: string;
  image: string;
};

const tabs: string[] = [
  "Kính mát nam",
  "Kính mát nữ",
  "Kính Unisex",
  "Ray-Ban",
  "Gentle Monster",
];

const products: Product[] = [
  {
    id: 1,
    name: "Ray-Ban Original Wayfarer Classic RB2140",
    price: "3,250,000 đ",
    discount: "-35%",
    image: "/glasses/glass-1.png",
  },
  {
    id: 2,
    name: "Gentle Monster South Side 01 Black",
    price: "4,890,000 đ",
    discount: "-25%",
    image: "/glasses/glass-2.png",
  },
  {
    id: 3,
    name: "Police SPLA59 Polarized Sunglasses",
    price: "2,150,000 đ",
    discount: "-40%",
    image: "/glasses/glass-3.png",
  },
  {
    id: 4,
    name: "Oakley Holbrook Classic Matte Black",
    price: "3,690,000 đ",
    discount: "-30%",
    image: "/glasses/glass-4.png",
  },
  {
    id: 5,
    name: "Gucci GG0061S Oversized Sunglasses",
    price: "6,400,000 đ",
    discount: "-20%",
    image: "/glasses/glass-5.png",
  },
];

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

/* ===================== PRODUCT CARD ===================== */

function GlassCard({ product }: { product: Product }) {
  return (
    <Link href="#" className="group block focus:outline-none">
      <div className="relative aspect-[4/3]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute bottom-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {product.discount}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="text-sm leading-snug text-gray-900 line-clamp-2 group-hover:underline">
          {product.name}
        </h3>
        <p className="text-base font-bold text-black">{product.price}</p>
      </div>
    </Link>
  );
}

/* ===================== MAIN ===================== */

export default function FormGlassProduct() {
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const cardWidth = el.scrollWidth / products.length;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, products.length - 1));
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

      <section className="max-w-7xl mx-auto px-4 py-12 border-b">
        {/* ===== Tabs + View all ===== */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <div className="scroll-hide flex items-center gap-6 md:gap-8 overflow-x-auto flex-1">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`flex-shrink-0 text-sm font-semibold pb-2 border-b-2 transition-all
                  ${
                    activeTab === index
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-black"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <Link
            href="#"
            className="flex-shrink-0 text-sm font-semibold px-4 py-1.5 border rounded-full hover:bg-black hover:text-white transition"
          >
            Xem tất cả
          </Link>
        </div>

        {/* ===== MOBILE: Horizontal Scroll ===== */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            className="scroll-hide flex gap-5 overflow-x-auto pb-2"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              paddingRight: 32,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0"
                style={{
                  width: "65vw",
                  maxWidth: 240,
                  scrollSnapAlign: "start",
                }}
              >
                <GlassCard product={product} />
              </div>
            ))}
          </div>

          <ScrollDots total={products.length} active={activeIndex} />
        </div>

        {/* ===== DESKTOP: Grid ===== */}
        <div className="hidden md:grid grid-cols-5 gap-8">
          {products.map((product) => (
            <GlassCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
