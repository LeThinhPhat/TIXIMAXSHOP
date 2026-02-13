"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const tabs = [
  "Đồng hồ nam",
  "Đồng hồ nữ",
  "Đồng hồ Unisex",
  "Đồng hồ Tissot",
  "Đồng hồ Hamilton",
];

const products = [
  {
    id: 1,
    name: "Hampton Black Dial Men's Gift Set AX7101",
    price: "4.779.487 ₫",
    discount: "-33%",
    image: "/watches/watch-1.png",
  },
  {
    id: 2,
    name: "Đồng hồ nam Maquina Quartz mặt số xanh 96B407",
    price: "9.400.874 ₫",
    discount: "-48%",
    image: "/watches/watch-2.png",
  },
  {
    id: 3,
    name: "Signature Blue Dial Brown Leather Men's Watch SKW6355",
    price: "2.416.854 ₫",
    discount: "-43%",
    image: "/watches/watch-3.png",
  },
  {
    id: 4,
    name: "Đồng hồ nam Quartz mặt số đen BI5052-59E",
    price: "3.866.322 ₫",
    discount: "-43%",
    image: "/watches/watch-4.png",
  },
  {
    id: 5,
    name: "Neutra Chronograph Quartz Black Dial Men's Watch FS6093",
    price: "3.680.038 ₫",
    discount: "-38%",
    image: "/watches/watch-5.png",
  },
];

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

function WatchCard({ product }: { product: (typeof products)[0] }) {
  return (
    <Link
      href={`/products/${product.id}`}
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

export default function FormWatchProduct() {
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const cardWidth = el.scrollWidth / products.length;
      setActiveIndex(
        Math.min(Math.round(el.scrollLeft / cardWidth), products.length - 1),
      );
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`.scroll-hide::-webkit-scrollbar{display:none}.scroll-hide{-ms-overflow-style:none;scrollbar-width:none}`}</style>
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-10 gap-4">
          <div className="scroll-hide flex items-center gap-6 md:gap-10 overflow-x-auto flex-1">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`flex-shrink-0 text-xs font-semibold uppercase tracking-wide pb-2 border-b-2 transition-colors
                  ${activeTab === index ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <Link
            href="#"
            className="flex-shrink-0 text-xs font-semibold uppercase tracking-wide px-5 py-2 border border-black rounded-full hover:bg-black hover:text-white transition"
          >
            Xem tất cả
          </Link>
        </div>
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
            {products.map((p) => (
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
          <ScrollDots total={products.length} active={activeIndex} />
        </div>
        <div className="hidden md:grid grid-cols-5 gap-x-8 gap-y-12">
          {products.map((p) => (
            <WatchCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
