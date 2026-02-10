"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconChevronDown,
  IconShoppingCart,
  IconUser,
  IconLogin,
  IconUserPlus,
} from "@tabler/icons-react";

import ShopMegaMenu from "./megamenu/ShopMegaMenu";
import CategoriesMegaMenu from "./megamenu/CategoriesMegaMenu";
import ProductsMegaMenu from "./megamenu/ProductsMegaMenu";
import TopDealsMegaMenu from "./megamenu/TopDealsMegaMenu";

/* ===================== Types ===================== */
type Badge = {
  text: string;
  color: string;
};

type NavItem = {
  label: string;
  href: string;
  badge?: Badge;
  mega?: boolean;
  simpleDropdown?: string[];
};

/* ===================== Nav config ===================== */
const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#", mega: true },
  {
    label: "Categories",
    href: "#",
    badge: { text: "SALE", color: "bg-emerald-500" },
    mega: true,
  },
  {
    label: "Products",
    href: "#",
    badge: { text: "HOT", color: "bg-rose-500" },
    mega: true,
  },
  { label: "Top Deals", href: "#", mega: true },
  {
    label: "Pages",
    href: "#",
    simpleDropdown: ["Blog", "About Us", "Contact", "FAQ"],
  },
];

/* ===================== Mega menu switch ===================== */
function MegaMenuRenderer({ label }: { label: string }) {
  switch (label) {
    case "Shop":
      return <ShopMegaMenu />;
    case "Categories":
      return <CategoriesMegaMenu />;
    case "Products":
      return <ProductsMegaMenu />;
    case "Top Deals":
      return <TopDealsMegaMenu />;
    default:
      return null;
  }
}

/* ===================== User Dropdown ===================== */
function UserDropdown() {
  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    closeTimerRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        aria-label="Tài khoản"
        aria-expanded={open}
        className={`
          flex items-center justify-center w-10 h-10
          rounded-xl border-2 transition-all duration-200
          ${
            open
              ? "border-gray-950 bg-gray-950 text-white"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-950 hover:text-gray-950"
          }
        `}
      >
        <IconUser className="w-[18px] h-[18px]" stroke={2} />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-100
                     rounded-2xl shadow-2xl shadow-gray-200/80 overflow-hidden z-50"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <div className="h-[3px] bg-gradient-to-r from-orange-400 to-orange-500" />
          <div className="py-2">
            <Link
              href="/login"
              className="flex items-center gap-3 px-4 py-3 text-[14px] font-semibold
                         text-gray-600 hover:text-gray-950 hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-500 shrink-0">
                <IconLogin className="w-4 h-4" stroke={2} />
              </span>
              Đăng nhập
            </Link>
            <div className="mx-4 h-px bg-gray-100" />
            <Link
              href="/register"
              className="flex items-center gap-3 px-4 py-3 text-[14px] font-semibold
                         text-gray-600 hover:text-gray-950 hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-50 text-orange-500 shrink-0">
                <IconUserPlus className="w-4 h-4" stroke={2} />
              </span>
              Đăng ký
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================== Header ===================== */
export default function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback((label: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenMenu(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 150);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="mx-auto max-w-[1440px] px-16 flex items-center justify-between h-20">
        {/* ───── Logo ───── */}
        <Link href="/" className="shrink-0 mr-8">
          <span className="text-2xl font-black tracking-[0.08em] text-gray-950 uppercase">
            TIXIMAX
            <span className="text-orange-500">SHOP</span>
          </span>
        </Link>

        {/* ───── Navigation (centered, takes remaining space) ───── */}
        <nav className="flex items-center gap-1 flex-1 justify-center">
          {NAV_ITEMS.map((item) => {
            const hasDropdown = item.mega || !!item.simpleDropdown;
            const isOpen = openMenu === item.label;
            const isActive = pathname === item.href && item.href !== "#";

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hasDropdown && handleMouseEnter(item.label)}
                onMouseLeave={() => hasDropdown && handleMouseLeave()}
              >
                <Link
                  href={item.href}
                  className={`
                    relative flex items-center gap-1.5
                    px-4 py-2.5 rounded-lg
                    text-[15px] font-semibold tracking-wide
                    transition-colors whitespace-nowrap
                    ${
                      isActive
                        ? "text-gray-950"
                        : "text-gray-500 hover:text-gray-950 hover:bg-gray-50"
                    }
                  `}
                >
                  {item.label}

                  {item.badge && (
                    <span
                      className={`
                        ${item.badge.color}
                        text-white text-[10px] font-black
                        px-1.5 py-0.5 rounded-md tracking-wider
                      `}
                    >
                      {item.badge.text}
                    </span>
                  )}

                  {hasDropdown && (
                    <IconChevronDown
                      className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      stroke={2.5}
                    />
                  )}

                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-gray-950 rounded-full" />
                  )}
                </Link>

                {/* Mega menu */}
                {item.mega && isOpen && (
                  <div
                    className="fixed left-0 right-0 top-20"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <MegaMenuRenderer label={item.label} />
                  </div>
                )}

                {/* Simple dropdown */}
                {item.simpleDropdown && isOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.simpleDropdown.map((sub) => (
                      <Link
                        key={sub}
                        href="#"
                        className="block px-5 py-3 text-[14px] font-medium text-gray-600 hover:text-gray-950 hover:bg-gray-50 rounded-xl transition"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* ───── Actions ───── */}
        <div className="flex items-center gap-2 shrink-0 ml-8">
          <button
            aria-label="Giỏ hàng"
            className="relative flex items-center gap-2 px-5 py-2.5 bg-gray-950 text-white rounded-xl hover:bg-gray-800 transition-colors"
          >
            <IconShoppingCart className="w-[18px] h-[18px]" stroke={2} />
            <span className="text-[14px] font-bold">Cart</span>
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
              0
            </span>
          </button>

          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
