import Image from "next/image";
import Link from "next/link";

const brands = [
  {
    name: "Apple",
    slug: "apple",
    image: "/brands/apple.png",
    products: "240 sản phẩm",
    gradient: "from-gray-50 to-gray-100",
    border: "hover:border-gray-300",
  },
  {
    name: "Samsung",
    slug: "samsung",
    image: "/brands/samsung.png",
    products: "380 sản phẩm",
    gradient: "from-blue-50 to-blue-100",
    border: "hover:border-blue-300",
  },
  {
    name: "Nike",
    slug: "nike",
    image: "/brands/nike.png",
    products: "520 sản phẩm",
    gradient: "from-orange-50 to-orange-100",
    border: "hover:border-orange-300",
  },
  {
    name: "Adidas",
    slug: "adidas",
    image: "/brands/adidas.png",
    products: "410 sản phẩm",
    gradient: "from-neutral-50 to-gray-100",
    border: "hover:border-gray-400",
  },
  {
    name: "Sony",
    slug: "sony",
    image: "/brands/sony.png",
    products: "190 sản phẩm",
    gradient: "from-slate-50 to-slate-100",
    border: "hover:border-slate-300",
  },
  {
    name: "Uniqlo",
    slug: "uniqlo",
    image: "/brands/uniqlo.png",
    products: "680 sản phẩm",
    gradient: "from-red-50 to-red-100",
    border: "hover:border-red-300",
  },
  {
    name: "LG",
    slug: "lg",
    image: "/brands/lg.png",
    products: "160 sản phẩm",
    gradient: "from-purple-50 to-purple-100",
    border: "hover:border-purple-300",
  },
  {
    name: "Dell",
    slug: "dell",
    image: "/brands/dell.png",
    products: "220 sản phẩm",
    gradient: "from-indigo-50 to-indigo-100",
    border: "hover:border-indigo-300",
  },
];

export default function BrandProduct() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-7 bg-orange-500 rounded-full" />
          <h2 className="text-2xl font-extrabold text-gray-900">
            Thương Hiệu Nổi Bật
          </h2>
        </div>

        <Link
          href="/brands"
          className="text-sm font-semibold text-orange-500 hover:underline"
        >
          Xem tất cả →
        </Link>
      </div>

      {/* Brand grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-5">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/brands/${brand.slug}`}
            className={`
              group
              bg-gradient-to-br ${brand.gradient}
              rounded-3xl
              p-5
              border border-transparent
              ${brand.border}
              transition-all duration-300
              hover:shadow-lg hover:-translate-y-1
              flex flex-col items-center text-center
            `}
          >
            {/* Logo */}
            <div className="relative w-16 h-16 rounded-2xl bg-white shadow-md overflow-hidden group-hover:scale-110 transition-transform">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain p-3"
              />
            </div>

            {/* Name */}
            <span className="mt-4 text-base font-bold text-gray-900">
              {brand.name}
            </span>

            {/* Products */}
            <span className="mt-1 text-xs text-gray-500">{brand.products}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
