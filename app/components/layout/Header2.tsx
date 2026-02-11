"use client";

import Link from "next/link";
import {
  IconLayoutGrid,
  IconBolt,
  IconBuildingStore,
  IconTicket,
  IconHeadset,
  IconDiamond,
} from "@tabler/icons-react";

const menus = [
  {
    label: "Danh mục",
    href: "/categories",
    icon: IconLayoutGrid,
  },
  {
    label: "Săn deal Mỹ",
    href: "/us-deals",
    icon: IconBolt,
  },
  {
    label: "TIXIMAX Mall",
    href: "/mall",
    icon: IconBuildingStore,
  },
  {
    label: "Mã giảm giá",
    href: "/coupons",
    icon: IconTicket,
  },
  {
    label: "Trợ lý mua sắm",
    href: "/support",
    icon: IconHeadset,
  },
  {
    label: "Luxury Sales",
    href: "/luxury",
    icon: IconDiamond,
  },
];

export default function Header2() {
  return (
    <div className="w-full bg-orange-50 border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-center gap-10 h-12">
          {menus.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="
                  flex items-center gap-2
                  text-sm font-medium text-gray-800
                  hover:text-orange-600
                  transition
                "
              >
                <Icon size={18} stroke={1.8} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
