"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconChevronRight,
  IconShieldCheck,
  IconLock,
  IconTruck,
  IconCircleCheck,
  IconCreditCard,
  IconBuildingBank,
  IconWallet,
  IconChevronDown,
  IconEdit,
  IconPackage,
  IconArrowLeft,
  IconCheck,
} from "@tabler/icons-react";
import { useCartStore } from "@/app/store/useCartStore";

/* ── helpers ── */
function fmt(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

type PaymentMethod = "card" | "bank" | "cod" | "wallet";
type Step = "info" | "shipping" | "payment" | "success";

const STEPS = [
  { key: "info", label: "Thông tin" },
  { key: "shipping", label: "Vận chuyển" },
  { key: "payment", label: "Thanh toán" },
];

const SHIPPING_OPTIONS = [
  {
    id: "standard",
    label: "Tiêu chuẩn",
    sub: "5–7 ngày làm việc",
    price: 0,
    badge: "Miễn phí",
  },
  {
    id: "express",
    label: "Nhanh",
    sub: "2–3 ngày làm việc",
    price: 25000,
    badge: null,
  },
  {
    id: "same_day",
    label: "Trong ngày",
    sub: "Trước 22:00 hôm nay",
    price: 55000,
    badge: "Nhanh nhất",
  },
];

const PAYMENT_METHODS = [
  {
    id: "card" as PaymentMethod,
    icon: IconCreditCard,
    label: "Thẻ tín dụng / Ghi nợ",
    sub: "Visa, Mastercard, JCB",
  },
  {
    id: "bank" as PaymentMethod,
    icon: IconBuildingBank,
    label: "Chuyển khoản",
    sub: "ATM, Internet Banking",
  },
  {
    id: "wallet" as PaymentMethod,
    icon: IconWallet,
    label: "Ví điện tử",
    sub: "MoMo, ZaloPay, VNPay",
  },
  {
    id: "cod" as PaymentMethod,
    icon: IconPackage,
    label: "Thanh toán khi nhận",
    sub: "Trả tiền mặt cho shipper",
  },
];

/* ══ Step bar ══ */
function StepBar({ current }: { current: Step }) {
  const idx = STEPS.findIndex((s) => s.key === current);
  return (
    <div className="flex items-center mb-6">
      {STEPS.map((step, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <div
            key={step.key}
            className="flex items-center flex-1 last:flex-none"
          >
            <div className="flex items-center gap-1.5 shrink-0">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${done ? "bg-green-500" : active ? "bg-gray-900" : "bg-gray-200"}`}
              >
                {done ? (
                  <IconCheck size={13} className="text-white" />
                ) : (
                  <span
                    style={{ fontSize: 11 }}
                    className={`font-bold ${active ? "text-white" : "text-gray-400"}`}
                  >
                    {i + 1}
                  </span>
                )}
              </div>
              <span
                style={{ fontSize: 12 }}
                className={`font-semibold whitespace-nowrap ${active ? "text-gray-900" : done ? "text-green-600" : "text-gray-400"}`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px mx-2 ${i < idx ? "bg-green-300" : "bg-gray-200"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ══ Field ══ */
function Field({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label style={{ fontSize: 12 }} className="font-semibold text-gray-600">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-gray-500 transition bg-white"
        style={{ fontSize: 14 }}
      />
    </div>
  );
}

/* ══ Order summary (collapsible on mobile) ══ */
import type { CartItem } from "@/store/useCartStore";

function OrderSummary({
  items,
  subtotal,
  discount,
  shippingFee,
  total,
  mounted,
  collapsed,
  onToggle,
}: {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  mounted: boolean;
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      {/* Header — tappable on mobile to expand/collapse */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 border-b border-gray-100"
      >
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 14 }} className="font-bold text-gray-900">
            Đơn hàng
          </span>
          <span
            style={{ fontSize: 12 }}
            className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-semibold"
          >
            {items.length} sản phẩm
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 15 }} className="font-black text-orange-500">
            {fmt(total)}
          </span>
          <IconChevronDown
            size={16}
            className={`text-gray-400 transition-transform duration-200 ${collapsed ? "" : "rotate-180"}`}
          />
        </div>
      </button>

      {/* Expandable content */}
      {!collapsed && (
        <div className="px-5 py-4">
          {/* Items */}
          <div className="flex flex-col gap-3 mb-4 max-h-[240px] overflow-y-auto">
            {mounted &&
              items.map((item: any) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex gap-3"
                >
                  <div
                    className="w-13 h-13 rounded-xl overflow-hidden bg-gray-50 shrink-0 relative"
                    style={{ width: 52, height: 52 }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                    />
                    <span
                      className="absolute -top-1 -right-1 w-4 h-4 bg-gray-800 text-white rounded-full flex items-center justify-center"
                      style={{ fontSize: 9 }}
                    >
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      style={{ fontSize: 13 }}
                      className="font-semibold text-gray-800 line-clamp-1"
                    >
                      {item.name}
                    </p>
                    <p style={{ fontSize: 12 }} className="text-gray-400">
                      {[item.size, item.color].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <span
                    style={{ fontSize: 13 }}
                    className="font-bold text-gray-900 shrink-0"
                  >
                    {fmt(item.priceNumber * item.qty)}
                  </span>
                </div>
              ))}
          </div>

          <div className="h-px bg-gray-100 mb-3" />

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span style={{ fontSize: 14 }} className="text-gray-500">
                Tạm tính
              </span>
              <span
                style={{ fontSize: 14 }}
                className="font-semibold text-gray-800"
              >
                {fmt(subtotal)}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span style={{ fontSize: 14 }} className="text-gray-500">
                  Giảm giá
                </span>
                <span
                  style={{ fontSize: 14 }}
                  className="font-semibold text-green-600"
                >
                  -{fmt(discount)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span style={{ fontSize: 14 }} className="text-gray-500">
                Vận chuyển
              </span>
              <span
                style={{ fontSize: 14 }}
                className={`font-semibold ${shippingFee === 0 ? "text-green-600" : "text-gray-800"}`}
              >
                {shippingFee === 0 ? "Miễn phí" : fmt(shippingFee)}
              </span>
            </div>
            <div className="h-px bg-gray-100 my-1" />
            <div className="flex justify-between">
              <span
                style={{ fontSize: 15 }}
                className="font-bold text-gray-900"
              >
                Tổng cộng
              </span>
              <span
                style={{ fontSize: 18 }}
                className="font-black text-gray-900"
              >
                {fmt(total)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════
   PAGE
══════════════════════════════════ */
export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>("info");
  const [summaryCollapsed, setSummaryCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    ward: "",
    district: "",
    city: "",
    note: "",
  });
  const f = (key: keyof typeof form) => (v: string) =>
    setForm((p) => ({ ...p, [key]: v }));

  const [shippingId, setShippingId] = useState("standard");
  const selectedShipping = SHIPPING_OPTIONS.find((o) => o.id === shippingId)!;

  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [cardNum, setCardNum] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const [discount] = useState(0);

  const items = useCartStore((s) => s.items) as CartItem[];
  const totalPrice = useCartStore((s) => s.totalPrice);
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const subtotal = mounted ? totalPrice() : 0;
  const shippingFee = subtotal >= 500000 ? 0 : selectedShipping.price;
  const total = subtotal - discount + shippingFee;

  const placeOrder = () => {
    clearCart();
    setStep("success");
  };

  const infoValid = !!(
    form.fullName &&
    form.email &&
    form.phone &&
    form.address &&
    form.city
  );

  /* ── Success ── */
  if (step === "success") {
    return (
      <main className="bg-[#f0f0f0] min-h-screen font-sans pt-6 flex items-start justify-center px-4 py-10">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-sm">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <IconCircleCheck size={40} className="text-green-500" />
          </div>
          <h1
            style={{ fontSize: 22 }}
            className="font-black text-gray-900 mb-2"
          >
            Đặt hàng thành công!
          </h1>
          <p style={{ fontSize: 14 }} className="text-gray-500 mb-1">
            Cảm ơn bạn đã mua hàng tại EmcomerFado.
          </p>
          <p style={{ fontSize: 14 }} className="text-gray-500 mb-6">
            Xác nhận sẽ được gửi đến{" "}
            <span className="font-semibold text-gray-800">
              {form.email || "email của bạn"}
            </span>
            .
          </p>
          <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left flex flex-col gap-2.5">
            {[
              ["Mã đơn hàng", `#FD${Date.now().toString().slice(-6)}`],
              ["Tổng thanh toán", fmt(total)],
              ["Dự kiến giao hàng", selectedShipping.sub],
              [
                "Phương thức thanh toán",
                PAYMENT_METHODS.find((m) => m.id === payment)?.label ?? "",
              ],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-center">
                <span style={{ fontSize: 13 }} className="text-gray-500">
                  {label}
                </span>
                <span
                  style={{ fontSize: 13 }}
                  className="font-bold text-gray-900"
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition"
              style={{ fontSize: 14 }}
            >
              Tiếp tục mua sắm
            </Link>
            <Link
              href="/orders"
              className="flex items-center justify-center gap-2 w-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3.5 rounded-xl transition"
              style={{ fontSize: 14 }}
            >
              Xem đơn hàng của tôi
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ── CTA label by step ── */
  const ctaLabel =
    step === "info"
      ? "Tiếp tục"
      : step === "shipping"
        ? "Tiếp tục"
        : `Đặt hàng · ${fmt(total)}`;
  const ctaDisabled = step === "info" && !infoValid;

  const handleCta = () => {
    if (step === "info") setStep("shipping");
    else if (step === "shipping") setStep("payment");
    else placeOrder();
  };

  const handleBack = () => {
    if (step === "shipping") setStep("info");
    else if (step === "payment") setStep("shipping");
  };

  return (
    <main className="bg-[#f0f0f0] min-h-screen font-sans pt-6">
      <div className="max-w-[1280px] mx-auto px-4 md:px-5 pb-28 md:pb-16">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-1.5 mb-4"
          style={{ fontSize: 12 }}
        >
          <Link
            href="/"
            className="text-gray-400 hover:text-orange-500 transition"
          >
            Trang chủ
          </Link>
          <IconChevronRight size={12} className="text-gray-300" />
          <Link
            href="/cart"
            className="text-gray-400 hover:text-orange-500 transition"
          >
            Giỏ hàng
          </Link>
          <IconChevronRight size={12} className="text-gray-300" />
          <span className="text-gray-700 font-medium">Thanh toán</span>
        </nav>

        <h1 style={{ fontSize: 22 }} className="font-black text-gray-900 mb-5">
          Thanh toán
        </h1>

        {/* Step bar */}
        <StepBar current={step} />

        {/* Layout: single col mobile, 2-col desktop */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 380px",
            gap: 20,
            alignItems: "start",
          }}
        >
          {/* ════ FORM COL ════ */}
          <div className="flex flex-col gap-4">
            {/* Order summary accordion — mobile only (top) */}
            {isMobile && (
              <OrderSummary
                items={items}
                subtotal={subtotal}
                discount={discount}
                shippingFee={shippingFee}
                total={total}
                mounted={mounted}
                collapsed={summaryCollapsed}
                onToggle={() => setSummaryCollapsed((v) => !v)}
              />
            )}

            {/* ── STEP 1: Thông tin ── */}
            {step === "info" && (
              <div className="bg-white rounded-2xl p-5 md:p-6">
                <h2
                  style={{ fontSize: 16 }}
                  className="font-bold text-gray-900 mb-5"
                >
                  Thông tin giao hàng
                </h2>
                <div className="flex flex-col gap-4">
                  <Field
                    label="Họ và tên"
                    placeholder="Nguyễn Văn A"
                    value={form.fullName}
                    onChange={f("fullName")}
                    required
                  />
                  <Field
                    label="Email"
                    placeholder="example@email.com"
                    value={form.email}
                    onChange={f("email")}
                    type="email"
                    required
                  />
                  <Field
                    label="Số điện thoại"
                    placeholder="0901 234 567"
                    value={form.phone}
                    onChange={f("phone")}
                    type="tel"
                    required
                  />
                  <Field
                    label="Địa chỉ"
                    placeholder="Số nhà, tên đường"
                    value={form.address}
                    onChange={f("address")}
                    required
                  />
                  <div className="flex gap-3">
                    <Field
                      label="Phường / Xã"
                      placeholder="Phường Bến Nghé"
                      value={form.ward}
                      onChange={f("ward")}
                    />
                    <Field
                      label="Quận / Huyện"
                      placeholder="Quận 1"
                      value={form.district}
                      onChange={f("district")}
                    />
                  </div>
                  <div>
                    <label
                      style={{ fontSize: 12 }}
                      className="block font-semibold text-gray-600 mb-1.5"
                    >
                      Tỉnh / Thành phố <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={form.city}
                        onChange={(e) => f("city")(e.target.value)}
                        className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-gray-500 transition bg-white pr-10"
                        style={{ fontSize: 14 }}
                      >
                        <option value="">Chọn tỉnh thành...</option>
                        {[
                          "TP. Hồ Chí Minh",
                          "Hà Nội",
                          "Đà Nẵng",
                          "Cần Thơ",
                          "Hải Phòng",
                          "Bình Dương",
                          "Đồng Nai",
                        ].map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                      <IconChevronDown
                        size={14}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      style={{ fontSize: 12 }}
                      className="block font-semibold text-gray-600 mb-1.5"
                    >
                      Ghi chú
                    </label>
                    <textarea
                      value={form.note}
                      onChange={(e) => f("note")(e.target.value)}
                      placeholder="Ghi chú cho người giao hàng (tùy chọn)..."
                      rows={3}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-gray-500 transition resize-none bg-white"
                      style={{ fontSize: 14 }}
                    />
                  </div>
                </div>
                {/* Desktop nav buttons */}
                {!isMobile && (
                  <div className="flex items-center justify-between mt-6">
                    <Link
                      href="/cart"
                      className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition"
                      style={{ fontSize: 14 }}
                    >
                      <IconArrowLeft size={15} /> Giỏ hàng
                    </Link>
                    <button
                      onClick={() => setStep("shipping")}
                      disabled={!infoValid}
                      className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition active:scale-95"
                      style={{ fontSize: 14 }}
                    >
                      Tiếp tục <IconChevronRight size={15} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Collapsed info summary */}
            {step !== "info" && (
              <div className="bg-white rounded-2xl px-4 py-3.5 flex items-center justify-between">
                <div className="min-w-0">
                  <p
                    style={{ fontSize: 11 }}
                    className="text-gray-400 font-semibold uppercase tracking-wider mb-0.5"
                  >
                    Địa chỉ giao hàng
                  </p>
                  <p
                    style={{ fontSize: 14 }}
                    className="font-semibold text-gray-800 truncate"
                  >
                    {form.fullName} · {form.phone}
                  </p>
                  <p
                    style={{ fontSize: 12 }}
                    className="text-gray-500 truncate"
                  >
                    {form.address}, {form.district}, {form.city}
                  </p>
                </div>
                <button
                  onClick={() => setStep("info")}
                  className="flex items-center gap-1 text-orange-500 hover:text-orange-600 transition shrink-0 ml-3"
                  style={{ fontSize: 13 }}
                >
                  <IconEdit size={13} /> Sửa
                </button>
              </div>
            )}

            {/* ── STEP 2: Vận chuyển ── */}
            {step === "shipping" && (
              <div className="bg-white rounded-2xl p-5 md:p-6">
                <h2
                  style={{ fontSize: 16 }}
                  className="font-bold text-gray-900 mb-4"
                >
                  Phương thức vận chuyển
                </h2>
                <div className="flex flex-col gap-3">
                  {SHIPPING_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      onClick={() => setShippingId(opt.id)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                        shippingId === opt.id
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-100 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${shippingId === opt.id ? "border-gray-900" : "border-gray-300"}`}
                      >
                        {shippingId === opt.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            style={{ fontSize: 14 }}
                            className="font-semibold text-gray-800"
                          >
                            {opt.label}
                          </span>
                          {opt.badge && (
                            <span
                              style={{ fontSize: 11 }}
                              className={`px-2 py-0.5 rounded-full font-bold ${opt.badge === "Miễn phí" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}
                            >
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p
                          style={{ fontSize: 12 }}
                          className="text-gray-400 mt-0.5"
                        >
                          {opt.sub}
                        </p>
                      </div>
                      <span
                        style={{ fontSize: 14 }}
                        className={`font-bold shrink-0 ${opt.price === 0 ? "text-green-600" : "text-gray-800"}`}
                      >
                        {opt.price === 0 ? "Free" : fmt(opt.price)}
                      </span>
                    </label>
                  ))}
                </div>
                {!isMobile && (
                  <div className="flex items-center justify-between mt-6">
                    <button
                      onClick={() => setStep("info")}
                      className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition"
                      style={{ fontSize: 14 }}
                    >
                      <IconArrowLeft size={15} /> Quay lại
                    </button>
                    <button
                      onClick={() => setStep("payment")}
                      className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-bold px-6 py-3 rounded-xl transition active:scale-95"
                      style={{ fontSize: 14 }}
                    >
                      Tiếp tục <IconChevronRight size={15} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Collapsed shipping summary */}
            {step === "payment" && (
              <div className="bg-white rounded-2xl px-4 py-3.5 flex items-center justify-between">
                <div>
                  <p
                    style={{ fontSize: 11 }}
                    className="text-gray-400 font-semibold uppercase tracking-wider mb-0.5"
                  >
                    Vận chuyển
                  </p>
                  <p
                    style={{ fontSize: 14 }}
                    className="font-semibold text-gray-800"
                  >
                    {selectedShipping.label}
                  </p>
                  <p style={{ fontSize: 12 }} className="text-gray-500">
                    {selectedShipping.sub} ·{" "}
                    {selectedShipping.price === 0
                      ? "Miễn phí"
                      : fmt(selectedShipping.price)}
                  </p>
                </div>
                <button
                  onClick={() => setStep("shipping")}
                  className="flex items-center gap-1 text-orange-500 hover:text-orange-600 transition shrink-0 ml-3"
                  style={{ fontSize: 13 }}
                >
                  <IconEdit size={13} /> Sửa
                </button>
              </div>
            )}

            {/* ── STEP 3: Thanh toán ── */}
            {step === "payment" && (
              <div className="bg-white rounded-2xl p-5 md:p-6">
                <h2
                  style={{ fontSize: 16 }}
                  className="font-bold text-gray-900 mb-4"
                >
                  Phương thức thanh toán
                </h2>
                <div className="flex flex-col gap-3 mb-5">
                  {PAYMENT_METHODS.map((m) => (
                    <label
                      key={m.id}
                      onClick={() => setPayment(m.id)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${payment === m.id ? "border-gray-900 bg-gray-50" : "border-gray-100 hover:border-gray-300"}`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${payment === m.id ? "border-gray-900" : "border-gray-300"}`}
                      >
                        {payment === m.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                        )}
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                        <m.icon size={17} className="text-gray-600" />
                      </div>
                      <div className="min-w-0">
                        <p
                          style={{ fontSize: 14 }}
                          className="font-semibold text-gray-800"
                        >
                          {m.label}
                        </p>
                        <p style={{ fontSize: 12 }} className="text-gray-400">
                          {m.sub}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Card form */}
                {payment === "card" && (
                  <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-3 mb-5 border border-gray-100">
                    <div>
                      <label
                        style={{ fontSize: 12 }}
                        className="block font-semibold text-gray-600 mb-1.5"
                      >
                        Số thẻ
                      </label>
                      <input
                        value={cardNum}
                        onChange={(e) =>
                          setCardNum(
                            e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 16)
                              .replace(/(.{4})/g, "$1 ")
                              .trim(),
                          )
                        }
                        placeholder="0000 0000 0000 0000"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-gray-500 bg-white transition"
                        style={{ fontSize: 14, letterSpacing: "0.05em" }}
                        inputMode="numeric"
                      />
                    </div>
                    <div>
                      <label
                        style={{ fontSize: 12 }}
                        className="block font-semibold text-gray-600 mb-1.5"
                      >
                        Tên chủ thẻ
                      </label>
                      <input
                        value={cardName}
                        onChange={(e) =>
                          setCardName(e.target.value.toUpperCase())
                        }
                        placeholder="NGUYEN VAN A"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-gray-500 bg-white transition uppercase"
                        style={{ fontSize: 14 }}
                      />
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label
                          style={{ fontSize: 12 }}
                          className="block font-semibold text-gray-600 mb-1.5"
                        >
                          Ngày hết hạn
                        </label>
                        <input
                          value={cardExp}
                          onChange={(e) => {
                            const v = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 4);
                            setCardExp(
                              v.length > 2
                                ? v.slice(0, 2) + "/" + v.slice(2)
                                : v,
                            );
                          }}
                          placeholder="MM/YY"
                          inputMode="numeric"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-gray-500 bg-white transition"
                          style={{ fontSize: 14 }}
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          style={{ fontSize: 12 }}
                          className="block font-semibold text-gray-600 mb-1.5"
                        >
                          CVV
                        </label>
                        <input
                          value={cardCvv}
                          onChange={(e) =>
                            setCardCvv(
                              e.target.value.replace(/\D/g, "").slice(0, 4),
                            )
                          }
                          placeholder="•••"
                          type="password"
                          inputMode="numeric"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-gray-500 bg-white transition"
                          style={{ fontSize: 14 }}
                        />
                      </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="w-4 h-4 rounded"
                      />
                      <span style={{ fontSize: 13 }} className="text-gray-600">
                        Lưu thẻ cho lần sau
                      </span>
                    </label>
                  </div>
                )}

                {/* Trust */}
                <div className="flex items-center gap-4 flex-wrap mb-5">
                  {[
                    { icon: IconLock, text: "SSL 256-bit" },
                    { icon: IconShieldCheck, text: "Bảo mật" },
                    { icon: IconTruck, text: "Giao hàng đảm bảo" },
                  ].map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-1.5 text-gray-400"
                    >
                      <Icon size={13} />
                      <span style={{ fontSize: 12 }}>{text}</span>
                    </div>
                  ))}
                </div>

                {/* Desktop CTA */}
                {!isMobile && (
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setStep("shipping")}
                      className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition"
                      style={{ fontSize: 14 }}
                    >
                      <IconArrowLeft size={15} /> Quay lại
                    </button>
                    <button
                      onClick={placeOrder}
                      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black px-8 py-3.5 rounded-xl transition shadow-lg shadow-orange-100"
                      style={{ fontSize: 15 }}
                    >
                      Đặt hàng ngay · {fmt(total)}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ════ RIGHT: Order summary — desktop only ════ */}
          {!isMobile && (
            <div className="flex flex-col gap-4 sticky top-24">
              <div className="bg-white rounded-2xl p-5">
                <p
                  style={{ fontSize: 15 }}
                  className="font-bold text-gray-900 mb-4"
                >
                  Đơn hàng ({items.length} sản phẩm)
                </p>
                <div className="flex flex-col gap-3 mb-4 max-h-[260px] overflow-y-auto">
                  {mounted &&
                    items.map((item) => (
                      <div
                        key={`${item.id}-${item.size}-${item.color}`}
                        className="flex gap-3"
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 shrink-0 relative">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-1.5"
                          />
                          <span
                            className="absolute -top-1 -right-1 w-5 h-5 bg-gray-800 text-white rounded-full flex items-center justify-center"
                            style={{ fontSize: 10 }}
                          >
                            {item.qty}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            style={{ fontSize: 13 }}
                            className="font-semibold text-gray-800 line-clamp-2 leading-snug"
                          >
                            {item.name}
                          </p>
                          <p
                            style={{ fontSize: 12 }}
                            className="text-gray-400 mt-0.5"
                          >
                            {[item.size, item.color]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        </div>
                        <span
                          style={{ fontSize: 13 }}
                          className="font-bold text-gray-900 shrink-0"
                        >
                          {fmt(item.priceNumber * item.qty)}
                        </span>
                      </div>
                    ))}
                </div>
                <div className="h-px bg-gray-100 mb-3" />
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between">
                    <span style={{ fontSize: 14 }} className="text-gray-500">
                      Tạm tính
                    </span>
                    <span
                      style={{ fontSize: 14 }}
                      className="font-semibold text-gray-800"
                    >
                      {fmt(subtotal)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span style={{ fontSize: 14 }} className="text-gray-500">
                        Giảm giá
                      </span>
                      <span
                        style={{ fontSize: 14 }}
                        className="font-semibold text-green-600"
                      >
                        -{fmt(discount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span style={{ fontSize: 14 }} className="text-gray-500">
                      Vận chuyển
                    </span>
                    <span
                      style={{ fontSize: 14 }}
                      className={`font-semibold ${shippingFee === 0 ? "text-green-600" : "text-gray-800"}`}
                    >
                      {shippingFee === 0 ? "Miễn phí" : fmt(shippingFee)}
                    </span>
                  </div>
                </div>
                <div className="h-px bg-gray-100 my-3" />
                <div className="flex justify-between items-center">
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
              </div>

              <div className="bg-white rounded-2xl p-4 flex flex-col gap-3">
                {[
                  {
                    icon: IconLock,
                    label: "Thanh toán bảo mật",
                    sub: "SSL 256-bit",
                  },
                  {
                    icon: IconShieldCheck,
                    label: "Hàng chính hãng 100%",
                    sub: "Cam kết authentic",
                  },
                  {
                    icon: IconTruck,
                    label: "Giao hàng đảm bảo",
                    sub: "Hoàn tiền nếu không nhận",
                  },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-green-500" />
                    </div>
                    <div>
                      <p
                        style={{ fontSize: 13 }}
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
          )}
        </div>
      </div>

      {/* ════ MOBILE: Fixed bottom CTA ════ */}
      {isMobile && (
        <div
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 z-50"
          style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.07)" }}
        >
          <div className="flex items-center gap-3">
            {step !== "info" && (
              <button
                onClick={handleBack}
                className="w-11 h-11 flex items-center justify-center border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 shrink-0 transition"
              >
                <IconArrowLeft size={18} />
              </button>
            )}
            <button
              onClick={handleCta}
              disabled={ctaDisabled}
              className={`flex-1 flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl transition active:scale-95 ${
                step === "payment"
                  ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-100"
                  : "bg-gray-900 hover:bg-gray-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
              }`}
              style={{ fontSize: 14 }}
            >
              {ctaLabel}
              {step !== "payment" && <IconChevronRight size={16} />}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
