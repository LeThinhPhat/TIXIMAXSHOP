"use client";

import Link from "next/link";
import {
  IconDeviceMobile,
  IconDeviceLaptop,
  IconCamera,
  IconHeadphones,
  IconHanger,
  IconShirt,
  IconBabyBottle,
  IconSofa,
  IconToolsKitchen2,
  IconHeart,
  IconBallFootball,
  IconBook,
  IconArrowRight,
} from "@tabler/icons-react";

/* ===================== DATA ===================== */

const categories = [
  {
    icon: IconDeviceMobile,
    label: "Điện thoại & Tablet",
    count: "1.2k SP",
  },
  {
    icon: IconDeviceLaptop,
    label: "Laptop & Máy tính",
    count: "840 SP",
    badge: { text: "NEW", color: "bg-blue-500" },
  },
  {
    icon: IconCamera,
    label: "Máy ảnh & Quay phim",
    count: "320 SP",
  },
  {
    icon: IconHeadphones,
    label: "Âm thanh & Tai nghe",
    count: "560 SP",
  },
  {
    icon: IconHanger,
    label: "Thời trang nữ",
    count: "5.6k SP",
    badge: { text: "HOT", color: "bg-rose-500" },
  },
  {
    icon: IconShirt,
    label: "Thời trang nam",
    count: "3.2k SP",
  },
  {
    icon: IconBabyBottle,
    label: "Đồ trẻ em",
    count: "1.8k SP",
  },
  {
    icon: IconSofa,
    label: "Nhà cửa & Nội thất",
    count: "2.4k SP",
  },
  {
    icon: IconToolsKitchen2,
    label: "Nhà bếp & Ăn uống",
    count: "980 SP",
  },
  {
    icon: IconHeart,
    label: "Làm đẹp & Mỹ phẩm",
    count: "3.1k SP",
    badge: { text: "SALE", color: "bg-emerald-500" },
  },
  {
    icon: IconBallFootball,
    label: "Thể thao & Dã ngoại",
    count: "1.5k SP",
  },
  {
    icon: IconBook,
    label: "Sách & Văn phòng",
    count: "4.2k SP",
  },
];

const featured = [
  { label: "Flash Sale hôm nay", color: "text-orange-500" },
  { label: "Hàng mới về tuần này", color: "text-blue-500" },
  { label: "Deal cuối tuần", color: "text-rose-500" },
];

/* ===================== COMPONENT ===================== */

export default function CategoriesMegaMenu() {
  return (
    <div
      className="
        absolute top-full left-1/2 -translate-x-1/2
        w-[1040px]
        bg-white
        border border-gray-100
        shadow-2xl
        z-50
        p-6
      "
    >
      <div className="grid grid-cols-4 gap-6">
        {/* LEFT */}
        <div className="col-span-3">
          <h4 className="mb-5 pb-3 border-b border-gray-100 text-sm font-black uppercase tracking-widest text-gray-950">
            Tất cả danh mục
          </h4>

          <div className="grid grid-cols-3 gap-x-6 gap-y-4">
            {categories.map((cat) => {
              const Icon = cat.icon;

              return (
                <Link
                  key={cat.label}
                  href="#"
                  className="
                    group flex items-center gap-4
                    p-3
                    hover:bg-gray-50
                    transition
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      w-11 h-11 flex items-center justify-center
                      bg-gray-100
                      group-hover:bg-gray-950 group-hover:text-white
                      transition
                    "
                  >
                    <Icon size={22} stroke={1.8} />
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-medium text-gray-950 truncate">
                        {cat.label}
                      </span>

                      {cat.badge && (
                        <span
                          className={`
                            ${cat.badge.color}
                            text-white text-[10px] font-black
                            px-2 py-0.5
                            tracking-wider
                          `}
                        >
                          {cat.badge.text}
                        </span>
                      )}
                    </div>

                    <span className="text-sm text-gray-400">{cat.count}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6">
          {/* Featured */}
          <div>
            <h4 className="mb-4 pb-3 border-b border-gray-100 text-sm font-black uppercase tracking-widest text-gray-950">
              Nổi bật
            </h4>

            <ul className="space-y-3">
              {featured.map((f) => (
                <li key={f.label}>
                  <Link
                    href="#"
                    className={`
                      flex items-center gap-2
                      text-[15px] font-black
                      ${f.color}
                      hover:underline
                    `}
                  >
                    <IconArrowRight size={14} />
                    {f.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Promo */}
          <div className="flex-1 border border-orange-100 bg-orange-50 p-6">
            <span className="inline-block text-[11px] font-black tracking-wider bg-orange-500 text-white px-3 py-1">
              TOP PICK
            </span>

            <p className="text-xl font-black mt-4 leading-snug text-gray-950">
              Danh mục
              <br />
              Hot nhất tuần
            </p>

            <Link
              href="#"
              className="
                inline-flex items-center gap-1
                mt-4
                text-[14px] font-black uppercase tracking-widest
                text-orange-600
                hover:underline
              "
            >
              Xem ngay <IconArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
