"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconTrash,
  IconMinus,
  IconPlus,
  IconShoppingCart,
  IconTag,
  IconTruck,
  IconShieldCheck,
  IconArrowLeft,
  IconChevronRight,
  IconCircleCheck,
  IconX,
} from "@tabler/icons-react";
import { useCartStore } from "@/app/store/useCartStore";

/* ── helpers ── */
function fmt(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

const COUPONS: Record<string, number> = {
  FADO10: 10,
  WELCOME5: 5,
  VIP20: 20,
};

const PERKS = [
  {
    icon: IconTruck,
    label: "Miễn phí vận chuyển",
    sub: "Đơn hàng từ 500.000đ",
  },
  {
    icon: IconShieldCheck,
    label: "Hàng chính hãng 100%",
    sub: "Cam kết authentic",
  },
  {
    icon: IconCircleCheck,
    label: "Đổi trả trong 7 ngày",
    sub: "Không cần lý do",
  },
];

/* ══════════════════════════════════
   PAGE
══════════════════════════════════ */
export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty = useCartStore((s) => s.updateQty);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const totalQty = useCartStore((s) => s.totalQty);

  useEffect(() => setMounted(true), []);

  const subtotal = mounted ? totalPrice() : 0;
  const qty = mounted ? totalQty() : 0;
  const discountPct = appliedCoupon ? COUPONS[appliedCoupon] : 0;
  const discountAmt = Math.round((subtotal * discountPct) / 100);
  const shipping = subtotal >= 500000 ? 0 : 35000;
  const total = subtotal - discountAmt + shipping;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponSuccess(`Áp dụng thành công! Giảm ${COUPONS[code]}%`);
      setCouponError("");
    } else {
      setCouponError("Mã giảm giá không hợp lệ hoặc đã hết hạn.");
      setCouponSuccess("");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCoupon("");
    setCouponSuccess("");
    setCouponError("");
  };

  if (!mounted) return null;

  /* ── Empty state ── */
  if (items.length === 0) {
    return (
      <main className="bg-[#f0f0f0] min-h-screen font-sans pt-6">
        <div className="max-w-[1280px] mx-auto px-5 py-20 flex flex-col items-center gap-6 text-center">
          <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center shadow-sm">
            <IconShoppingCart size={40} className="text-gray-200" />
          </div>
          <div>
            <h1
              style={{ fontSize: 22 }}
              className="font-black text-gray-900 mb-2"
            >
              Giỏ hàng trống
            </h1>
            <p style={{ fontSize: 14 }} className="text-gray-400">
              Bạn chưa có sản phẩm nào trong giỏ hàng.
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition active:scale-95"
            style={{ fontSize: 14 }}
          >
            <IconArrowLeft size={16} />
            Tiếp tục mua sắm
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f0f0f0] min-h-screen font-sans pt-6">
      <div className="max-w-[1280px] mx-auto px-5 pb-16">
        {/* ── Breadcrumb ── */}
        <nav
          className="flex items-center gap-1.5 mb-5"
          style={{ fontSize: 12 }}
        >
          <Link
            href="/"
            className="text-gray-400 hover:text-orange-500 transition"
          >
            Trang chủ
          </Link>
          <IconChevronRight size={12} className="text-gray-300" />
          <span className="text-gray-700 font-medium">Giỏ hàng</span>
        </nav>

        {/* ── Page title ── */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 style={{ fontSize: 22 }} className="font-black text-gray-900">
              Giỏ hàng
            </h1>
            <span
              className="bg-orange-100 text-orange-600 font-bold px-3 py-1 rounded-full"
              style={{ fontSize: 12 }}
            >
              {qty} sản phẩm
            </span>
          </div>
          <button
            onClick={clearCart}
            className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition"
            style={{ fontSize: 13 }}
          >
            <IconTrash size={14} />
            Xóa tất cả
          </button>
        </div>

        {/* ── Main grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: "20px",
            alignItems: "start",
          }}
          className="max-[900px]:!grid-cols-1"
        >
          {/* ════ LEFT: Items list ════ */}
          <div className="flex flex-col gap-3">
            {/* Column headers — desktop */}
            <div
              className="hidden md:grid bg-white rounded-2xl px-6 py-3"
              style={{
                gridTemplateColumns: "1fr 120px 120px 80px",
                fontSize: 12,
              }}
            >
              <span className="text-gray-400 font-semibold uppercase tracking-wider">
                Sản phẩm
              </span>
              <span className="text-gray-400 font-semibold uppercase tracking-wider text-center">
                Đơn giá
              </span>
              <span className="text-gray-400 font-semibold uppercase tracking-wider text-center">
                Số lượng
              </span>
              <span className="text-gray-400 font-semibold uppercase tracking-wider text-right">
                Tổng
              </span>
            </div>

            {/* Items */}
            {items.map((item) => {
              const lineTotal = item.priceNumber * item.qty;
              return (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="bg-white rounded-2xl p-5"
                >
                  {/* Mobile layout */}
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0 relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p
                            style={{ fontSize: 14 }}
                            className="font-semibold text-gray-900 line-clamp-2 leading-snug"
                          >
                            {item.name}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-1.5">
                            {item.size && (
                              <span
                                style={{ fontSize: 12 }}
                                className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md font-medium"
                              >
                                Size: {item.size}
                              </span>
                            )}
                            {item.color && (
                              <span
                                style={{ fontSize: 12 }}
                                className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md font-medium"
                              >
                                {item.color}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            removeItem(item.id, item.size, item.color)
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 transition text-gray-300 hover:text-red-400 shrink-0"
                        >
                          <IconTrash size={14} />
                        </button>
                      </div>

                      {/* Price row — always visible */}
                      <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                        <span
                          style={{ fontSize: 14 }}
                          className="text-gray-500"
                        >
                          {item.price}
                        </span>

                        {/* Qty stepper */}
                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() =>
                              updateQty(
                                item.id,
                                item.size,
                                item.color,
                                item.qty - 1,
                              )
                            }
                            className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                          >
                            <IconMinus size={13} />
                          </button>
                          <span
                            style={{ fontSize: 14 }}
                            className="w-9 text-center font-bold text-gray-800"
                          >
                            {item.qty}
                          </span>
                          <button
                            onClick={() =>
                              updateQty(
                                item.id,
                                item.size,
                                item.color,
                                item.qty + 1,
                              )
                            }
                            className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                          >
                            <IconPlus size={13} />
                          </button>
                        </div>

                        <span
                          style={{ fontSize: 14 }}
                          className="font-black text-gray-900"
                        >
                          {fmt(lineTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Continue shopping */}
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition self-start mt-1"
              style={{ fontSize: 14 }}
            >
              <IconArrowLeft size={15} />
              Tiếp tục mua sắm
            </Link>

            {/* Perks */}
            <div className="bg-white rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
              {PERKS.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-orange-500" />
                  </div>
                  <div>
                    <p
                      style={{ fontSize: 13 }}
                      className="font-semibold text-gray-800"
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

          {/* ════ RIGHT: Order summary ════ */}
          <div className="flex flex-col gap-4 sticky top-24">
            {/* Coupon */}
            <div className="bg-white rounded-2xl p-5">
              <p
                style={{ fontSize: 14 }}
                className="font-bold text-gray-800 mb-3 flex items-center gap-2"
              >
                <IconTag size={16} className="text-orange-500" />
                Mã giảm giá
              </p>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <div>
                    <p
                      style={{ fontSize: 13 }}
                      className="font-bold text-green-700"
                    >
                      {appliedCoupon}
                    </p>
                    <p style={{ fontSize: 12 }} className="text-green-600">
                      {couponSuccess}
                    </p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-green-100 transition text-green-500"
                  >
                    <IconX size={13} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value);
                      setCouponError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                    placeholder="Nhập mã giảm giá..."
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-gray-400 transition"
                    style={{ fontSize: 14 }}
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-gray-900 hover:bg-gray-700 text-white font-bold px-4 rounded-xl transition active:scale-95"
                    style={{ fontSize: 14 }}
                  >
                    Áp dụng
                  </button>
                </div>
              )}

              {couponError && (
                <p style={{ fontSize: 12 }} className="text-red-500 mt-2">
                  {couponError}
                </p>
              )}

              {/* Hint */}
              {!appliedCoupon && (
                <p style={{ fontSize: 12 }} className="text-gray-400 mt-2">
                  Thử:{" "}
                  <button
                    onClick={() => {
                      setCoupon("FADO10");
                      setCouponError("");
                    }}
                    className="text-orange-500 font-semibold hover:underline"
                  >
                    FADO10
                  </button>
                  {", "}
                  <button
                    onClick={() => {
                      setCoupon("VIP20");
                      setCouponError("");
                    }}
                    className="text-orange-500 font-semibold hover:underline"
                  >
                    VIP20
                  </button>
                </p>
              )}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl p-5">
              <p
                style={{ fontSize: 16 }}
                className="font-bold text-gray-900 mb-4"
              >
                Tóm tắt đơn hàng
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: 14 }} className="text-gray-500">
                    Tạm tính ({qty} sản phẩm)
                  </span>
                  <span
                    style={{ fontSize: 14 }}
                    className="font-semibold text-gray-800"
                  >
                    {fmt(subtotal)}
                  </span>
                </div>

                {discountAmt > 0 && (
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: 14 }} className="text-gray-500">
                      Giảm giá ({discountPct}%)
                    </span>
                    <span
                      style={{ fontSize: 14 }}
                      className="font-semibold text-green-600"
                    >
                      -{fmt(discountAmt)}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span style={{ fontSize: 14 }} className="text-gray-500">
                    Phí vận chuyển
                  </span>
                  {shipping === 0 ? (
                    <span
                      style={{ fontSize: 14 }}
                      className="font-semibold text-green-600"
                    >
                      Miễn phí
                    </span>
                  ) : (
                    <span
                      style={{ fontSize: 14 }}
                      className="font-semibold text-gray-800"
                    >
                      {fmt(shipping)}
                    </span>
                  )}
                </div>

                {shipping > 0 && (
                  <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                    <p style={{ fontSize: 12 }} className="text-blue-600">
                      Mua thêm <strong>{fmt(500000 - subtotal)}</strong> để được
                      miễn phí vận chuyển
                    </p>
                  </div>
                )}
              </div>

              <div className="h-px bg-gray-100 my-4" />

              <div className="flex items-center justify-between mb-5">
                <span
                  style={{ fontSize: 16 }}
                  className="font-bold text-gray-900"
                >
                  Tổng cộng
                </span>
                <span
                  style={{ fontSize: 20 }}
                  className="font-black text-gray-900"
                >
                  {fmt(total)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600
                           text-white font-bold py-3.5 rounded-xl transition active:scale-95"
                style={{ fontSize: 14 }}
              >
                Tiến hành thanh toán
                <IconChevronRight size={16} />
              </Link>

              <p
                style={{ fontSize: 12 }}
                className="text-gray-400 text-center mt-3"
              >
                🔒 Thanh toán bảo mật SSL 256-bit
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
