"use client";

/**
 * TYPOGRAPHY SCALE (chuẩn quốc tế e-commerce)
 * ─────────────────────────────────────────────
 * xs   : 11px — badge, tag nhỏ
 * sm   : 12px — caption, meta, label phụ
 * base : 14px — body, button, option, delivery
 * md   : 16px — section label, perk label
 * lg   : 22px — h1 desktop / 18px mobile
 * xl   : 28px — price desktop / 22px mobile
 */

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  IconMinus,
  IconPlus,
  IconHeart,
  IconBolt,
  IconShoppingCart,
  IconAlertTriangle,
  IconTruck,
  IconRefresh,
  IconShieldCheck,
  IconLock,
  IconCheck,
} from "@tabler/icons-react";
import { useCartStore } from "@/app/store/useCartStore";

const PERKS = [
  { icon: IconTruck, label: "Miễn phí vận chuyển", sub: "Đơn từ 500.000đ" },
  { icon: IconRefresh, label: "Đổi trả dễ dàng", sub: "Trong vòng 7 ngày" },
  { icon: IconShieldCheck, label: "Hàng chính hãng", sub: "100% authentic" },
  { icon: IconLock, label: "Thanh toán an toàn", sub: "Bảo mật SSL" },
];

type Props = {
  item: {
    name: string;
    image: string;
    price: string;
    oldPrice?: string;
    discount?: string;
    badge?: string;
    badgeColor?: string;
    category?: string;
    country?: string;
    sold?: string;
  };
  discountPercent: string | null;
};

export default function ProductActions({ item, discountPercent }: Props) {
  const [qty, setQty] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const [importType, setImportType] = useState(0);
  const [size, setSize] = useState("US 8");
  const [color, setColor] = useState("Trắng / Đen");
  const [isMobile, setIsMobile] = useState(false);
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    // parse số từ chuỗi giá VD: "3.290.000đ" → 3290000
    const priceNumber = parseInt(item.price.replace(/\D/g, "")) || 0;
    addItem({
      id: item.name, // dùng name làm id tạm, thay bằng slug nếu có
      name: item.name,
      image: item.image,
      price: item.price,
      priceNumber,
      size,
      color,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "60% 40%",
          gap: "16px",
          alignItems: "start",
          marginBottom: "16px",
        }}
      >
        {/* ── LEFT: Gallery ── */}
        <div
          className="bg-white rounded-2xl p-5 flex flex-col gap-3"
          style={{ position: isMobile ? "relative" : "sticky", top: 20 }}
        >
          <div
            className="relative rounded-xl overflow-hidden bg-gray-50"
            style={{ aspectRatio: "1" }}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain p-8"
            />
            {discountPercent && (
              <span
                style={{ fontSize: 11 }}
                className="absolute top-3 left-3 bg-red-500 text-white font-bold px-2.5 py-1 rounded-full"
              >
                {discountPercent}
              </span>
            )}
            {item.badge && (
              <span
                style={{ fontSize: 11 }}
                className={`absolute top-3 right-12 ${item.badgeColor ?? "bg-orange-500"} text-white font-bold px-2.5 py-1 rounded-full`}
              >
                {item.badge}
              </span>
            )}
            <button
              aria-label="Yêu thích"
              className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-gray-400 hover:text-red-400 transition"
            >
              <IconHeart size={16} />
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <button
                key={i}
                onClick={() => setActiveThumb(i)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-50 border-2 transition ${
                  activeThumb === i
                    ? "border-orange-500"
                    : "border-gray-100 hover:border-gray-300"
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-contain p-1.5"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Info + Actions ── */}
        <div className="flex flex-col gap-3">
          <div className="bg-white rounded-2xl p-5 flex flex-col gap-4">
            {/* sm — meta */}
            <p style={{ fontSize: 12 }} className="text-gray-500">
              Thương hiệu:{" "}
              <span className="font-semibold text-gray-800">
                {item.category ?? "EmcomerFado"}
              </span>
              {" · "}
              Tình trạng:{" "}
              <span className="font-semibold text-green-600">Mới</span>
            </p>

            {/* lg — title */}
            <h1
              className="font-extrabold text-gray-900 leading-snug"
              style={{ fontSize: isMobile ? 18 : 22 }}
            >
              {item.name}
            </h1>

            {/* xs — badge / sm — sold */}
            <div className="flex flex-wrap items-center gap-2">
              {item.country && (
                <span
                  style={{ fontSize: 11 }}
                  className="bg-gray-900 text-white font-semibold px-3 py-1.5 rounded-full"
                >
                  Bán tại: {item.country}
                </span>
              )}
              {item.sold && (
                <p style={{ fontSize: 12 }} className="text-gray-400">
                  Đã bán{" "}
                  <span className="font-semibold text-gray-700">
                    {item.sold}
                  </span>
                </p>
              )}
            </div>

            {/* xl — price */}
            <div className="flex items-end gap-3">
              <span
                className="font-black text-gray-900 leading-none"
                style={{ fontSize: isMobile ? 22 : 28 }}
              >
                {item.price}
              </span>
              {item.oldPrice && (
                <span
                  style={{ fontSize: 14 }}
                  className="text-gray-400 line-through mb-0.5"
                >
                  {item.oldPrice}
                </span>
              )}
              {discountPercent && (
                <span
                  style={{ fontSize: 14 }}
                  className="font-bold text-green-600 mb-0.5"
                >
                  {discountPercent}
                </span>
              )}
            </div>

            {/* base — warning */}
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              <IconAlertTriangle
                size={15}
                className="text-amber-500 shrink-0"
              />
              <span style={{ fontSize: 14 }} className="text-amber-700">
                Sản phẩm có thể phát sinh phụ phí vận chuyển
              </span>
            </div>

            <div className="h-px bg-gray-100" />

            {/* base — import type */}
            <div className="flex gap-4 flex-wrap">
              {["Nhập khẩu tiêu dùng", "Nhập khẩu thương mại"].map((opt, i) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <button
                    onClick={() => setImportType(i)}
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                      importType === i ? "border-gray-900" : "border-gray-300"
                    }`}
                  >
                    {importType === i && (
                      <div className="w-2 h-2 rounded-full bg-gray-900" />
                    )}
                  </button>
                  <span
                    style={{ fontSize: 14 }}
                    className="text-gray-700 font-medium"
                  >
                    {opt}
                  </span>
                </label>
              ))}
            </div>

            {/* base — size label + buttons */}
            <div className="flex flex-col gap-2">
              <span
                style={{ fontSize: 14 }}
                className="font-semibold text-gray-700"
              >
                Size
              </span>
              <div className="flex flex-wrap gap-2">
                {["US 7", "US 8", "US 9", "US 10", "US 11"].map((o) => (
                  <button
                    key={o}
                    onClick={() => setSize(o)}
                    style={{ fontSize: 14 }}
                    className={`px-3 py-2 rounded-lg font-semibold border transition-all ${
                      size === o
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {/* base — color label + buttons */}
            <div className="flex flex-col gap-2">
              <span
                style={{ fontSize: 14 }}
                className="font-semibold text-gray-700"
              >
                Màu sắc
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Trắng / Đen", color: "#f5f5f5", border: "#ccc" },
                  { label: "Xanh Navy", color: "#1e3a5f", border: "#1e3a5f" },
                  { label: "Đen / Xám", color: "#333", border: "#333" },
                  { label: "Đỏ", color: "#dc2626", border: "#dc2626" },
                ].map((o) => (
                  <button
                    key={o.label}
                    onClick={() => setColor(o.label)}
                    style={{ fontSize: 14 }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold border transition-all ${
                      color === o.label
                        ? "border-gray-900 bg-gray-50 text-gray-900"
                        : "border-gray-200 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full inline-block shrink-0"
                      style={{
                        background: o.color,
                        border: `1.5px solid ${o.border}`,
                      }}
                    />
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            {/* base — qty + buttons (desktop only) */}
            {!isMobile && (
              <>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      aria-label="Giảm"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-10 h-11 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                    >
                      <IconMinus size={15} />
                    </button>
                    <span
                      style={{ fontSize: 14 }}
                      className="w-10 text-center font-bold text-gray-800"
                    >
                      {qty}
                    </span>
                    <button
                      aria-label="Tăng"
                      onClick={() => setQty((q) => q + 1)}
                      className="w-10 h-11 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                    >
                      <IconPlus size={15} />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    style={{ fontSize: 14 }}
                    className={`flex-1 flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-all ${
                      added
                        ? "bg-green-500 text-white"
                        : "bg-gray-900 hover:bg-gray-700 active:scale-95 text-white"
                    }`}
                  >
                    {added ? (
                      <IconCheck size={16} />
                    ) : (
                      <IconShoppingCart size={16} />
                    )}
                    {added ? "Đã thêm!" : "Thêm vào giỏ"}
                  </button>
                </div>
                <button
                  style={{ fontSize: 14 }}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold py-3 rounded-xl transition-all"
                >
                  <IconBolt size={16} />
                  Mua ngay
                </button>
              </>
            )}

            {/* base — qty mobile */}
            {isMobile && (
              <div className="flex items-center gap-3">
                <span style={{ fontSize: 14 }} className="text-gray-500">
                  Số lượng:
                </span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    aria-label="Giảm"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                  >
                    <IconMinus size={15} />
                  </button>
                  <span
                    style={{ fontSize: 14 }}
                    className="w-10 text-center font-bold text-gray-800"
                  >
                    {qty}
                  </span>
                  <button
                    aria-label="Tăng"
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                  >
                    <IconPlus size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* base — delivery */}
            <div className="flex items-center gap-2">
              <IconTruck size={15} className="text-gray-400 shrink-0" />
              <p style={{ fontSize: 14 }} className="text-gray-500">
                Dự kiến giao hàng:{" "}
                <span className="font-semibold text-gray-700">
                  16-03-2026 — 22-03-2026
                </span>
              </p>
            </div>
          </div>

          {/* md — perks */}
          <div className="bg-white rounded-2xl p-4 grid grid-cols-2 gap-3">
            {PERKS.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3 py-2.5"
              >
                <Icon size={18} className="text-orange-500 shrink-0" />
                <div>
                  <p
                    style={{ fontSize: 14 }}
                    className="font-semibold text-gray-700"
                  >
                    {label}
                  </p>
                  <p style={{ fontSize: 12 }} className="text-gray-400">
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile fixed bottom bar */}
      {isMobile && (
        <div
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex gap-3 z-50"
          style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}
        >
          <button
            onClick={handleAddToCart}
            style={{ fontSize: 14 }}
            className={`flex-1 flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl active:scale-95 transition-all ${
              added ? "bg-green-500 text-white" : "bg-gray-900 text-white"
            }`}
          >
            {added ? <IconCheck size={16} /> : <IconShoppingCart size={16} />}
            {added ? "Đã thêm!" : "Thêm vào giỏ"}
          </button>
          <button
            style={{ fontSize: 14 }}
            className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white font-bold py-3.5 rounded-xl active:scale-95 transition-all"
          >
            <IconBolt size={16} />
            Mua ngay
          </button>
        </div>
      )}

      {isMobile && <div style={{ height: 80 }} />}
    </>
  );
}
