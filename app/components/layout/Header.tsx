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
  IconMenu2,
  IconX,
  IconSearch,
  IconChevronRight,
} from "@tabler/icons-react";

import ShopMegaMenu from "./megamenu/ShopMegaMenu";
import CategoriesMegaMenu from "./megamenu/CategoriesMegaMenu";
import ProductsMegaMenu from "./megamenu/ProductsMegaMenu";
import TopDealsMegaMenu from "./megamenu/TopDealsMegaMenu";

/* ===================== Types ===================== */
type Badge = { text: string; color: string };
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
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  };
  const leave = () => {
    timerRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        aria-label="Tài khoản"
        className={`flex items-center justify-center w-10 h-10 rounded-xl border-2 transition-all duration-200
          ${
            open
              ? "border-gray-950 bg-gray-950 text-white"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-950 hover:text-gray-950"
          }`}
      >
        <IconUser className="w-[18px] h-[18px]" stroke={2} />
      </button>

      {open && (
        <div
          className="absolute top-full right-0 mt-2 w-52 bg-white border border-gray-100
                     rounded-2xl shadow-2xl shadow-gray-200/80 overflow-hidden z-50"
          onMouseEnter={enter}
          onMouseLeave={leave}
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

/* ===================== Mobile Drawer ===================== */
function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (label: string) =>
    setExpanded((prev) => (prev === label ? null : label));

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 left-0 h-full w-[82vw] max-w-sm bg-white z-50
                    flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
                    ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 shrink-0">
          <Link href="/" onClick={onClose}>
            <span className="text-xl font-black tracking-[0.08em] text-gray-950 uppercase">
              TIXIMAX<span className="text-orange-500">SHOP</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition"
          >
            <IconX size={20} stroke={2} className="text-gray-600" />
          </button>
        </div>

        {/* Search bar */}
        <div className="px-5 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200">
            <IconSearch
              size={16}
              stroke={2}
              className="text-gray-400 shrink-0"
            />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
            />
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {NAV_ITEMS.map((item) => {
            const hasSub = item.mega || !!item.simpleDropdown;
            const isExpanded = expanded === item.label;

            return (
              <div key={item.label}>
                <div
                  className="flex items-center justify-between px-3 py-3.5 rounded-xl
                             hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => (hasSub ? toggle(item.label) : onClose())}
                >
                  <div className="flex items-center gap-2">
                    <Link
                      href={item.href}
                      className="text-[15px] font-semibold text-gray-800"
                      onClick={(e) => hasSub && e.preventDefault()}
                    >
                      {item.label}
                    </Link>
                    {item.badge && (
                      <span
                        className={`${item.badge.color} text-white text-[10px] font-black px-1.5 py-0.5 rounded-md`}
                      >
                        {item.badge.text}
                      </span>
                    )}
                  </div>
                  {hasSub && (
                    <IconChevronDown
                      size={16}
                      stroke={2.5}
                      className={`text-gray-400 transition-transform duration-200
                        ${isExpanded ? "rotate-180" : ""}`}
                    />
                  )}
                </div>

                {/* Simple dropdown items */}
                {item.simpleDropdown && isExpanded && (
                  <div className="ml-4 mb-2 border-l-2 border-orange-100 pl-4 space-y-1">
                    {item.simpleDropdown.map((sub) => (
                      <Link
                        key={sub}
                        href="#"
                        onClick={onClose}
                        className="flex items-center justify-between py-2.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition"
                      >
                        {sub}
                        <IconChevronRight
                          size={14}
                          stroke={2}
                          className="text-gray-300"
                        />
                      </Link>
                    ))}
                  </div>
                )}

                {/* Mega items — simplified links */}
                {item.mega && isExpanded && (
                  <div className="ml-4 mb-2 border-l-2 border-orange-100 pl-4">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest py-2">
                      Xem tất cả {item.label}
                    </p>
                    <Link
                      href={
                        item.href === "#"
                          ? `/${item.label.toLowerCase().replace(" ", "-")}`
                          : item.href
                      }
                      onClick={onClose}
                      className="flex items-center justify-between py-2.5 text-sm font-medium text-orange-500 hover:text-orange-600 transition"
                    >
                      Khám phá ngay
                      <IconChevronRight
                        size={14}
                        stroke={2}
                        className="text-orange-400"
                      />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Drawer footer — auth buttons */}
        <div className="px-5 py-5 border-t border-gray-100 space-y-3 shrink-0">
          <Link
            href="/login"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                       border-2 border-gray-900 text-sm font-bold text-gray-900
                       hover:bg-gray-900 hover:text-white transition"
          >
            <IconLogin size={16} stroke={2} />
            Đăng nhập
          </Link>
          <Link
            href="/register"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                       bg-orange-500 hover:bg-orange-600 text-sm font-bold text-white transition"
          >
            <IconUserPlus size={16} stroke={2} />
            Đăng ký
          </Link>
        </div>
      </div>
    </>
  );
}

/* ===================== Header ===================== */
export default function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback((label: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenMenu(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), 150);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-16 flex items-center justify-between h-16 md:h-20">
          {/* ── Mobile: Hamburger ── */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Mở menu"
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl
                       border-2 border-gray-200 text-gray-600 hover:border-gray-950 hover:text-gray-950 transition"
          >
            <IconMenu2 size={20} stroke={2} />
          </button>

          {/* ── Logo ── */}
          <Link href="/" className="shrink-0 lg:mr-8">
            <span className="text-xl md:text-2xl font-black tracking-[0.08em] text-gray-950 uppercase">
              TIXIMAX<span className="text-orange-500">SHOP</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {NAV_ITEMS.map((item) => {
              const hasDropdown = item.mega || !!item.simpleDropdown;
              const isOpen = openMenu === item.label;
              const isActive = pathname === item.href && item.href !== "#";

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    hasDropdown && handleMouseEnter(item.label)
                  }
                  onMouseLeave={() => hasDropdown && handleMouseLeave()}
                >
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-lg
                      text-[15px] font-semibold tracking-wide transition-colors whitespace-nowrap
                      ${
                        isActive
                          ? "text-gray-950"
                          : "text-gray-500 hover:text-gray-950 hover:bg-gray-50"
                      }`}
                  >
                    {item.label}
                    {item.badge && (
                      <span
                        className={`${item.badge.color} text-white text-[10px] font-black px-1.5 py-0.5 rounded-md tracking-wider`}
                      >
                        {item.badge.text}
                      </span>
                    )}
                    {hasDropdown && (
                      <IconChevronDown
                        className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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
                      className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100
                                 rounded-2xl shadow-xl py-2 z-50"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {item.simpleDropdown.map((sub) => (
                        <Link
                          key={sub}
                          href="#"
                          className="block px-5 py-3 text-[14px] font-medium text-gray-600
                                     hover:text-gray-950 hover:bg-gray-50 rounded-xl transition"
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

          {/* ── Actions ── */}
          <div className="flex items-center gap-2 shrink-0 lg:ml-8">
            {/* Mobile: search icon */}
            <button
              aria-label="Tìm kiếm"
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl
                         border-2 border-gray-200 text-gray-600 hover:border-gray-950 transition"
            >
              <IconSearch size={18} stroke={2} />
            </button>

            {/* Cart */}
            <button
              aria-label="Giỏ hàng"
              className="relative flex items-center gap-2 px-3 md:px-5 py-2.5
                         bg-gray-950 text-white rounded-xl hover:bg-gray-800 transition-colors"
            >
              <IconShoppingCart className="w-[18px] h-[18px]" stroke={2} />
              <span className="hidden md:block text-[14px] font-bold">
                Cart
              </span>
              <span
                className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-black
                               w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
              >
                0
              </span>
            </button>

            {/* User — desktop only */}
            <div className="hidden lg:block">
              <UserDropdown />
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
