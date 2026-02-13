"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const brands = [
  {
    name: "Apple",
    slug: "apple",
    image: "/brands/apple.png",
    products: "240 products",
    gradient: "from-gray-50 to-gray-100",
    border: "hover:border-gray-300",
  },
  {
    name: "Samsung",
    slug: "samsung",
    image: "/brands/samsung.png",
    products: "380 products",
    gradient: "from-orange-50 to-orange-100",
    border: "hover:border-orange-300",
  },
  {
    name: "Nike",
    slug: "nike",
    image: "/brands/nike.png",
    products: "520 products",
    gradient: "from-gray-50 to-gray-100",
    border: "hover:border-gray-300",
  },
  {
    name: "Adidas",
    slug: "adidas",
    image: "/brands/adidas.png",
    products: "410 products",
    gradient: "from-orange-50 to-orange-100",
    border: "hover:border-orange-300",
  },
  {
    name: "Sony",
    slug: "sony",
    image: "/brands/sony.png",
    products: "190 products",
    gradient: "from-gray-50 to-gray-100",
    border: "hover:border-gray-300",
  },
  {
    name: "Uniqlo",
    slug: "uniqlo",
    image: "/brands/uniqlo.png",
    products: "680 products",
    gradient: "from-orange-50 to-orange-100",
    border: "hover:border-orange-300",
  },
  {
    name: "LG",
    slug: "lg",
    image: "/brands/lg.png",
    products: "160 products",
    gradient: "from-gray-50 to-gray-100",
    border: "hover:border-gray-300",
  },
  {
    name: "Dell",
    slug: "dell",
    image: "/brands/dell.png",
    products: "220 products",
    gradient: "from-orange-50 to-orange-100",
    border: "hover:border-orange-300",
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
            background: i === active ? "#f97316" : "#e5e7eb",
          }}
        />
      ))}
    </div>
  );
}

/* ===================== BRAND CARD ===================== */

function BrandCard({ brand }: { brand: (typeof brands)[0] }) {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className={`
        group
        bg-gradient-to-br ${brand.gradient}
        rounded-2xl p-4
        border border-transparent
        ${brand.border}
        transition-all duration-200
        hover:shadow-md hover:-translate-y-1
        flex flex-col items-center text-center
        focus:outline-none
      `}
    >
      <div className="relative w-16 h-16 rounded-xl bg-white shadow-sm overflow-hidden group-hover:scale-105 transition-transform">
        <Image
          src={brand.image}
          alt={brand.name}
          fill
          className="object-contain p-3"
        />
      </div>
      <span className="mt-3 text-sm font-medium text-gray-900 leading-snug">
        {brand.name}
      </span>
      <span className="mt-0.5 text-xs text-gray-500 tracking-wide">
        {brand.products}
      </span>
    </Link>
  );
}

/* ===================== MAIN ===================== */

export default function BrandProduct() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const cardWidth = el.scrollWidth / brands.length;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, brands.length - 1));
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-orange-500 rounded-full" />
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Featured Brands
            </h2>
          </div>
          <Link
            href="/brands"
            className="text-sm font-medium text-orange-500 hover:underline"
          >
            View all →
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
            {brands.map((brand) => (
              <div
                key={brand.slug}
                className="flex-shrink-0"
                style={{
                  width: "28vw",
                  maxWidth: 120,
                  scrollSnapAlign: "start",
                }}
              >
                <BrandCard brand={brand} />
              </div>
            ))}
          </div>

          <ScrollDots total={brands.length} active={activeIndex} />
        </div>

        {/* ===== DESKTOP: Grid ===== */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-8 gap-5">
          {brands.map((brand) => (
            <BrandCard key={brand.slug} brand={brand} />
          ))}
        </div>
      </section>
    </>
  );
}
