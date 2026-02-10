import Link from "next/link";

const categories = [
  {
    name: "Điện thoại",
    icon: "📱",
    count: "1.2k sản phẩm",
    color: "bg-blue-50 hover:bg-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    name: "Laptop",
    icon: "💻",
    count: "840 sản phẩm",
    color: "bg-indigo-50 hover:bg-indigo-100",
    iconBg: "bg-indigo-100",
  },
  {
    name: "Thời trang",
    icon: "👗",
    count: "5.6k sản phẩm",
    color: "bg-pink-50 hover:bg-pink-100",
    iconBg: "bg-pink-100",
  },
  {
    name: "Làm đẹp",
    icon: "💄",
    count: "2.3k sản phẩm",
    color: "bg-rose-50 hover:bg-rose-100",
    iconBg: "bg-rose-100",
  },
  {
    name: "Nhà cửa",
    icon: "🏠",
    count: "3.1k sản phẩm",
    color: "bg-amber-50 hover:bg-amber-100",
    iconBg: "bg-amber-100",
  },
  {
    name: "Thể thao",
    icon: "⚽",
    count: "980 sản phẩm",
    color: "bg-green-50 hover:bg-green-100",
    iconBg: "bg-green-100",
  },
  {
    name: "Sách",
    icon: "📚",
    count: "4.2k sản phẩm",
    color: "bg-orange-50 hover:bg-orange-100",
    iconBg: "bg-orange-100",
  },
  {
    name: "Đồ chơi",
    icon: "🧸",
    count: "1.8k sản phẩm",
    color: "bg-yellow-50 hover:bg-yellow-100",
    iconBg: "bg-yellow-100",
  },
  {
    name: "Thực phẩm",
    icon: "🍎",
    count: "2.7k sản phẩm",
    color: "bg-red-50 hover:bg-red-100",
    iconBg: "bg-red-100",
  },
  {
    name: "Xem tất cả",
    icon: "🔍",
    count: "20k+ sản phẩm",
    special: true,
  },
];

export default function CategoryProduct() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-orange-500 rounded-full" />
          <h2 className="text-xl font-black text-gray-950">
            Danh Mục Sản Phẩm
          </h2>
        </div>

        <Link
          href="#"
          className="text-sm font-semibold text-orange-500 hover:underline"
        >
          Xem tất cả →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href="#"
            className={`
              group rounded-2xl p-4 flex flex-col items-center text-center
              transition-all duration-200
              hover:-translate-y-1 hover:shadow-lg
              ${
                cat.special
                  ? "bg-gray-950 hover:bg-gray-800"
                  : `${cat.color} border border-gray-100`
              }
            `}
          >
            {/* Icon */}
            <div
              className={`
                w-14 h-14 rounded-2xl flex items-center justify-center
                text-2xl shadow-sm mb-2
                ${cat.special ? "bg-gray-800 text-white" : cat.iconBg}
              `}
            >
              {cat.icon}
            </div>

            {/* Name */}
            <span
              className={`
                text-sm font-bold leading-tight
                ${cat.special ? "text-white" : "text-gray-900"}
              `}
            >
              {cat.name}
            </span>

            {/* Count */}
            <span
              className={`
                text-[11px] mt-0.5
                ${cat.special ? "text-gray-400" : "text-gray-500"}
              `}
            >
              {cat.count}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
