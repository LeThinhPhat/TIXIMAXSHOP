import Image from "next/image";
import Link from "next/link";

const brands = [
  {
    name: "Apple",
    slug: "apple",
    image: "/brands/apple.png",
    products: "240 products",
    gradient: "from-gray-50 to-gray-100",
    border: "hover:border-gray-300",
  },
  {
    name: "Samsung",
    slug: "samsung",
    image: "/brands/samsung.png",
    products: "380 products",
    gradient: "from-orange-50 to-orange-100",
    border: "hover:border-orange-300",
  },
  {
    name: "Nike",
    slug: "nike",
    image: "/brands/nike.png",
    products: "520 products",
    gradient: "from-gray-50 to-gray-100",
    border: "hover:border-gray-300",
  },
  {
    name: "Adidas",
    slug: "adidas",
    image: "/brands/adidas.png",
    products: "410 products",
    gradient: "from-orange-50 to-orange-100",
    border: "hover:border-orange-300",
  },
  {
    name: "Sony",
    slug: "sony",
    image: "/brands/sony.png",
    products: "190 products",
    gradient: "from-gray-50 to-gray-100",
    border: "hover:border-gray-300",
  },
  {
    name: "Uniqlo",
    slug: "uniqlo",
    image: "/brands/uniqlo.png",
    products: "680 products",
    gradient: "from-orange-50 to-orange-100",
    border: "hover:border-orange-300",
  },
  {
    name: "LG",
    slug: "lg",
    image: "/brands/lg.png",
    products: "160 products",
    gradient: "from-gray-50 to-gray-100",
    border: "hover:border-gray-300",
  },
  {
    name: "Dell",
    slug: "dell",
    image: "/brands/dell.png",
    products: "220 products",
    gradient: "from-orange-50 to-orange-100",
    border: "hover:border-orange-300",
  },
];

export default function BrandProduct() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-orange-500 rounded-full" />
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">
            Featured Brands
          </h2>
        </div>

        <Link
          href="/brands"
          className="text-sm font-medium text-orange-500 hover:underline"
        >
          View all →
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
              rounded-2xl
              p-4
              border border-transparent
              ${brand.border}
              transition-all duration-200
              hover:shadow-md hover:-translate-y-1
              flex flex-col items-center text-center
            `}
          >
            {/* Logo */}
            <div className="relative w-16 h-16 rounded-xl bg-white shadow-sm overflow-hidden group-hover:scale-105 transition-transform">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain p-3"
              />
            </div>

            {/* Name */}
            <span className="mt-3 text-sm font-medium text-gray-900 leading-snug">
              {brand.name}
            </span>

            {/* Products */}
            <span className="mt-0.5 text-xs text-gray-500 tracking-wide">
              {brand.products}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
