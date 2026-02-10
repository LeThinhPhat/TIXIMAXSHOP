import Link from "next/link";

/* ===================== DATA ===================== */

const dealTypes = [
  {
    label: "Flash Sale",
    badge: { text: "LIVE", color: "bg-red-500" },
    desc: "Kết thúc sau 02:45:30",
  },
  { label: "Deal Cuối Tuần", badge: null, desc: "Giảm đến 50%" },
  {
    label: "Mua 1 Tặng 1",
    badge: { text: "HOT", color: "bg-orange-500" },
    desc: "Số lượng có hạn",
  },
  { label: "Combo Tiết Kiệm", badge: null, desc: "Tiết kiệm hơn 30%" },
  {
    label: "Clearance Sale",
    badge: { text: "SALE", color: "bg-rose-500" },
    desc: "Hàng tồn kho",
  },
  {
    label: "Deal Thành Viên",
    badge: { text: "VIP", color: "bg-purple-500" },
    desc: "Dành cho thành viên",
  },
];

const dealsByCategory = [
  {
    category: "Điện tử",
    discount: "Đến -40%",
    emoji: "📱",
    color: "bg-blue-50 border-blue-100",
  },
  {
    category: "Thời trang",
    discount: "Đến -60%",
    emoji: "👗",
    color: "bg-pink-50 border-pink-100",
  },
  {
    category: "Làm đẹp",
    discount: "Đến -35%",
    emoji: "💄",
    color: "bg-rose-50 border-rose-100",
  },
  {
    category: "Nhà cửa",
    discount: "Đến -45%",
    emoji: "🏠",
    color: "bg-amber-50 border-amber-100",
  },
];

/* ===================== COMPONENT ===================== */

export default function TopDealsMegaMenu() {
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
      <div className="grid grid-cols-3 gap-6">
        {/* COL 1 – DEAL TYPES */}
        <div>
          <h4 className="mb-5 pb-3 border-b border-gray-100 text-sm font-black uppercase tracking-widest text-gray-950">
            Loại Deal
          </h4>

          <ul className="space-y-3">
            {dealTypes.map((deal) => (
              <li key={deal.label}>
                <Link
                  href="#"
                  className="block group hover:bg-gray-50 p-2 transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-medium text-gray-600 group-hover:text-gray-950 transition-colors">
                      {deal.label}
                    </span>

                    {deal.badge && (
                      <span
                        className={`
                          ${deal.badge.color}
                          text-white text-[10px] font-black
                          px-2 py-0.5
                          tracking-wider
                        `}
                      >
                        {deal.badge.text}
                      </span>
                    )}
                  </div>

                  <span className="block text-sm text-gray-400">
                    {deal.desc}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 2 – DEAL BY CATEGORY */}
        <div>
          <h4 className="mb-5 pb-3 border-b border-gray-100 text-sm font-black uppercase tracking-widest text-gray-950">
            Deal Theo Danh Mục
          </h4>

          <div className="grid grid-cols-2 gap-4">
            {dealsByCategory.map((item) => (
              <Link
                key={item.category}
                href="#"
                className={`
                  ${item.color}
                  border
                  p-4
                  flex flex-col items-center gap-1
                  hover:shadow-sm
                  transition-shadow
                `}
              >
                <span className="text-2xl">{item.emoji}</span>

                <span className="text-[15px] font-medium text-gray-950">
                  {item.category}
                </span>

                <span className="text-[13px] font-black text-orange-500">
                  {item.discount}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* COL 3 – COUNTDOWN + PROMO */}
        <div className="flex flex-col gap-6">
          {/* Countdown */}
          <div className="bg-gray-950 p-5 text-center">
            <span className="text-[11px] font-black uppercase tracking-wider text-orange-400">
              ⚡ Flash Sale Đang Diễn Ra
            </span>

            <div className="flex justify-center gap-2 mt-4">
              {["02", "45", "30"].map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="bg-white w-10 h-10 flex items-center justify-center">
                    <span className="text-lg font-black text-gray-950">
                      {t}
                    </span>
                  </div>
                  {i < 2 && (
                    <span className="text-white font-black text-lg">:</span>
                  )}
                </div>
              ))}
            </div>

            <p className="text-gray-400 text-xs mt-2">Giờ : Phút : Giây</p>

            <Link
              href="#"
              className="
                inline-block mt-4
                bg-orange-500 hover:bg-orange-400
                text-white text-[13px] font-black
                px-6 py-2
                transition-colors
              "
            >
              Xem Flash Sale →
            </Link>
          </div>

          {/* Promo Banner */}
          <div className="flex-1 border border-orange-100 bg-orange-50 p-6 flex flex-col justify-between">
            <div>
              <span className="inline-block text-[11px] font-black tracking-wider bg-rose-500 text-white px-3 py-1">
                HOT DEAL
              </span>

              <p className="text-2xl font-black text-gray-950 mt-3 leading-tight">
                Giảm đến
                <br />
                <span className="text-orange-500">70% OFF</span>
              </p>
            </div>

            <Link
              href="#"
              className="
                text-[14px] font-black uppercase tracking-widest
                text-gray-950
                border-b-2 border-gray-950
                hover:text-orange-500 hover:border-orange-500
                transition-colors
                w-fit
              "
            >
              Shop now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
