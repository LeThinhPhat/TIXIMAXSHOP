import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: string;
  discount: string;
  image: string;
};

const tabs: string[] = [
  "Kính mát nam",
  "Kính mát nữ",
  "Kính Unisex",
  "Ray-Ban",
  "Gentle Monster",
];

const products: Product[] = [
  {
    id: 1,
    name: "Ray-Ban Original Wayfarer Classic RB2140",
    price: "3,250,000 đ",
    discount: "-35%",
    image: "/glasses/glass-1.png",
  },
  {
    id: 2,
    name: "Gentle Monster South Side 01 Black",
    price: "4,890,000 đ",
    discount: "-25%",
    image: "/glasses/glass-2.png",
  },
  {
    id: 3,
    name: "Police SPLA59 Polarized Sunglasses",
    price: "2,150,000 đ",
    discount: "-40%",
    image: "/glasses/glass-3.png",
  },
  {
    id: 4,
    name: "Oakley Holbrook Classic Matte Black",
    price: "3,690,000 đ",
    discount: "-30%",
    image: "/glasses/glass-4.png",
  },
  {
    id: 5,
    name: "Gucci GG0061S Oversized Sunglasses",
    price: "6,400,000 đ",
    discount: "-20%",
    image: "/glasses/glass-5.png",
  },
];

export default function FormGlassProduct() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 border-b">
      {/* Tabs header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-8">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`text-sm font-semibold pb-2 border-b-2 transition-all
                ${
                  index === 0
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-black"
                }`}
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
          <Link key={product.id} href="#" className="group block">
            {/* Image */}
            <div className="relative aspect-[4/3]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />

              {/* Discount badge */}
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
