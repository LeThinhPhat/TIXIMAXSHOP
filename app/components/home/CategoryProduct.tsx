import Link from "next/link";

const categories = [
  {
    name: "Điện thoại",
    icon: "📱",
    count: "1.2k products",
    iconBg: "bg-blue-100",
  },
  {
    name: "Laptop",
    icon: "💻",
    count: "840 products",
    iconBg: "bg-indigo-100",
  },
  {
    name: "Thời trang",
    icon: "👗",
    count: "5.6k products",
    iconBg: "bg-pink-100",
  },
  {
    name: "Làm đẹp",
    icon: "💄",
    count: "2.3k products",
    iconBg: "bg-rose-100",
  },
  {
    name: "Nhà cửa",
    icon: "🏠",
    count: "3.1k products",
    iconBg: "bg-amber-100",
  },
  {
    name: "Thể thao",
    icon: "⚽",
    count: "980 products",
    iconBg: "bg-green-100",
  },
  { name: "Sách", icon: "📚", count: "4.2k products", iconBg: "bg-orange-100" },
  {
    name: "Đồ chơi",
    icon: "🧸",
    count: "1.8k products",
    iconBg: "bg-yellow-100",
  },
  {
    name: "Thực phẩm",
    icon: "🍎",
    count: "2.7k products",
    iconBg: "bg-red-100",
  },
  { name: "View all", icon: "🔍", count: "20k+ products", special: true },
];

export default function CategoryProduct() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-orange-500 rounded-full" />
          <h2 className="text-xl font-semibold text-gray-900">
            Product Categories
          </h2>
        </div>

        <Link
          href="#"
          className="text-sm font-semibold px-4 py-1.5 rounded-full
            bg-orange-500 text-white hover:bg-orange-600 transition"
        >
          View all
        </Link>
      </div>

      {/* ===== Grid ===== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href="#"
            className={`group rounded-xl p-4 flex flex-col items-center text-center
              transition-all duration-200 hover:-translate-y-1 hover:shadow-md
              ${
                cat.special
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-orange-50 hover:bg-orange-100"
              }`}
          >
            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center
                text-xl mb-3
                ${cat.special ? "bg-white/20 text-white" : cat.iconBg}`}
            >
              {cat.icon}
            </div>

            {/* Name */}
            <span
              className={`text-sm font-medium leading-snug
                ${cat.special ? "text-white" : "text-gray-900"}`}
            >
              {cat.name}
            </span>

            {/* Count */}
            <span
              className={`text-xs mt-1 font-semibold
                ${cat.special ? "text-orange-100" : "text-orange-500"}`}
            >
              {cat.count}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
