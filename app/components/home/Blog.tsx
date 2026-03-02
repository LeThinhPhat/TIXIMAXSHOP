// "use client";

// import { useRef, useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";

// /* ================== Fake Data ================== */

// const topPosts = [
//   { image: "/blog/top-01.jpg" },
//   { image: "/blog/top-02.jpg" },
//   { image: "/blog/top-03.jpg" },
// ];

// const featuredPost = {
//   title: "Hướng dẫn tạo mục lục cho bài viết dài",
//   date: "28 Tháng 6, 2022",
//   image: "/blog/featured.jpg",
//   excerpt:
//     "Mục lục giúp bài viết trở nên rõ ràng, dễ theo dõi hơn và cải thiện trải nghiệm người đọc. Bài viết này hướng dẫn cách tạo mục lục đơn giản, hiệu quả và thân thiện với SEO.",
// };

// const otherPosts = [
//   {
//     title: "24 tác phẩm xuất sắc được vinh danh tại Giải thưởng Sách Quốc gia",
//     date: "26 Tháng 11, 2021",
//     image: "/blog/post-01.jpg",
//   },
//   {
//     title:
//       "Khuyến khích doanh nhân viết sách để lan tỏa tri thức và kinh nghiệm",
//     date: "25 Tháng 11, 2021",
//     image: "/blog/post-02.jpg",
//   },
//   {
//     title: "Nhận thức mới về bảo vệ chủ quyền quốc gia trên không gian mạng",
//     date: "25 Tháng 11, 2021",
//     image: "/blog/post-03.jpg",
//   },
//   {
//     title: "Những cuốn sách đoạt Giải thưởng Sách Quốc gia lần thứ tư",
//     date: "16 Tháng 11, 2021",
//     image: "/blog/post-04.jpg",
//   },
// ];

// /* ===================== SCROLL DOTS ===================== */

// function ScrollDots({ total, active }: { total: number; active: number }) {
//   return (
//     <div className="flex items-center justify-center gap-1.5 mt-5 md:hidden">
//       {Array.from({ length: total }).map((_, i) => (
//         <span
//           key={i}
//           className="block rounded-full transition-all duration-300"
//           style={{
//             width: i === active ? 20 : 6,
//             height: 6,
//             background: i === active ? "#111" : "#e5e7eb",
//           }}
//         />
//       ))}
//     </div>
//   );
// }

// /* ================== Component ================== */

// export default function Blog() {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     const el = scrollRef.current;
//     if (!el) return;

//     const handleScroll = () => {
//       const cardWidth = el.scrollWidth / topPosts.length;
//       const index = Math.round(el.scrollLeft / cardWidth);
//       setActiveIndex(Math.min(index, topPosts.length - 1));
//     };

//     el.addEventListener("scroll", handleScroll, { passive: true });
//     return () => el.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       <style>{`
//         .scroll-hide::-webkit-scrollbar { display: none; }
//         .scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>

//       <section className="max-w-7xl mx-auto px-4 py-14">
//         {/* ===== BÀI VIẾT NỔI BẬT ===== */}
//         <h2 className="text-xl font-semibold text-gray-900 mb-6">
//           Bài viết nổi bật
//         </h2>

//         {/* MOBILE: Horizontal Scroll */}
//         <div className="md:hidden">
//           <div
//             ref={scrollRef}
//             className="scroll-hide flex gap-4 overflow-x-auto pb-2"
//             style={{
//               scrollSnapType: "x mandatory",
//               WebkitOverflowScrolling: "touch",
//               paddingRight: 32,
//             }}
//           >
//             {topPosts.map((post, index) => (
//               <div
//                 key={index}
//                 className="flex-shrink-0 relative h-52 rounded-xl overflow-hidden"
//                 style={{
//                   width: "78vw",
//                   maxWidth: 320,
//                   scrollSnapAlign: "start",
//                 }}
//               >
//                 <Image
//                   src={post.image}
//                   alt="Bài viết nổi bật"
//                   fill
//                   className="object-cover transition-transform duration-300 hover:scale-105"
//                 />
//               </div>
//             ))}
//           </div>

//           <ScrollDots total={topPosts.length} active={activeIndex} />
//         </div>

//         {/* DESKTOP: Grid 3 cột */}
//         <div className="hidden md:grid grid-cols-3 gap-6">
//           {topPosts.map((post, index) => (
//             <div
//               key={index}
//               className="relative h-56 rounded-xl overflow-hidden"
//             >
//               <Image
//                 src={post.image}
//                 alt="Bài viết nổi bật"
//                 fill
//                 className="object-cover transition-transform duration-300 hover:scale-105"
//               />
//             </div>
//           ))}
//         </div>

//         {/* ===== ĐƯỜNG KẺ NGANG 4px ===== */}
//         <div className="my-12 h-[4px] bg-black" />

//         {/* ===== NỘI DUNG CHÍNH ===== */}
//         <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-10">
//           {/* ===== ĐƯỜNG KẺ DỌC 4px ===== */}
//           <div className="hidden lg:block absolute top-0 bottom-0 left-2/3 w-[2px] bg-black" />

//           {/* ===== BÀI VIẾT MỚI NHẤT ===== */}
//           <div className="lg:col-span-2 pr-10">
//             <h3 className="text-lg font-semibold mb-5">Bài viết mới nhất</h3>

//             <div className="rounded-xl overflow-hidden">
//               <div className="relative h-80">
//                 <Image
//                   src={featuredPost.image}
//                   alt={featuredPost.title}
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <div className="p-6">
//                 <p className="text-xs text-gray-600 mb-2 uppercase tracking-wide">
//                   {featuredPost.date}
//                 </p>

//                 <h4 className="text-xl font-semibold leading-snug mb-4">
//                   {featuredPost.title}
//                 </h4>

//                 <p className="text-sm text-gray-700 leading-relaxed">
//                   {featuredPost.excerpt}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* ===== BÀI VIẾT KHÁC ===== */}
//           <div className="pl-10">
//             <h3 className="text-lg font-semibold mb-5">Bài viết khác</h3>

//             <div className="space-y-6">
//               {otherPosts.map((post, index) => (
//                 <div key={index}>
//                   <Link href="#" className="flex gap-4 group">
//                     <div className="relative w-28 h-20 rounded-md overflow-hidden">
//                       <Image
//                         src={post.image}
//                         alt={post.title}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>

//                     <div>
//                       <h4 className="text-sm font-medium leading-snug group-hover:text-orange-500 line-clamp-2">
//                         {post.title}
//                       </h4>
//                       <p className="text-xs text-gray-600 mt-1">{post.date}</p>
//                     </div>
//                   </Link>

//                   {index !== otherPosts.length - 1 && (
//                     <div className="mt-5 h-[2px] bg-black" />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { topPosts, featuredPost, otherPosts } from "@/app/data/blogData";

const INITIAL_COUNT = 4;
const LOAD_MORE_COUNT = 4;

/* ===================== SCROLL DOTS ===================== */
function ScrollDots({ total, active }: { total: number; active: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5 mt-5 md:hidden">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="block rounded-full transition-all duration-300"
          style={{
            width: i === active ? 20 : 6,
            height: 6,
            background: i === active ? "#111" : "#e5e7eb",
          }}
        />
      ))}
    </div>
  );
}

/* ================== Component ================== */
export default function Blog() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visiblePosts = otherPosts.slice(0, visibleCount);
  const hasMore = visibleCount < otherPosts.length;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const cardWidth = el.scrollWidth / topPosts.length;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, topPosts.length - 1));
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .scroll-hide::-webkit-scrollbar { display: none; }
        .scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .post-item { animation: fadeSlideIn 0.3s ease both; }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="max-w-7xl mx-auto px-4 py-14">
        {/* ===== BÀI VIẾT NỔI BẬT ===== */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Bài viết nổi bật
        </h2>

        {/* MOBILE */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            className="scroll-hide flex gap-4 overflow-x-auto pb-2"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              paddingRight: 32,
            }}
          >
            {topPosts.map((post, index) => (
              <Link
                key={index}
                href={`/blog/${post.slug}`}
                className="flex-shrink-0 relative h-52 rounded-xl overflow-hidden block"
                style={{
                  width: "78vw",
                  maxWidth: 320,
                  scrollSnapAlign: "start",
                }}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>
            ))}
          </div>
          <ScrollDots total={topPosts.length} active={activeIndex} />
        </div>

        {/* DESKTOP */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {topPosts.map((post, index) => (
            <Link
              key={index}
              href={`/blog/${post.slug}`}
              className="relative h-56 rounded-xl overflow-hidden block"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>
          ))}
        </div>

        <div className="my-12 h-[4px] bg-black" />

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="hidden lg:block absolute top-0 bottom-0 left-2/3 w-[2px] bg-black" />

          {/* BÀI VIẾT MỚI NHẤT */}
          <div className="lg:col-span-2 pr-10">
            <h3 className="text-lg font-semibold mb-5">Bài viết mới nhất</h3>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="block rounded-xl overflow-hidden group"
            >
              <div className="relative h-80">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-600 mb-2 uppercase tracking-wide">
                  {featuredPost.date}
                </p>
                <h4 className="text-xl font-semibold leading-snug mb-4 group-hover:text-orange-500 transition-colors">
                  {featuredPost.title}
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>
            </Link>
          </div>

          {/* BÀI VIẾT KHÁC */}
          <div className="pl-10">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold">Bài viết khác</h3>
              <span className="text-xs text-gray-400">
                {visibleCount}/{otherPosts.length} bài
              </span>
            </div>

            <div className="space-y-6">
              {visiblePosts.map((post, index) => (
                <div
                  key={post.slug}
                  className="post-item"
                  style={{
                    animationDelay: `${(index % LOAD_MORE_COUNT) * 60}ms`,
                  }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex gap-4 group"
                  >
                    <div className="relative w-28 h-20 flex-shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium leading-snug group-hover:text-orange-500 line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">{post.date}</p>
                    </div>
                  </Link>
                  {index !== visiblePosts.length - 1 && (
                    <div className="mt-5 h-[2px] bg-black" />
                  )}
                </div>
              ))}
            </div>

            {hasMore && (
              <button
                onClick={() =>
                  setVisibleCount((p) =>
                    Math.min(p + LOAD_MORE_COUNT, otherPosts.length),
                  )
                }
                className="mt-7 w-full py-2.5 border-2 border-black text-sm font-semibold rounded-lg hover:bg-black hover:text-white transition-colors duration-200"
              >
                Xem thêm ({otherPosts.length - visibleCount} bài)
              </button>
            )}
            {!hasMore && visibleCount > INITIAL_COUNT && (
              <button
                onClick={() => setVisibleCount(INITIAL_COUNT)}
                className="mt-7 w-full py-2.5 border-2 border-gray-300 text-sm font-medium rounded-lg text-gray-500 hover:border-black hover:text-black transition-colors duration-200"
              >
                Thu gọn
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
