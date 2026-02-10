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
    color: "bg-gray-950 hover:bg-gray-800",
    iconBg: "bg-gray-800",
    special: true,
  },
];

export default function CategoryProduct() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
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

      {/* Category grid */}
      <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href="#"
            className={`${cat.color} rounded-xl p-3 flex flex-col items-center gap-2 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group`}
          >
            <div
              className={`${cat.iconBg} ${cat.special ? "bg-gray-700" : ""} w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm`}
            >
              {cat.icon}
            </div>
            <span
              className={`text-xs font-bold text-center leading-tight ${cat.special ? "text-white" : "text-gray-800"}`}
            >
              {cat.name}
            </span>
            <span
              className={`text-[10px] ${cat.special ? "text-gray-400" : "text-gray-500"} text-center`}
            >
              {cat.count}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
