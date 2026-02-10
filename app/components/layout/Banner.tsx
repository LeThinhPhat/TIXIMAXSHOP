"use client";
import { useEffect, useState } from "react";

type Slide = {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaSecondary: string;
  badge: string;
  badgeLabel: string;
  bg: string;
  accent: string;
};

const slides: Slide[] = [
  {
    id: 1,
    tag: "SALE ĐẶC BIỆT",
    title: "Siêu Sale\nCuối Tuần",
    subtitle: "Giảm đến 70% hàng nghìn sản phẩm chính hãng",
    cta: "Mua ngay",
    ctaSecondary: "Xem tất cả",
    badge: "70%",
    badgeLabel: "GIẢM",
    bg: "from-orange-50 via-orange-100 to-amber-100",
    accent: "orange",
  },
  {
    id: 2,
    tag: "MỚI RA MẮT",
    title: "Công Nghệ\nMới Nhất",
    subtitle: "Điện thoại, laptop & phụ kiện cao cấp",
    cta: "Khám phá",
    ctaSecondary: "Xem thêm",
    badge: "NEW",
    badgeLabel: "ARRIVAL",
    bg: "from-slate-50 via-gray-100 to-zinc-100",
    accent: "gray",
  },
  {
    id: 3,
    tag: "XU HƯỚNG",
    title: "Thời Trang\nHè 2025",
    subtitle: "Phong cách hiện đại – chất lượng vượt trội",
    cta: "Mua sắm ngay",
    ctaSecondary: "Bộ sưu tập",
    badge: "HOT",
    badgeLabel: "TREND",
    bg: "from-rose-50 via-pink-100 to-rose-100",
    accent: "rose",
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      4500,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex gap-4">
        {/* ================= Main Banner ================= */}
        <div
          className={`relative flex-1 min-h-[360px] rounded-3xl bg-gradient-to-br ${slide.bg} overflow-hidden transition-all`}
        >
          {/* shapes */}
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/40" />
          <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-white/30" />

          {/* content */}
          <div className="relative z-10 h-full p-10 flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/80 text-xs font-bold tracking-widest text-gray-700 uppercase">
                {slide.tag}
              </span>

              <h2 className="mt-4 text-[40px] font-black leading-tight text-gray-950">
                {slide.title.split("\n").map((l, i) => (
                  <span key={i} className="block">
                    {l}
                  </span>
                ))}
              </h2>

              <p className="mt-4 max-w-md text-[15px] text-gray-600 leading-relaxed">
                {slide.subtitle}
              </p>

              <div className="mt-7 flex items-center gap-4">
                <button className="h-11 px-7 rounded-full bg-gray-950 text-white text-sm font-bold hover:bg-gray-800 transition shadow-lg">
                  {slide.cta}
                </button>
                <button className="h-11 px-7 rounded-full bg-white text-gray-900 text-sm font-semibold border border-gray-200 hover:bg-gray-100 transition">
                  {slide.ctaSecondary}
                </button>
              </div>
            </div>

            {/* dots */}
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "w-10 bg-gray-950" : "w-2 bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* badge */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 w-28 h-28 rounded-2xl bg-gray-950 rotate-6 shadow-2xl flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-orange-400">
              {slide.badge}
            </span>
            <span className="mt-1 text-[11px] font-bold tracking-widest text-gray-400">
              {slide.badgeLabel}
            </span>
          </div>
        </div>

        {/* ================= Side Banners ================= */}
        <div className="hidden lg:flex w-64 flex-col gap-4">
          {/* Flash deal */}
          <div className="relative flex-1 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-indigo-200/60" />
            <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase">
              Flash Deal
            </span>
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-700">
                Kết thúc sau
              </p>
              <p className="mt-1 text-2xl font-black text-indigo-700">
                02:45:30
              </p>
              <button className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-700 hover:underline">
                Xem ngay →
              </button>
            </div>
          </div>

          {/* New arrivals */}
          <div className="relative flex-1 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100 p-6 overflow-hidden">
            <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-teal-200/60" />
            <span className="text-xs font-bold tracking-wider text-teal-600 uppercase">
              Mới về
            </span>
            <p className="mt-4 text-base font-bold text-gray-800 leading-snug">
              Hàng mới
              <br />
              mỗi ngày
            </p>
            <button className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:underline">
              Khám phá →
            </button>
          </div>
        </div>
      </div>

      {/* ================= Stats ================= */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: "🚚", label: "Miễn phí vận chuyển", sub: "Đơn từ 299k" },
          { icon: "🔄", label: "Đổi trả dễ dàng", sub: "Trong 30 ngày" },
          { icon: "🛡️", label: "Bảo hành chính hãng", sub: "12–24 tháng" },
          { icon: "💳", label: "Thanh toán an toàn", sub: "Nhiều hình thức" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 border border-gray-100 hover:shadow-md transition"
          >
            <span className="text-2xl">{item.icon}</span>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {item.label}
              </p>
              <p className="text-xs text-gray-500">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
