import Link from "next/link";
import { IconShoppingBag } from "@tabler/icons-react";

/* ===================== Types ===================== */
type Badge = {
  text: string;
  color: string;
};

type MenuItem = {
  label: string;
  badge?: Badge | null;
};

type MenuColumn = {
  title: string;
  items: MenuItem[];
};

/* ===================== Data ===================== */
const columns: MenuColumn[] = [
  {
    title: "Loại Sản Phẩm",
    items: [
      { label: "Sản phẩm đơn lẻ" },
      { label: "Sản phẩm theo bộ" },
      {
        label: "Sản phẩm biến thể",
        badge: { text: "NEW", color: "bg-blue-500" },
      },
      { label: "Sản phẩm liên kết" },
      {
        label: "Sản phẩm giảm giá",
        badge: { text: "SALE", color: "bg-rose-500" },
      },
      { label: "Upsell Products" },
      { label: "Cross-Sell Products" },
    ],
  },
  {
    title: "Trang Mua Sắm",
    items: [
      { label: "Trang Shop" },
      { label: "Giỏ hàng" },
      { label: "Trang Checkout" },
      { label: "Tài khoản của tôi" },
      {
        label: "Bộ lọc Ajax",
        badge: { text: "HOT", color: "bg-orange-500" },
      },
      { label: "Danh mục sản phẩm" },
      { label: "Chính sách bảo mật" },
    ],
  },
  {
    title: "Tính Năng Shop",
    items: [
      { label: "Thanh tiến trình kho" },
      { label: "Màu & Hình ảnh" },
      { label: "Bảng size" },
      { label: "Tab tuỳ chỉnh" },
      { label: "Đếm ngược" },
      {
        label: "Video sản phẩm",
        badge: { text: "FEATURED", color: "bg-purple-500" },
      },
      { label: "Thương hiệu sản phẩm" },
    ],
  },
];

/* ===================== Column ===================== */
function Column({ title, items }: MenuColumn) {
  return (
    <div>
      <h4 className="mb-5 pb-3 border-b border-gray-100 text-sm font-black uppercase tracking-widest text-gray-950">
        {title}
      </h4>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href="#"
              className="
                flex items-center gap-3
                text-[15px] font-medium text-gray-600
                hover:text-gray-950
                transition-colors
              "
            >
              <span>{item.label}</span>

              {item.badge && (
                <span
                  className={`
                    ${item.badge.color}
                    text-white text-[11px] font-black
                    px-2 py-0.5
                    tracking-wider
                  `}
                >
                  {item.badge.text}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ===================== Mega Menu ===================== */
export default function ShopMegaMenu() {
  return (
    <div
      className="
        mx-auto w-[1040px]
        bg-white
        border border-gray-100
        shadow-2xl
        p-6
        grid grid-cols-4 gap-6
      "
    >
      {/* Menu Columns */}
      {columns.map((col) => (
        <Column key={col.title} {...col} />
      ))}

      {/* Promo Banner */}
      <div className="relative border border-gray-100 bg-gray-50 p-6 flex flex-col justify-between overflow-hidden">
        <div>
          <span className="inline-block mb-4 px-3 py-1 text-[11px] font-black tracking-wider bg-gray-950 text-white">
            SPECIAL SALE
          </span>

          <h3 className="text-3xl font-black leading-tight text-gray-950">
            Giảm Đến
            <br />
            <span className="text-orange-500">30% OFF</span>
          </h3>

          <Link
            href="#"
            className="
              inline-block mt-6
              text-[14px] font-black uppercase tracking-widest
              text-gray-950
              border-b-2 border-gray-950
              hover:text-orange-500 hover:border-orange-500
              transition-colors
            "
          >
            Mua ngay →
          </Link>
        </div>

        {/* Decorative Icon */}
        <div className="absolute bottom-6 right-6 w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center opacity-70">
          <IconShoppingBag className="w-8 h-8 text-orange-500" stroke={2} />
        </div>
      </div>
    </div>
  );
}
