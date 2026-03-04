// app/(shop)/product/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { allProducts, toSlug } from "@/app/data/allProducts";
import {
  IconHome,
  IconChevronRight,
  IconCircleCheck,
  IconShieldCheck,
  IconTruck,
  IconRefresh,
  IconHeadset,
} from "@tabler/icons-react";
import ProductActions from "./ProductActions";

/**
 * TYPOGRAPHY SCALE (đồng bộ toàn trang)
 * ─────────────────────────────────────────────
 * xs   : 11px — micro label (NGƯỜI BÁN, uppercase tag)
 * sm   : 12px — caption phụ (sub seller, trust badge sub)
 * base : 14px — body, button, link, breadcrumb, spec value, support link
 * md   : 16px — (dùng nếu cần section label nổi bật)
 * lg   : 18px — h2 section heading
 * xl   : 15px — seller name, subhead (giữa base và lg)
 */

const T = {
  h2: { fontSize: 18, fontWeight: 600 as const, color: "#1D1D1F" },
  subhead: { fontSize: 15, fontWeight: 600 as const, color: "#1D1D1F" },
  body: { fontSize: 24, fontWeight: 400 as const, color: "#3C3C43" },
  caption: { fontSize: 12, fontWeight: 400 as const, color: "#6E6E73" },
  micro: {
    fontSize: 11,
    fontWeight: 500 as const,
    color: "#AEAEB2",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
  },
};

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
  {
    icon: IconShieldCheck,
    text: "Nhận ưu đãi lên đến 6% khi tham gia Fado VIPClub",
    color: "text-orange-500",
  },
  {
    icon: IconTruck,
    text: "Giảm 1% trên đơn hàng (tối đa 200.000đ) khi thanh toán bằng FadoPay",
    color: "text-blue-500",
  },
  {
    icon: IconRefresh,
    text: "Đổi trả sản phẩm trong 24 giờ, không cần lý do",
    color: "text-green-500",
  },
  {
    icon: IconHeadset,
    text: "Giá về Việt Nam đã bao gồm thuế, phí — không phát sinh chi phí khác",
    color: "text-purple-500",
  },
];

const TRUST_BADGES = [
  { label: "Hàng chính hãng", sub: "100% authentic" },
  { label: "Hoàn tiền 100%", sub: "Nếu không đúng mô tả" },
  { label: "Bảo hành 12 tháng", sub: "Hỗ trợ toàn quốc" },
];

function calcDiscount(price: string, oldPrice: string) {
  const p = parseInt(price.replace(/\D/g, ""), 10);
  const op = parseInt(oldPrice.replace(/\D/g, ""), 10);
  if (!p || !op || op <= 0 || p >= op) return null;
  const pct = Math.round(((op - p) / op) * 100);
  return `-${pct}%`;
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

  const specRows = [
    ["Thương hiệu", item.category ?? "EmcomerFado"],
    ["Tình trạng", "Mới 100%"],
    ["Xuất xứ", item.country ?? "—"],
    ["Loại hình nhập khẩu", "Nhập khẩu tiêu dùng"],
  ];

  return (
    <main
      className="min-h-screen font-sans"
      style={{ backgroundColor: "#F5F5F7" }}
    >
      {/* ── Breadcrumb (desktop only) ───────────────────────── */}
      <div className="hidden md:block max-w-7xl mx-auto px-5 pt-6 pb-4">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5"
          style={{ color: "#6E6E73" }}
        >
          <Link
            href="/"
            aria-label="Trang chủ"
            className="hover:text-orange-500 transition-colors flex items-center"
          >
            <IconHome size={24} />
          </Link>

          <IconChevronRight size={14} style={{ color: "#AEAEB2" }} />

          {item.country && (
            <>
              <Link href="/" style={{ ...T.body, color: "#6E6E73" }}>
                {item.country}
              </Link>
              <IconChevronRight size={14} style={{ color: "#AEAEB2" }} />
            </>
          )}

          <span
            aria-current="page"
            className="line-clamp-1 max-w-[520px]"
            style={{ ...T.body, color: "#3C3C43", fontWeight: 500 }}
          >
            {item.name}
          </span>
        </nav>
      </div>

      {/* ── Page body ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto md:px-5 pt-0 md:pt-2 pb-16 flex flex-col gap-4 md:gap-6">
        {/* TOP ROW — image + buy panel (client component) */}
        <ProductActions item={item as any} discountPercent={discountPercent} />

        {/* ── Trust bar ──────────────────────────────────────
            Desktop : grid 3 cột với divider
            Mobile  : scroll ngang, mỗi badge là 1 pill card
        ── */}

        {/* Desktop trust bar */}
        <div
          className="hidden md:grid grid-cols-3 gap-px overflow-hidden rounded-2xl border"
          style={{ borderColor: "#E8E8ED", backgroundColor: "#E8E8ED" }}
        >
          {TRUST_BADGES.map(({ label, sub }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-5 py-4"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <IconCircleCheck
                size={18}
                style={{ color: "#22C55E", flexShrink: 0 }}
              />
              <div>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#1D1D1F",
                    lineHeight: 1.3,
                  }}
                >
                  {label}
                </p>
                <p style={{ fontSize: 12, color: "#6E6E73", marginTop: 2 }}>
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile trust bar — scroll ngang */}
        <div className="flex md:hidden gap-3 overflow-x-auto pb-1 -mx-0 px-4">
          {TRUST_BADGES.map(({ label, sub }) => (
            <div
              key={label}
              className="flex-shrink-0 flex items-center gap-2.5 rounded-xl px-4 py-3"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8E8ED",
                minWidth: 170,
              }}
            >
              <IconCircleCheck
                size={16}
                style={{ color: "#22C55E", flexShrink: 0 }}
              />
              <div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#1D1D1F",
                    lineHeight: 1.3,
                  }}
                >
                  {label}
                </p>
                <p style={{ fontSize: 11, color: "#6E6E73", marginTop: 1 }}>
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM ROW ─────────────────────────────────────
            Desktop : 2 cột [content | sidebar]
            Mobile  : 1 cột, sidebar cards được tách ra
                      và đặt xen kẽ hợp lý
        ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_256px] gap-4 items-start md:px-0 px-4">
          {/* ── Left column ──────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {/* Description */}
            {item.description && (
              <section
                className="rounded-2xl p-5 md:p-6"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E8E8ED",
                }}
                aria-labelledby="desc-heading"
              >
                <h2 id="desc-heading" style={{ ...T.h2, marginBottom: 14 }}>
                  Mô tả sản phẩm
                </h2>
                <p
                  className="leading-relaxed"
                  style={{
                    ...T.body,
                    lineHeight: 1.75,
                    borderLeft: "3px solid #FED7AA",
                    paddingLeft: 12,
                  }}
                >
                  {item.description}
                </p>
              </section>
            )}

            {/* Mobile — Seller card (hiển thị sớm hơn trên mobile) */}
            <div
              className="flex md:hidden rounded-2xl p-4 items-center gap-4"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8E8ED",
              }}
            >
              <div className="flex-1">
                <p style={{ ...T.micro, marginBottom: 4 }}>Người bán</p>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#1D1D1F" }}>
                  EmcomerFado Inc
                </p>
                <p style={{ ...T.caption, marginTop: 2 }}>Đối tác chính thức</p>
              </div>
              {/* Hotline inline trên mobile */}
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2.5"
                style={{
                  backgroundColor: "#FFF7ED",
                  border: "1px solid #FED7AA",
                }}
              >
                <IconHeadset
                  size={16}
                  style={{ color: "#F97316", flexShrink: 0 }}
                />
                <div>
                  <p
                    style={{ fontSize: 12, fontWeight: 600, color: "#1D1D1F" }}
                  >
                    Hotline
                  </p>
                  <p
                    style={{ fontSize: 11, color: "#F97316", fontWeight: 600 }}
                  >
                    1900 1234
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <section
              className="rounded-2xl p-5 md:p-6"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8E8ED",
              }}
              aria-labelledby="benefits-heading"
            >
              <h2 id="benefits-heading" style={{ ...T.h2, marginBottom: 14 }}>
                Quyền lợi khi mua hàng
              </h2>
              <ul
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid #E8E8ED" }}
              >
                {BENEFIT_LIST.map(({ icon: Icon, text, color }, idx) => (
                  <li
                    key={text}
                    className="flex items-start gap-3 px-4 py-3.5"
                    style={{
                      backgroundColor: idx % 2 === 0 ? "#FAFAFA" : "#FFFFFF",
                      borderTop: idx > 0 ? "1px solid #F2F2F7" : "none",
                    }}
                  >
                    <Icon size={16} className={`${color} mt-0.5 shrink-0`} />
                    <span style={{ ...T.body, lineHeight: 1.6 }}>{text}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Mobile — Support links (đặt sau benefits) */}
            <div
              className="flex md:hidden flex-col rounded-2xl p-4"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8E8ED",
              }}
            >
              <p style={{ ...T.subhead, marginBottom: 12 }}>Bạn cần hỗ trợ?</p>
              <ul className="flex flex-col" style={{ gap: 2 }}>
                {SUPPORT_LINKS.map((link, idx) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="flex items-center justify-between rounded-lg transition-colors hover:bg-orange-50 hover:text-orange-500"
                      style={{
                        fontSize: 14,
                        color: "#3C3C43",
                        padding: "8px 10px",
                      }}
                    >
                      <span>{link}</span>
                      <IconChevronRight
                        size={13}
                        style={{ color: "#AEAEB2", flexShrink: 0 }}
                      />
                    </Link>
                    {idx < SUPPORT_LINKS.length - 1 && (
                      <div
                        style={{
                          height: 1,
                          backgroundColor: "#F2F2F7",
                          margin: "0 10px",
                        }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            <section
              className="rounded-2xl p-5 md:p-6"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8E8ED",
              }}
              aria-labelledby="specs-heading"
            >
              <h2 id="specs-heading" style={{ ...T.h2, marginBottom: 14 }}>
                Thông số kỹ thuật
              </h2>
              <table className="w-full border-collapse">
                <tbody>
                  {specRows.map(([label, value], idx) => (
                    <tr
                      key={label}
                      style={{
                        backgroundColor: idx % 2 === 0 ? "#FAFAFA" : "#FFFFFF",
                        borderBottom: "1px solid #F2F2F7",
                      }}
                    >
                      <td
                        className="rounded-l-lg"
                        style={{
                          fontSize: 12,
                          color: "#6E6E73",
                          padding: "11px 12px",
                          width: "40%",
                          fontWeight: 400,
                        }}
                      >
                        {label}
                      </td>
                      <td
                        className="rounded-r-lg"
                        style={{
                          fontSize: 14,
                          color: "#1D1D1F",
                          padding: "11px 12px",
                          fontWeight: 500,
                        }}
                      >
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

          {/* ── Right sidebar (desktop only) ──────────────── */}
          <aside className="hidden md:flex flex-col gap-3 sticky top-5">
            {/* Seller card */}
            <div
              className="rounded-2xl p-4"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8E8ED",
              }}
            >
              <p style={{ ...T.micro, marginBottom: 6 }}>Người bán</p>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#1D1D1F" }}>
                EmcomerFado Inc
              </p>
              <p style={{ ...T.caption, marginTop: 2 }}>Đối tác chính thức</p>
            </div>

            {/* Support links */}
            <div
              className="rounded-2xl p-4"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8E8ED",
              }}
            >
              <p style={{ ...T.subhead, marginBottom: 12 }}>Bạn cần hỗ trợ?</p>
              <ul className="flex flex-col" style={{ gap: 2 }}>
                {SUPPORT_LINKS.map((link, idx) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="flex items-center justify-between rounded-lg transition-colors hover:bg-orange-50 hover:text-orange-500"
                      style={{
                        fontSize: 14,
                        color: "#3C3C43",
                        padding: "8px 10px",
                      }}
                    >
                      <span>{link}</span>
                      <IconChevronRight
                        size={13}
                        style={{ color: "#AEAEB2", flexShrink: 0 }}
                      />
                    </Link>
                    {idx < SUPPORT_LINKS.length - 1 && (
                      <div
                        style={{
                          height: 1,
                          backgroundColor: "#F2F2F7",
                          margin: "0 10px",
                        }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Help CTA */}
            <div
              className="rounded-2xl p-4 flex items-center gap-3"
              style={{
                backgroundColor: "#FFF7ED",
                border: "1px solid #FED7AA",
              }}
            >
              <IconHeadset
                size={20}
                style={{ color: "#F97316", flexShrink: 0 }}
              />
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#1D1D1F" }}>
                  Hotline hỗ trợ
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#F97316",
                    fontWeight: 600,
                    marginTop: 2,
                  }}
                >
                  1900 1234 · 8:00–22:00
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
