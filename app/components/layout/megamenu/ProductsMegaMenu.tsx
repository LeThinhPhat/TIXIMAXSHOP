import Link from "next/link";

/* ===================== DATA ===================== */

const col1 = {
  title: "Bố Cục Sản Phẩm",
  items: [
    { label: "Grid 2 cột", badge: null },
    { label: "Grid 3 cột", badge: null },
    { label: "Grid 4 cột", badge: { text: "NEW", color: "bg-blue-500" } },
    { label: "Dạng danh sách", badge: null },
    {
      label: "Slider sản phẩm",
      badge: { text: "HOT", color: "bg-orange-500" },
    },
    { label: "Masonry layout", badge: null },
  ],
};

const col2 = {
  title: "Hiển Thị Đặc Biệt",
  items: [
    { label: "Sản phẩm nổi bật", badge: null },
    { label: "Hàng mới về", badge: { text: "NEW", color: "bg-blue-500" } },
    { label: "Bán chạy nhất", badge: null },
    { label: "Đánh giá cao nhất", badge: null },
    { label: "Flash Deal", badge: { text: "SALE", color: "bg-rose-500" } },
    { label: "Combo tiết kiệm", badge: null },
  ],
};

const col3 = {
  title: "Tính Năng SP",
  items: [
    { label: "Quick View", badge: null },
    { label: "So sánh SP", badge: null },
    { label: "Wishlist", badge: null },
    {
      label: "Hover gallery",
      badge: { text: "FEATURED", color: "bg-purple-500" },
    },
    { label: "Zoom hình ảnh", badge: null },
    { label: "360° xem SP", badge: { text: "NEW", color: "bg-blue-500" } },
  ],
};

const topProducts = [
  { name: "iPhone 15 Pro", price: "28.990k", emoji: "📱" },
  { name: "Nike Air Max", price: "2.490k", emoji: "👟" },
  { name: "Sony WH-1000", price: "6.490k", emoji: "🎧" },
];

/* ===================== COMPONENT ===================== */

export default function ProductsMegaMenu() {
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
        grid grid-cols-4 gap-6
      "
    >
      {/* COL 1 */}
      <div>
        <h4 className="mb-5 pb-3 border-b border-gray-100 text-sm font-black uppercase tracking-widest text-gray-950">
          {col1.title}
        </h4>

        <ul className="space-y-3">
          {col1.items.map((item) => (
            <li key={item.label}>
              <Link
                href="#"
                className="flex items-center gap-2 text-[15px] font-medium text-gray-600 hover:text-gray-950 transition-colors"
              >
                <span>{item.label}</span>

                {item.badge && (
                  <span
                    className={`
                      ${item.badge.color}
                      text-white text-[10px] font-black
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

      {/* COL 2 */}
      <div>
        <h4 className="mb-5 pb-3 border-b border-gray-100 text-sm font-black uppercase tracking-widest text-gray-950">
          {col2.title}
        </h4>

        <ul className="space-y-3">
          {col2.items.map((item) => (
            <li key={item.label}>
              <Link
                href="#"
                className="flex items-center gap-2 text-[15px] font-medium text-gray-600 hover:text-gray-950 transition-colors"
              >
                <span>{item.label}</span>

                {item.badge && (
                  <span
                    className={`
                      ${item.badge.color}
                      text-white text-[10px] font-black
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

      {/* COL 3 */}
      <div>
        <h4 className="mb-5 pb-3 border-b border-gray-100 text-sm font-black uppercase tracking-widest text-gray-950">
          {col3.title}
        </h4>

        <ul className="space-y-3">
          {col3.items.map((item) => (
            <li key={item.label}>
              <Link
                href="#"
                className="flex items-center gap-2 text-[15px] font-medium text-gray-600 hover:text-gray-950 transition-colors"
              >
                <span>{item.label}</span>

                {item.badge && (
                  <span
                    className={`
                      ${item.badge.color}
                      text-white text-[10px] font-black
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

      {/* COL 4 – TOP PRODUCTS */}
      <div>
        <h4 className="mb-5 pb-3 border-b border-gray-100 text-sm font-black uppercase tracking-widest text-gray-950">
          Sản Phẩm Hot
        </h4>

        <div className="space-y-3">
          {topProducts.map((p) => (
            <Link
              key={p.name}
              href="#"
              className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">
                {p.emoji}
              </div>

              <div>
                <p className="text-[15px] font-medium text-gray-950">
                  {p.name}
                </p>
                <p className="text-sm font-black text-orange-500">{p.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6 bg-gray-950 p-5 text-center">
          <p className="text-white text-sm font-bold mb-2">
            Xem toàn bộ sản phẩm
          </p>
          <Link
            href="#"
            className="text-orange-400 text-[13px] font-black uppercase tracking-widest hover:text-orange-300 transition-colors"
          >
            Shop ngay →
          </Link>
        </div>
      </div>
    </div>
  );
}
