import Image from "next/image";
import Link from "next/link";

const tabs = [
  "Đồng hồ nam",
  "Đồng hồ nữ",
  "Đồng hồ Unisex",
  "Đồng hồ Tissot",
  "Đồng hồ Hamilton",
];

const products = [
  {
    id: 1,
    name: "Hampton Black Dial Men's Gift Set AX7101",
    price: "4,779,487 đ",
    discount: "-33%",
    image: "/watches/watch-1.png",
  },
  {
    id: 2,
    name: "Đồng hồ nam Maquina Quartz mặt số xanh 96B407",
    price: "9,400,874 đ",
    discount: "-48%",
    image: "/watches/watch-2.png",
  },
  {
    id: 3,
    name: "Signature Blue Dial Brown Leather Men's Watch SKW6355",
    price: "2,416,854 đ",
    discount: "-43%",
    image: "/watches/watch-3.png",
  },
  {
    id: 4,
    name: "Đồng hồ nam mặt đen Quartz BI5052-59E",
    price: "3,866,322 đ",
    discount: "-43%",
    image: "/watches/watch-4.png",
  },
  {
    id: 5,
    name: "Neutra Chronograph Quartz Black Dial Men's Watch FS6093",
    price: "3,680,038 đ",
    discount: "-38%",
    image: "/watches/watch-5.png",
  },
];

export default function FormWatchProduct() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 border-b">
      {/* Tabs */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-8">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`text-sm font-semibold pb-2 border-b-2 transition
                ${
                  index === 0
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-black"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        <Link
          href="#"
          className="text-sm font-semibold px-4 py-1.5 border rounded-full hover:bg-black hover:text-white transition"
        >
          Xem tất cả
        </Link>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        {products.map((product) => (
          <Link key={product.id} href="#" className="group">
            {/* Image */}
            <div className="relative aspect-[3/4]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />

              {/* Discount */}
              <span className="absolute bottom-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {product.discount}
              </span>
            </div>

            {/* Info */}
            <div className="mt-4 space-y-2">
              <h3 className="text-sm leading-snug text-gray-900 group-hover:underline">
                {product.name}
              </h3>
              <p className="text-base font-bold text-black">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
