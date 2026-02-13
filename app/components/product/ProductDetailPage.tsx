"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ===================== FAKE DATA ===================== */

const product = {
  id: 1,
  name: "Hampton Black Dial Men's Gift Set AX7101",
  brand: "Armani Exchange",
  sku: "AX7101",
  price: "4.779.487 ₫",
  oldPrice: "7.130.000 ₫",
  discount: "-33%",
  rating: 4.7,
  reviewCount: 128,
  sold: "2.4k",
  inStock: true,
  images: [
    "/watches/watch-1.png",
    "/watches/watch-2.png",
    "/watches/watch-3.png",
    "/watches/watch-4.png",
  ],
  description:
    "Bộ quà tặng đồng hồ nam cao cấp từ Armani Exchange. Mặt số đen thanh lịch kết hợp dây da nâu và dây thép không gỉ. Chống nước 5ATM, kính sapphire chống xước, máy quartz Nhật Bản chính xác cao.",
  specs: [
    { label: "Thương hiệu", value: "Armani Exchange" },
    { label: "Xuất xứ", value: "Ý" },
    { label: "Kích thước mặt", value: "44mm" },
    { label: "Độ dày", value: "10mm" },
    { label: "Chất liệu vỏ", value: "Thép không gỉ" },
    { label: "Kính", value: "Sapphire" },
    { label: "Chống nước", value: "5ATM" },
    { label: "Máy", value: "Quartz Nhật Bản" },
    { label: "Bảo hành", value: "2 năm chính hãng" },
  ],
  variants: ["Đen / Da nâu", "Đen / Thép", "Bạc / Da đen"],
};

const reviews = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "",
    rating: 5,
    date: "12/01/2025",
    comment:
      "Đồng hồ đẹp lắm, đúng hàng chính hãng. Giao hàng nhanh, đóng gói cẩn thận. Sẽ ủng hộ shop dài dài.",
    images: [],
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatar: "",
    rating: 4,
    date: "05/01/2025",
    comment:
      "Mua làm quà cho chồng, anh ấy rất thích. Chất lượng tốt, kim giờ chạy chính xác. Trừ 1 sao vì hộp hơi móp.",
    images: [],
  },
  {
    id: 3,
    name: "Lê Quang C",
    avatar: "",
    rating: 5,
    date: "28/12/2024",
    comment:
      "Sản phẩm y như mô tả, nhìn thực tế còn đẹp hơn ảnh. Dây da mềm, không bị cứng. Rất hài lòng!",
    images: [],
  },
];

/* ===================== STAR ===================== */

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width={size}
          height={size}
          className={
            s <= Math.floor(rating)
              ? "text-amber-400"
              : s - 0.5 <= rating
                ? "text-amber-300"
                : "text-gray-200"
          }
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ===================== PAGE ===================== */

export default function ProductDetailPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeVariant, setActiveVariant] = useState(0);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">(
    "desc",
  );
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-gray-900 transition">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gray-900 transition">
            Sản phẩm
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium line-clamp-1">
            {product.name}
          </span>
        </nav>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* ── LEFT: Image Gallery ── */}
            <div className="p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100">
              {/* Main image */}
              <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4">
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-contain p-8 transition-opacity duration-300"
                />
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {product.discount}
                </span>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all
                      ${activeImage === i ? "border-black scale-105" : "border-gray-200 hover:border-gray-400"}`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Product Info ── */}
            <div className="p-6 lg:p-10 flex flex-col gap-5">
              {/* Brand + SKU */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
                  {product.brand}
                </span>
                <span className="text-xs text-gray-400">
                  SKU: {product.sku}
                </span>
              </div>

              {/* Name */}
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                {product.name}
              </h1>

              {/* Rating + Sold */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Stars rating={product.rating} />
                  <span className="text-sm font-semibold text-gray-700">
                    {product.rating}
                  </span>
                  <span className="text-sm text-gray-400">
                    ({product.reviewCount} đánh giá)
                  </span>
                </div>
                <div className="w-px h-4 bg-gray-200" />
                <span className="text-sm text-gray-500">
                  Đã bán <b className="text-gray-900">{product.sold}</b>
                </span>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 py-4 border-y border-gray-100">
                <span className="text-3xl font-black text-gray-900">
                  {product.price}
                </span>
                <span className="text-base text-gray-400 line-through mb-0.5">
                  {product.oldPrice}
                </span>
                <span className="mb-0.5 text-sm font-bold text-red-500">
                  {product.discount}
                </span>
              </div>

              {/* Variants */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Phiên bản:{" "}
                  <span className="text-gray-900">
                    {product.variants[activeVariant]}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveVariant(i)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all
                        ${
                          activeVariant === i
                            ? "border-black bg-black text-white"
                            : "border-gray-200 text-gray-600 hover:border-gray-400"
                        }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-700">
                  Số lượng:
                </span>
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-xl font-bold text-gray-600 hover:bg-gray-100 transition"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-xl font-bold text-gray-600 hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-400">Còn 47 sản phẩm</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl
                    font-bold text-sm border-2 transition-all duration-200
                    ${
                      added
                        ? "border-green-500 bg-green-50 text-green-600"
                        : "border-black text-black hover:bg-black hover:text-white"
                    }`}
                >
                  {added ? (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Đã thêm vào giỏ!
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Thêm vào giỏ hàng
                    </>
                  )}
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl
                  bg-black text-white font-bold text-sm hover:bg-gray-800 transition-colors"
                >
                  Mua ngay
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100">
                {[
                  { icon: "🛡️", text: "Hàng chính hãng 100%" },
                  { icon: "🔄", text: "Đổi trả 30 ngày" },
                  { icon: "🚚", text: "Giao nhanh 2H" },
                ].map((b) => (
                  <div
                    key={b.text}
                    className="flex flex-col items-center text-center gap-1 p-3 bg-gray-50 rounded-xl"
                  >
                    <span className="text-xl">{b.icon}</span>
                    <span className="text-[11px] font-medium text-gray-600 leading-tight">
                      {b.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs: Mô tả / Thông số / Đánh giá ── */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-gray-100">
            {[
              { key: "desc", label: "Mô tả sản phẩm" },
              { key: "specs", label: "Thông số kỹ thuật" },
              { key: "reviews", label: `Đánh giá (${product.reviewCount})` },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key as typeof activeTab)}
                className={`flex-1 py-4 text-sm font-semibold transition-all border-b-2
                  ${
                    activeTab === t.key
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-10">
            {/* Description */}
            {activeTab === "desc" && (
              <p className="text-sm text-gray-700 leading-relaxed max-w-2xl">
                {product.description}
              </p>
            )}

            {/* Specs */}
            {activeTab === "specs" && (
              <div className="max-w-lg">
                {product.specs.map((spec, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 py-3 ${i !== product.specs.length - 1 ? "border-b border-gray-100" : ""}`}
                  >
                    <span className="w-36 text-sm text-gray-500 shrink-0">
                      {spec.label}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews */}
            {activeTab === "reviews" && (
              <div>
                {/* Summary */}
                <div className="flex items-center gap-6 mb-8 p-6 bg-gray-50 rounded-2xl">
                  <div className="text-center">
                    <div className="text-5xl font-black text-gray-900">
                      {product.rating}
                    </div>
                    <Stars rating={product.rating} size={16} />
                    <div className="text-xs text-gray-500 mt-1">
                      {product.reviewCount} đánh giá
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct =
                        star === 5
                          ? 70
                          : star === 4
                            ? 20
                            : star === 3
                              ? 7
                              : star === 2
                                ? 2
                                : 1;
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 w-4">
                            {star}
                          </span>
                          <svg
                            className="w-3 h-3 text-amber-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 w-8 text-right">
                            {pct}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Review list */}
                <div className="space-y-6">
                  {reviews.map((r) => (
                    <div
                      key={r.id}
                      className="flex gap-4 pb-6 border-b border-gray-100 last:border-0"
                    >
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0 text-sm font-bold text-gray-600">
                        {r.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-900">
                            {r.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {r.date}
                          </span>
                        </div>
                        <Stars rating={r.rating} size={12} />
                        <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                          {r.comment}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load more */}
                <button className="mt-6 w-full py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-900 hover:text-gray-900 transition">
                  Xem thêm đánh giá
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile Sticky CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 px-4 py-3 flex gap-3">
        <button
          onClick={handleAddToCart}
          className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all
            ${added ? "border-green-500 text-green-600 bg-green-50" : "border-black text-black"}`}
        >
          {added ? "✓ Đã thêm!" : "Thêm vào giỏ"}
        </button>
        <button className="flex-1 py-3 rounded-xl bg-black text-white text-sm font-bold">
          Mua ngay
        </button>
      </div>
    </div>
  );
}
