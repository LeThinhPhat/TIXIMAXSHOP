"use client";

import { useState } from "react";
import Link from "next/link";

/* ===================== DATA ===================== */

const footerLinks = [
  {
    title: "Về EmcomerFado",
    links: ["Giới thiệu", "Tuyển dụng", "Tin tức", "Liên hệ"],
  },
  {
    title: "Chăm sóc khách hàng",
    links: [
      "Trung tâm hỗ trợ",
      "Hướng dẫn mua hàng",
      "Chính sách đổi trả",
      "Chính sách bảo hành",
    ],
  },
  {
    title: "Hợp tác",
    links: [
      "Bán hàng cùng chúng tôi",
      "Trở thành đối tác",
      "Affiliate",
      "Quảng cáo",
    ],
  },
  {
    title: "Thanh toán",
    links: ["Ví điện tử", "Thẻ ngân hàng", "COD", "Trả góp 0%"],
  },
];

/* ===================== ACCORDION ITEM ===================== */

function AccordionSection({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-800">
      {/* Toggle button — mobile only */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left md:hidden"
      >
        <span className="text-white font-bold text-sm">{title}</span>
        <svg
          className="w-4 h-4 text-gray-500 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Mobile: collapsible */}
      <div
        className="overflow-hidden transition-all duration-300 md:hidden"
        style={{ maxHeight: open ? links.length * 40 : 0 }}
      >
        <ul className="pb-4 space-y-2">
          {links.map((link) => (
            <li key={link}>
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-orange-400 transition-colors"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop: always visible, no border */}
      <div className="hidden md:block">
        <h4 className="text-white font-bold text-sm mb-4">{title}</h4>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link}>
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-orange-400 transition-colors"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ===================== FOOTER ===================== */

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-12">
      {/* ===== Newsletter ===== */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-black text-xl">
              Đăng ký nhận ưu đãi
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Nhận ngay voucher 50k cho đơn hàng đầu tiên
            </p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Nhập email của bạn..."
              className="flex-1 md:w-72 px-4 py-3 rounded-full bg-gray-800 text-white text-sm placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm font-bold transition-colors whitespace-nowrap">
              Đăng ký
            </button>
          </div>
        </div>
      </div>

      {/* ===== Main footer ===== */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1 pb-6 md:pb-0 border-b border-gray-800 md:border-none">
            <span className="text-2xl font-black text-white">
              Emcomer<span className="text-orange-500">Fado</span>
            </span>
            <p className="text-sm mt-3 leading-relaxed text-gray-500">
              Nền tảng mua sắm trực tuyến uy tín, đa dạng sản phẩm từ hàng nghìn
              thương hiệu.
            </p>
            <div className="flex gap-3 mt-4">
              {["f", "in", "tw", "yt"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-orange-500 transition-colors flex items-center justify-center text-xs font-bold text-gray-400 hover:text-white"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links — accordion on mobile, normal on desktop */}
          <div className="md:col-span-4 md:grid md:grid-cols-4 md:gap-8">
            {footerLinks.map((section) => (
              <AccordionSection
                key={section.title}
                title={section.title}
                links={section.links}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ===== Bottom bar ===== */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <span>© 2025 EmcomerFado. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-400 transition-colors">
              Điều khoản sử dụng
            </Link>
            <Link href="#" className="hover:text-gray-400 transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="#" className="hover:text-gray-400 transition-colors">
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
