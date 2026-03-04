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
  IconCheck,
  IconStar,
  IconCreditCard,
  IconRefresh,
} from "@tabler/icons-react";
import { useCartStore } from "@/app/store/useCartStore";

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
    const priceNumber = parseInt(item.price.replace(/\D/g, "")) || 0;
    addItem({
      id: item.name,
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
          gridTemplateColumns: isMobile ? "1fr" : "480px 1fr",
          gap: "16px",
          alignItems: "stretch",
          marginBottom: "16px",
        }}
      >
        {/* ── LEFT: Gallery ── */}
        <div
          className="bg-white flex flex-col gap-3"
          style={{
            position: isMobile ? "relative" : "sticky",
            top: 20,
            alignSelf: "stretch",
            borderRadius: isMobile ? 0 : 16,
            padding: isMobile ? "12px 16px 12px" : 20,
          }}
        >
          <div
            className="relative overflow-hidden bg-gray-50"
            style={{
              borderRadius: isMobile ? 12 : 12,
              minHeight: isMobile ? 280 : 0,
              flex: isMobile ? "none" : 1,
            }}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain p-6"
            />
            {/* xs: 11px — badge */}
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
                className={`absolute top-3 right-12 ${
                  item.badgeColor ?? "bg-orange-500"
                } text-white font-bold px-2.5 py-1 rounded-full`}
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
          <div
            className="flex flex-col"
            style={{
              backgroundColor: "#fff",
              borderRadius: isMobile ? 0 : 16,
              padding: isMobile ? "14px 16px 16px" : 20,
              gap: isMobile ? 10 : 16,
            }}
          >
            {/* Danh mục — chỉ mobile hiển thị kiểu label nhỏ */}
            {isMobile ? (
              <p style={{ fontSize: 12, color: "#6E6E73" }}>
                Danh mục:{" "}
                <span style={{ fontWeight: 600, color: "#3C3C43" }}>
                  {item.category ?? "EmcomerFado"}
                </span>
              </p>
            ) : (
              <p style={{ fontSize: 24 }} className="text-gray-500">
                Sản phẩm:{" "}
                <span className="font-semibold text-gray-800">
                  {item.category ?? "EmcomerFado"}
                </span>
              </p>
            )}

            {/* lg: 22px desktop / 18px mobile — h1 */}
            <h1
              className="font-extrabold text-gray-900 leading-snug"
              style={{ fontSize: isMobile ? 18 : 22 }}
            >
              {item.name}
            </h1>

            {/* Badge + sold — cùng 1 dòng */}
            <div className="flex flex-wrap items-center gap-2">
              {item.country && (
                <span
                  style={{
                    fontSize: 11,
                    backgroundColor: "#1C1C1E",
                    color: "#fff",
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: 20,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "#4ADE80",
                      display: "inline-block",
                    }}
                  />
                  Bán tại: {item.country}
                </span>
              )}
              {item.sold && (
                <p
                  style={{ fontSize: isMobile ? 12 : 24 }}
                  className="text-gray-400"
                >
                  Đã bán{" "}
                  <span className="font-semibold text-gray-700">
                    {item.sold}
                  </span>
                </p>
              )}
            </div>

            {/* Price block — giá + badge % + giá gốc cùng khu vực gọn */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  className="font-black leading-none text-orange-500"
                  style={{ fontSize: isMobile ? 26 : 34 }}
                >
                  {item.price}
                </span>
                {discountPercent && (
                  <span
                    className="font-bold text-white bg-red-500 rounded-md"
                    style={{ fontSize: 13, padding: "2px 8px" }}
                  >
                    {discountPercent}
                  </span>
                )}
                {item.oldPrice && (
                  <span
                    style={{ fontSize: 13 }}
                    className="text-gray-400 line-through"
                  >
                    {item.oldPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Perks card */}
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid #FED7AA",
                marginTop: isMobile ? 2 : 0,
              }}
            >
              <div
                style={{
                  backgroundColor: "#F97316",
                  padding: isMobile ? "10px 14px" : "6px 12px",
                }}
              >
                <span
                  style={{
                    fontSize: isMobile ? 13 : 12,
                    color: "#fff",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  Quyền lợi của bạn
                </span>
              </div>
              <div
                style={{
                  backgroundColor: "#FFF7ED",
                  padding: isMobile ? "10px 14px" : "12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: isMobile ? 10 : 10,
                }}
              >
                {[
                  {
                    icon: (
                      <IconStar
                        size={14}
                        className="text-yellow-500 shrink-0 mt-0.5"
                      />
                    ),
                    content: (
                      <>
                        Nhận ưu đãi lên đến{" "}
                        <span className="font-semibold text-gray-900">6%</span>{" "}
                        khi tham gia{" "}
                        <span className="font-semibold text-orange-500">
                          Fado VIPClub
                        </span>
                      </>
                    ),
                  },
                  {
                    icon: (
                      <IconCreditCard
                        size={14}
                        className="text-blue-500 shrink-0 mt-0.5"
                      />
                    ),
                    content: (
                      <>
                        Giảm{" "}
                        <span className="font-semibold text-gray-900">1%</span>{" "}
                        trên đơn hàng{" "}
                        <span className="text-gray-500">(tối đa 200,000đ)</span>{" "}
                        khi thanh toán bằng{" "}
                        <span className="font-semibold text-blue-600">
                          FadoPay
                        </span>
                      </>
                    ),
                  },
                  {
                    icon: (
                      <IconRefresh
                        size={14}
                        className="text-green-500 shrink-0 mt-0.5"
                      />
                    ),
                    content: (
                      <>
                        Đổi trả sản phẩm{" "}
                        <span className="font-semibold text-gray-900">
                          24 giờ
                        </span>{" "}
                        <button
                          style={{ fontSize: 13 }}
                          className="text-orange-500 underline underline-offset-2 hover:text-orange-600 transition"
                        >
                          Chi tiết
                        </button>
                      </>
                    ),
                  },
                  {
                    icon: (
                      <IconCheck
                        size={14}
                        className="text-green-500 shrink-0 mt-0.5"
                      />
                    ),
                    content: (
                      <>
                        Giá về Việt Nam{" "}
                        <span className="font-semibold text-gray-900">
                          đã bao gồm
                        </span>{" "}
                        các loại thuế phí,{" "}
                        <span className="font-semibold text-green-600">
                          không phát sinh phụ phí
                        </span>
                      </>
                    ),
                  },
                ].map((perk, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    {perk.icon}
                    <span
                      style={{ fontSize: isMobile ? 13 : 14 }}
                      className="text-gray-600 leading-snug"
                    >
                      {perk.content}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            {/* base: 14px — radio options */}
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

            {/* base: 14px — size label & options */}
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

            {/* base: 14px — color label & options */}
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

            {/* ── Qty + 2 buttons — inline, dùng chung cả desktop & mobile ── */}
            <div className="flex items-center gap-3">
              <span style={{ fontSize: 14 }} className="text-gray-500">
                Số lượng:
              </span>
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
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                style={{ fontSize: 14 }}
                className={`flex-1 flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl transition-all active:scale-95 ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-gray-900 hover:bg-gray-700 text-white"
                }`}
              >
                {added ? (
                  <IconCheck size={16} />
                ) : (
                  <IconShoppingCart size={16} />
                )}
                {added ? "Đã thêm!" : "Thêm vào giỏ"}
              </button>
              <button
                style={{ fontSize: 14 }}
                className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all active:scale-95"
              >
                <IconBolt size={16} />
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
