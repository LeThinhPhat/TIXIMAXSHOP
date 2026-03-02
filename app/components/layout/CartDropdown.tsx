"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconShoppingCart,
  IconTrash,
  IconMinus,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import { useCartStore } from "@/app/store/useCartStore";

function formatPrice(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

export default function CartDropdown() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const items = useCartStore((s) => s.items);
  const totalQty = useCartStore((s) => s.totalQty);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty = useCartStore((s) => s.updateQty);

  // tránh hydration mismatch
  useEffect(() => setMounted(true), []);

  // click ngoài để đóng
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const qty = mounted ? totalQty() : 0;
  const total = mounted ? totalPrice() : 0;

  return (
    <div className="relative" ref={ref}>
      {/* Cart button */}
      <button
        aria-label="Giỏ hàng"
        onClick={() => setOpen((o) => !o)}
        className="relative flex items-center gap-2 px-3 md:px-5 py-2.5
                   bg-gray-950 text-white rounded-xl hover:bg-gray-800 transition-colors"
      >
        <IconShoppingCart className="w-[18px] h-[18px]" stroke={2} />
        <span className="hidden md:block text-[14px] font-bold">Cart</span>
        {qty > 0 && (
          <span
            className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-black
                           w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
          >
            {qty > 99 ? "99+" : qty}
          </span>
        )}
        {qty === 0 && (
          <span
            className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-black
                           w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
          >
            0
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute top-full right-0 mt-3 w-[360px] bg-white rounded-2xl shadow-2xl
                        shadow-gray-200/80 border border-gray-100 z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span
                style={{ fontSize: 15 }}
                className="font-bold text-gray-900"
              >
                Giỏ hàng
              </span>
              {qty > 0 && (
                <span className="bg-orange-100 text-orange-600 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {qty} sản phẩm
                </span>
              )}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
            >
              <IconX size={15} className="text-gray-500" />
            </button>
          </div>

          {/* Empty state */}
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 px-5 gap-3">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                <IconShoppingCart size={28} className="text-gray-300" />
              </div>
              <p style={{ fontSize: 14 }} className="text-gray-400 font-medium">
                Giỏ hàng trống
              </p>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                style={{ fontSize: 14 }}
                className="text-orange-500 font-semibold hover:underline"
              >
                Tiếp tục mua sắm →
              </Link>
            </div>
          )}

          {/* Items list */}
          {items.length > 0 && (
            <>
              <div className="max-h-[320px] overflow-y-auto divide-y divide-gray-50 px-4 py-2">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex gap-3 py-3"
                  >
                    {/* Image */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0 relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p
                        style={{ fontSize: 13 }}
                        className="font-semibold text-gray-800 line-clamp-1"
                      >
                        {item.name}
                      </p>
                      <p
                        style={{ fontSize: 12 }}
                        className="text-gray-400 mt-0.5"
                      >
                        {[item.size, item.color].filter(Boolean).join(" · ")}
                      </p>
                      <p
                        style={{ fontSize: 13 }}
                        className="font-bold text-gray-900 mt-1"
                      >
                        {item.price}
                      </p>
                    </div>

                    {/* Qty + Remove */}
                    <div className="flex flex-col items-end justify-between shrink-0">
                      <button
                        onClick={() =>
                          removeItem(item.id, item.size, item.color)
                        }
                        className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-red-50 transition text-gray-300 hover:text-red-400"
                      >
                        <IconTrash size={13} />
                      </button>
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQty(
                              item.id,
                              item.size,
                              item.color,
                              item.qty - 1,
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                        >
                          <IconMinus size={11} />
                        </button>
                        <span
                          style={{ fontSize: 13 }}
                          className="w-7 text-center font-bold text-gray-800"
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
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                        >
                          <IconPlus size={11} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between mb-3">
                  <span
                    style={{ fontSize: 14 }}
                    className="text-gray-500 font-medium"
                  >
                    Tổng cộng
                  </span>
                  <span
                    style={{ fontSize: 16 }}
                    className="font-black text-gray-900"
                  >
                    {formatPrice(total)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600
                             text-white font-bold py-3 rounded-xl transition active:scale-95"
                  style={{ fontSize: 14 }}
                >
                  Thanh toán ngay
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-full mt-2 text-gray-500 hover:text-gray-800 transition"
                  style={{ fontSize: 13 }}
                >
                  Xem giỏ hàng đầy đủ →
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
