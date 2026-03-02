import { notFound } from "next/navigation";
import Link from "next/link";
import { allProducts, toSlug } from "@/app/data/allProducts";
import {
  IconHome,
  IconChevronRight,
  IconCircleCheck,
} from "@tabler/icons-react";
import ProductActions from "./ProductActions";

/**
 * TYPOGRAPHY SCALE (chuẩn quốc tế e-commerce)
 * ─────────────────────────────────────────────
 * xs   : 11px — badge, tag nhỏ
 * sm   : 12px — caption, meta, breadcrumb
 * base : 14px — body, link, table cell, sidebar
 * md   : 16px — section heading (h2)
 * lg   : 22px — h1 desktop / 18px mobile
 * xl   : 28px — price desktop / 22px mobile
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = allProducts.find((p) => toSlug(p.name) === slug);
  return {
    title: item ? `${item.name} | EmcomerFado` : "Không tìm thấy | EmcomerFado",
  };
}

const SUPPORT_LINKS = [
  "Hướng dẫn mua hàng",
  "Phương thức thanh toán",
  "Chính sách đổi trả hàng",
  "Nguồn điện sử dụng",
  "Hướng dẫn chọn size",
];

const BENEFIT_LIST = [
  "Nhận ưu đãi lên đến 6% khi tham gia Fado VIPClub",
  "Giảm 1% trên đơn hàng (tối đa 200.000đ) khi thanh toán bằng FadoPay",
  "Đổi trả sản phẩm 24 giờ",
  "Giá về Việt Nam đã bao gồm các loại thuế phí, không phát sinh phụ phí",
];

function calcDiscount(price: string, oldPrice: string) {
  return `-${Math.round(
    ((parseInt(oldPrice.replace(/\D/g, "")) -
      parseInt(price.replace(/\D/g, ""))) /
      parseInt(oldPrice.replace(/\D/g, ""))) *
      100,
  )}%`;
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = allProducts.find((p) => toSlug(p.name) === slug);
  if (!item) notFound();

  const discountPercent =
    item.discount ??
    (item.oldPrice ? calcDiscount(item.price, item.oldPrice) : null);

  return (
    <main className="bg-[#f0f0f0] min-h-screen font-sans pt-6">
      {/* sm — breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-5 pt-4 pb-3">
        <nav
          className="flex items-center gap-1.5 text-gray-500"
          style={{ fontSize: 12 }}
        >
          <Link href="/" className="hover:text-orange-500 transition">
            <IconHome size={14} />
          </Link>
          <IconChevronRight size={12} className="text-gray-300" />
          {item.country && (
            <>
              <Link href="/" className="hover:text-orange-500 transition">
                {item.country}
              </Link>
              <IconChevronRight size={12} className="text-gray-300" />
            </>
          )}
          <span className="text-gray-700 font-medium line-clamp-1 max-w-[500px]">
            {item.name}
          </span>
        </nav>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 pb-10">
        {/* TOP ROW — client component */}
        <ProductActions item={item} discountPercent={discountPercent} />

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-4 items-start">
          {/* Details */}
          <div className="flex flex-col gap-4">
            {/* Description */}
            {item.description && (
              <div className="bg-white rounded-2xl p-6">
                {/* md — section heading */}
                <h2
                  style={{ fontSize: 16 }}
                  className="font-bold text-gray-900 mb-3"
                >
                  Mô tả sản phẩm
                </h2>
                {/* base — body text */}
                <p
                  style={{ fontSize: 14 }}
                  className="text-gray-500 leading-relaxed border-l-[3px] border-orange-200 pl-3"
                >
                  {item.description}
                </p>
              </div>
            )}

            {/* Benefits */}
            <div className="bg-white rounded-2xl p-6">
              <h2
                style={{ fontSize: 16 }}
                className="font-bold text-gray-900 mb-3"
              >
                Quyền lợi khi mua hàng
              </h2>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex flex-col gap-2.5">
                {BENEFIT_LIST.map((text) => (
                  <div key={text} className="flex items-start gap-2">
                    <IconCircleCheck
                      size={15}
                      className="text-blue-400 mt-0.5 shrink-0"
                    />
                    {/* base */}
                    <span style={{ fontSize: 14 }} className="text-gray-600">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="bg-white rounded-2xl p-6">
              <h2
                style={{ fontSize: 16 }}
                className="font-bold text-gray-900 mb-3"
              >
                Thông số kỹ thuật
              </h2>
              <table
                className="w-full border-collapse"
                style={{ fontSize: 14 }}
              >
                <tbody>
                  {[
                    ["Thương hiệu", item.category ?? "EmcomerFado"],
                    ["Tình trạng", "Mới 100%"],
                    ["Xuất xứ", item.country ?? "—"],
                    ["Loại hình nhập khẩu", "Nhập khẩu tiêu dùng"],
                  ].map(([label, value], idx) => (
                    <tr
                      key={label}
                      className={idx % 2 === 0 ? "bg-gray-50" : ""}
                    >
                      <td className="px-3 py-2.5 text-gray-500 w-[40%] rounded-l-lg">
                        {label}
                      </td>
                      <td className="px-3 py-2.5 text-gray-800 font-semibold rounded-r-lg">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-3 sticky top-5">
            <div className="bg-white rounded-2xl p-4">
              {/* sm — label */}
              <p style={{ fontSize: 12 }} className="text-gray-400 mb-1">
                Người bán
              </p>
              {/* base — value */}
              <p style={{ fontSize: 14 }} className="font-bold text-gray-800">
                EmcomerFado Inc
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4">
              {/* base — heading */}
              <p
                style={{ fontSize: 14 }}
                className="font-bold text-gray-800 mb-3"
              >
                Bạn cần hỗ trợ
              </p>
              <ul className="flex flex-col gap-2.5">
                {SUPPORT_LINKS.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition"
                      style={{ fontSize: 14 }}
                    >
                      <IconChevronRight
                        size={13}
                        className="text-gray-300 shrink-0"
                      />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
