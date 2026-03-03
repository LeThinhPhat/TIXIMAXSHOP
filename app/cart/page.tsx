"use client";

import { useEffect, useMemo, useState } from "react";
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

/* ─────────────────────────────────────────────
   Design tokens (international e-commerce vibe)
───────────────────────────────────────────── */
const TOKENS = {
  pageBg: "#F5F5F7",
  cardBg: "#FFFFFF",
  subtleBg: "#FAFAFA",
  border: "#E8E8ED",
  divider: "#F2F2F7",
  text: {
    primary: "#1D1D1F",
    secondary: "#3C3C43",
    tertiary: "#6E6E73",
    quaternary: "#AEAEB2",
  },
  accent: {
    orange: "#F97316",
    orangeSoft: "#FFF7ED",
    orangeBorder: "#FED7AA",
    green: "#22C55E",
    greenSoft: "#ECFDF5",
    blueSoft: "#EFF6FF",
    blueBorder: "#DBEAFE",
    redSoft: "#FEF2F2",
  },
};

const TYPE = {
  h1: { fontSize: 24, fontWeight: 800 as const, color: TOKENS.text.primary },
  h2: { fontSize: 16, fontWeight: 700 as const, color: TOKENS.text.primary },
  subhead: {
    fontSize: 14,
    fontWeight: 700 as const,
    color: TOKENS.text.primary,
  },
  body: {
    fontSize: 14,
    fontWeight: 400 as const,
    color: TOKENS.text.secondary,
  },
  caption: {
    fontSize: 12,
    fontWeight: 400 as const,
    color: TOKENS.text.tertiary,
  },
  micro: {
    fontSize: 11,
    fontWeight: 600 as const,
    color: TOKENS.text.quaternary,
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
  },
};

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

  const freeShipGap = Math.max(0, 500000 - subtotal);

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

  const summaryRows = useMemo(() => {
    const rows: Array<{
      label: string;
      value: string;
      tone?: "muted" | "good";
    }> = [];
    rows.push({
      label: `Tạm tính (${qty} sản phẩm)`,
      value: fmt(subtotal),
      tone: "muted",
    });
    if (discountAmt > 0)
      rows.push({
        label: `Giảm giá (${discountPct}%)`,
        value: `-${fmt(discountAmt)}`,
        tone: "good",
      });
    rows.push({
      label: "Phí vận chuyển",
      value: shipping === 0 ? "Miễn phí" : fmt(shipping),
      tone: shipping === 0 ? "good" : "muted",
    });
    return rows;
  }, [qty, subtotal, discountAmt, discountPct, shipping]);

  if (!mounted) return null;

  /* ── Empty state ── */
  if (items.length === 0) {
    return (
      <main
        className="min-h-screen font-sans"
        style={{ backgroundColor: TOKENS.pageBg }}
      >
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 pt-10 pb-24 flex flex-col items-center text-center">
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-sm"
            style={{
              backgroundColor: TOKENS.cardBg,
              border: `1px solid ${TOKENS.border}`,
            }}
          >
            <IconShoppingCart
              size={40}
              style={{ color: TOKENS.text.quaternary }}
            />
          </div>

          <h1 className="mt-6" style={TYPE.h1}>
            Giỏ hàng trống
          </h1>
          <p
            className="mt-2"
            style={{ ...TYPE.body, color: TOKENS.text.tertiary }}
          >
            Bạn chưa có sản phẩm nào trong giỏ hàng.
          </p>

          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 transition active:scale-95"
            style={{
              backgroundColor: TOKENS.accent.orange,
              color: "#fff",
              fontSize: 14,
              fontWeight: 800,
            }}
          >
            <IconArrowLeft size={16} />
            Tiếp tục mua sắm
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen font-sans"
      style={{ backgroundColor: TOKENS.pageBg }}
    >
      {/* Container: international spacing (wide gutters) */}
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 pt-8 pb-20">
        {/* ── Breadcrumb ── */}
        <nav
          className="flex items-center gap-1.5"
          aria-label="Breadcrumb"
          style={TYPE.caption}
        >
          <Link
            href="/"
            className="transition-colors hover:opacity-100"
            style={{ color: TOKENS.text.tertiary }}
          >
            Trang chủ
          </Link>
          <IconChevronRight
            size={12}
            style={{ color: TOKENS.text.quaternary }}
          />
          <span style={{ color: TOKENS.text.secondary, fontWeight: 600 }}>
            Giỏ hàng
          </span>
        </nav>

        {/* ── Page header ── */}
        <div className="mt-6 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 style={TYPE.h1}>Giỏ hàng</h1>
            <div className="mt-2 inline-flex items-center gap-2">
              <span
                className="rounded-full px-3 py-1"
                style={{
                  backgroundColor: TOKENS.accent.orangeSoft,
                  border: `1px solid ${TOKENS.accent.orangeBorder}`,
                  color: TOKENS.accent.orange,
                  fontSize: 12,
                  fontWeight: 800,
                }}
              >
                {qty} sản phẩm
              </span>
              <span style={{ ...TYPE.caption, color: TOKENS.text.tertiary }}>
                Kiểm tra số lượng và mã giảm giá trước khi thanh toán.
              </span>
            </div>
          </div>

          <button
            onClick={clearCart}
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 transition-colors"
            style={{ fontSize: 13, color: TOKENS.text.tertiary }}
            onMouseEnter={(e) =>
              ((e.currentTarget.style.color as any) = "#EF4444")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget.style.color as any) = TOKENS.text.tertiary)
            }
          >
            <IconTrash size={14} />
            Xóa tất cả
          </button>
        </div>

        {/* ── Main grid ── */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* ════ LEFT: Items list ════ */}
          <section
            className="flex flex-col gap-4"
            aria-label="Danh sách sản phẩm"
          >
            {/* Column headers — desktop */}
            <div
              className="hidden md:grid rounded-2xl px-6 py-3"
              style={{
                backgroundColor: TOKENS.cardBg,
                border: `1px solid ${TOKENS.border}`,
                gridTemplateColumns: "1fr 140px 140px 120px",
                ...TYPE.caption,
              }}
            >
              <span style={{ ...TYPE.micro, color: TOKENS.text.quaternary }}>
                Sản phẩm
              </span>
              <span
                className="text-center"
                style={{ ...TYPE.micro, color: TOKENS.text.quaternary }}
              >
                Đơn giá
              </span>
              <span
                className="text-center"
                style={{ ...TYPE.micro, color: TOKENS.text.quaternary }}
              >
                Số lượng
              </span>
              <span
                className="text-right"
                style={{ ...TYPE.micro, color: TOKENS.text.quaternary }}
              >
                Tổng
              </span>
            </div>

            {/* Items */}
            {items.map((item) => {
              const lineTotal = item.priceNumber * item.qty;

              return (
                <article
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="rounded-2xl"
                  style={{
                    backgroundColor: TOKENS.cardBg,
                    border: `1px solid ${TOKENS.border}`,
                  }}
                >
                  <div className="p-5 md:p-6">
                    <div className="flex gap-4">
                      {/* Image */}
                      <div
                        className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0"
                        style={{
                          backgroundColor: TOKENS.subtleBg,
                          border: `1px solid ${TOKENS.divider}`,
                        }}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p
                              className="line-clamp-2"
                              style={{ ...TYPE.subhead, lineHeight: 1.25 }}
                            >
                              {item.name}
                            </p>

                            {(item.size || item.color) && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {item.size && (
                                  <span
                                    className="rounded-lg px-2 py-1"
                                    style={{
                                      fontSize: 12,
                                      color: TOKENS.text.tertiary,
                                      backgroundColor: TOKENS.subtleBg,
                                      border: `1px solid ${TOKENS.divider}`,
                                      fontWeight: 600,
                                    }}
                                  >
                                    Size: {item.size}
                                  </span>
                                )}
                                {item.color && (
                                  <span
                                    className="rounded-lg px-2 py-1"
                                    style={{
                                      fontSize: 12,
                                      color: TOKENS.text.tertiary,
                                      backgroundColor: TOKENS.subtleBg,
                                      border: `1px solid ${TOKENS.divider}`,
                                      fontWeight: 600,
                                    }}
                                  >
                                    {item.color}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() =>
                              removeItem(item.id, item.size, item.color)
                            }
                            className="w-9 h-9 rounded-xl grid place-items-center transition-colors"
                            style={{ color: TOKENS.text.quaternary }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                TOKENS.accent.redSoft;
                              e.currentTarget.style.color = "#EF4444";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                              e.currentTarget.style.color =
                                TOKENS.text.quaternary;
                            }}
                            aria-label="Xóa sản phẩm"
                          >
                            <IconTrash size={16} />
                          </button>
                        </div>

                        {/* Price + Qty + Total */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-baseline gap-2">
                            <span
                              style={{
                                ...TYPE.body,
                                color: TOKENS.text.tertiary,
                              }}
                            >
                              {item.price}
                            </span>
                          </div>

                          {/* Qty stepper */}
                          <div
                            className="flex items-center rounded-2xl overflow-hidden"
                            style={{
                              border: `1px solid ${TOKENS.border}`,
                              backgroundColor: TOKENS.cardBg,
                            }}
                          >
                            <button
                              onClick={() =>
                                updateQty(
                                  item.id,
                                  item.size,
                                  item.color,
                                  item.qty - 1,
                                )
                              }
                              className="w-10 h-10 grid place-items-center transition-colors"
                              style={{ color: TOKENS.text.secondary }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  TOKENS.subtleBg)
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "transparent")
                              }
                              aria-label="Giảm số lượng"
                            >
                              <IconMinus size={14} />
                            </button>

                            <span
                              className="w-10 text-center"
                              style={{
                                fontSize: 14,
                                fontWeight: 800,
                                color: TOKENS.text.primary,
                              }}
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
                              className="w-10 h-10 grid place-items-center transition-colors"
                              style={{ color: TOKENS.text.secondary }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  TOKENS.subtleBg)
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "transparent")
                              }
                              aria-label="Tăng số lượng"
                            >
                              <IconPlus size={14} />
                            </button>
                          </div>

                          <span
                            style={{
                              fontSize: 15,
                              fontWeight: 900,
                              color: TOKENS.text.primary,
                            }}
                          >
                            {fmt(lineTotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Continue shopping */}
            <Link
              href="/"
              className="mt-1 inline-flex items-center gap-2 self-start transition-colors"
              style={{ fontSize: 14, color: TOKENS.text.tertiary }}
              onMouseEnter={(e) =>
                ((e.currentTarget.style.color as any) = TOKENS.accent.orange)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget.style.color as any) = TOKENS.text.tertiary)
              }
            >
              <IconArrowLeft size={16} />
              Tiếp tục mua sắm
            </Link>

            {/* Perks */}
            <div
              className="mt-2 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-5"
              style={{
                backgroundColor: TOKENS.cardBg,
                border: `1px solid ${TOKENS.border}`,
              }}
              aria-label="Quyền lợi"
            >
              {PERKS.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-2xl grid place-items-center shrink-0"
                    style={{
                      backgroundColor: TOKENS.accent.orangeSoft,
                      border: `1px solid ${TOKENS.accent.orangeBorder}`,
                    }}
                  >
                    <Icon size={18} style={{ color: TOKENS.accent.orange }} />
                  </div>
                  <div className="min-w-0">
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: TOKENS.text.primary,
                        lineHeight: 1.2,
                      }}
                    >
                      {label}
                    </p>
                    <p className="mt-1" style={TYPE.caption}>
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ════ RIGHT: Order summary ════ */}
          <aside
            className="flex flex-col gap-4 lg:sticky lg:top-24"
            aria-label="Tóm tắt đơn hàng"
          >
            {/* Coupon */}
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: TOKENS.cardBg,
                border: `1px solid ${TOKENS.border}`,
              }}
            >
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2" style={TYPE.subhead}>
                  <IconTag size={16} style={{ color: TOKENS.accent.orange }} />
                  Mã giảm giá
                </p>

                {appliedCoupon && (
                  <button
                    onClick={removeCoupon}
                    className="inline-flex items-center gap-1 rounded-xl px-3 py-2 transition-colors"
                    style={{ fontSize: 12, color: TOKENS.text.tertiary }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget.style.color as any) =
                        TOKENS.accent.orange)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget.style.color as any) =
                        TOKENS.text.tertiary)
                    }
                  >
                    <IconX size={14} />
                    Gỡ mã
                  </button>
                )}
              </div>

              <div className="mt-4">
                {appliedCoupon ? (
                  <div
                    className="flex items-center justify-between rounded-2xl px-4 py-3"
                    style={{
                      backgroundColor: TOKENS.accent.greenSoft,
                      border: `1px solid #BBF7D0`,
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 900,
                          color: "#15803D",
                        }}
                      >
                        {appliedCoupon}
                      </p>
                      <p
                        className="mt-1"
                        style={{ fontSize: 12, color: "#16A34A" }}
                      >
                        {couponSuccess}
                      </p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="w-9 h-9 rounded-xl grid place-items-center transition-colors"
                      style={{ color: "#16A34A" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#DCFCE7")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                      aria-label="Xóa mã giảm giá"
                    >
                      <IconX size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <input
                        value={coupon}
                        onChange={(e) => {
                          setCoupon(e.target.value);
                          setCouponError("");
                        }}
                        onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                        placeholder="Nhập mã giảm giá..."
                        className="flex-1 rounded-2xl px-4 py-3 outline-none transition"
                        style={{
                          fontSize: 14,
                          border: `1px solid ${TOKENS.border}`,
                          backgroundColor: TOKENS.cardBg,
                          color: TOKENS.text.primary,
                        }}
                      />
                      <button
                        onClick={applyCoupon}
                        className="rounded-2xl px-4 py-3 transition active:scale-95"
                        style={{
                          backgroundColor: "#111827",
                          color: "#fff",
                          fontSize: 14,
                          fontWeight: 900,
                        }}
                      >
                        Áp dụng
                      </button>
                    </div>

                    {couponError && (
                      <p
                        className="mt-2"
                        style={{ fontSize: 12, color: "#EF4444" }}
                      >
                        {couponError}
                      </p>
                    )}

                    <p className="mt-3" style={TYPE.caption}>
                      Thử:{" "}
                      <button
                        onClick={() => {
                          setCoupon("FADO10");
                          setCouponError("");
                        }}
                        className="font-semibold hover:underline"
                        style={{ color: TOKENS.accent.orange }}
                      >
                        FADO10
                      </button>
                      {", "}
                      <button
                        onClick={() => {
                          setCoupon("VIP20");
                          setCouponError("");
                        }}
                        className="font-semibold hover:underline"
                        style={{ color: TOKENS.accent.orange }}
                      >
                        VIP20
                      </button>
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Summary */}
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: TOKENS.cardBg,
                border: `1px solid ${TOKENS.border}`,
              }}
            >
              <p style={{ ...TYPE.h2, fontSize: 16 }}>Tóm tắt đơn hàng</p>

              <div className="mt-4 flex flex-col gap-3">
                {summaryRows.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center justify-between gap-3"
                  >
                    <span style={{ ...TYPE.body, color: TOKENS.text.tertiary }}>
                      {r.label}
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 800,
                        color:
                          r.tone === "good" ? "#16A34A" : TOKENS.text.primary,
                      }}
                    >
                      {r.value}
                    </span>
                  </div>
                ))}

                {shipping > 0 && (
                  <div
                    className="rounded-2xl px-4 py-3"
                    style={{
                      backgroundColor: TOKENS.accent.blueSoft,
                      border: `1px solid ${TOKENS.accent.blueBorder}`,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 12,
                        color: "#2563EB",
                        lineHeight: 1.5,
                      }}
                    >
                      Mua thêm <strong>{fmt(freeShipGap)}</strong> để được miễn
                      phí vận chuyển.
                    </p>
                  </div>
                )}
              </div>

              <div
                className="my-5"
                style={{ height: 1, backgroundColor: TOKENS.divider }}
              />

              <div className="flex items-center justify-between">
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 900,
                    color: TOKENS.text.primary,
                  }}
                >
                  Tổng cộng
                </span>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    color: TOKENS.text.primary,
                  }}
                >
                  {fmt(total)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 transition active:scale-95"
                style={{
                  backgroundColor: TOKENS.accent.orange,
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 900,
                }}
              >
                Tiến hành thanh toán
                <IconChevronRight size={16} />
              </Link>

              <p className="mt-3 text-center" style={TYPE.caption}>
                🔒 Thanh toán bảo mật SSL 256-bit
              </p>
            </div>

            {/* Trust note (small, international) */}
            <div
              className="rounded-2xl p-5"
              style={{
                backgroundColor: TOKENS.cardBg,
                border: `1px solid ${TOKENS.border}`,
              }}
            >
              <p
                style={{
                  ...TYPE.caption,
                  color: TOKENS.text.secondary,
                  lineHeight: 1.6,
                }}
              >
                Bằng cách đặt hàng, bạn đồng ý với{" "}
                <Link
                  href="#"
                  className="font-semibold hover:underline"
                  style={{ color: TOKENS.accent.orange }}
                >
                  Điều khoản
                </Link>{" "}
                và{" "}
                <Link
                  href="#"
                  className="font-semibold hover:underline"
                  style={{ color: TOKENS.accent.orange }}
                >
                  Chính sách bảo mật
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
