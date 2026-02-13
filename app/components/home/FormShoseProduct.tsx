"use client";

import { useState, useRef, useEffect } from "react";
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

/* ===================== SHOE CARD ===================== */

function ShoeCard({ item }: { item: (typeof shoes)[0] }) {
  return (
    <Link href="#" className="group block focus:outline-none">
      <div className="relative aspect-[3/4]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute bottom-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {item.discount}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="text-sm leading-snug text-gray-900 line-clamp-2 group-hover:underline">
          {item.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-black">{item.price}</span>
          <span className="text-sm text-gray-400 line-through">
            {item.oldPrice}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ===================== MAIN ===================== */

export default function FormShoseProduct() {
  const [activeTab, setActiveTab] = useState("men");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const cardWidth = el.scrollWidth / shoes.length;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, shoes.length - 1));
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
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-shrink-0 whitespace-nowrap text-sm font-semibold pb-2 border-b-2 transition
                  ${
                    activeTab === tab.key
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-black hover:border-gray-300"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Link
            href="#"
            className="flex-shrink-0 text-sm font-semibold px-4 py-1.5 border rounded-full
                       hover:bg-black hover:text-white transition"
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
            {shoes.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0"
                style={{
                  width: "60vw",
                  maxWidth: 220,
                  scrollSnapAlign: "start",
                }}
              >
                <ShoeCard item={item} />
              </div>
            ))}
          </div>

          <ScrollDots total={shoes.length} active={activeIndex} />
        </div>

        {/* ===== DESKTOP: Grid ===== */}
        <div className="hidden md:grid grid-cols-5 gap-8">
          {shoes.map((item) => (
            <ShoeCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
