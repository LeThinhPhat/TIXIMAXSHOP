import Image from "next/image";
import Link from "next/link";

/* ================== Fake Data ================== */

const topPosts = [
  { image: "/blog/top-01.jpg" },
  { image: "/blog/top-02.jpg" },
  { image: "/blog/top-03.jpg" },
];

const featuredPost = {
  title: "Hướng dẫn tạo mục lục cho bài viết dài",
  date: "28 Tháng 6, 2022",
  image: "/blog/featured.jpg",
  excerpt:
    "Mục lục giúp bài viết trở nên rõ ràng, dễ theo dõi hơn và cải thiện trải nghiệm người đọc. Bài viết này hướng dẫn cách tạo mục lục đơn giản, hiệu quả và thân thiện với SEO.",
};

const otherPosts = [
  {
    title: "24 tác phẩm xuất sắc được vinh danh tại Giải thưởng Sách Quốc gia",
    date: "26 Tháng 11, 2021",
    image: "/blog/post-01.jpg",
  },
  {
    title:
      "Khuyến khích doanh nhân viết sách để lan tỏa tri thức và kinh nghiệm",
    date: "25 Tháng 11, 2021",
    image: "/blog/post-02.jpg",
  },
  {
    title: "Nhận thức mới về bảo vệ chủ quyền quốc gia trên không gian mạng",
    date: "25 Tháng 11, 2021",
    image: "/blog/post-03.jpg",
  },
  {
    title: "Những cuốn sách đoạt Giải thưởng Sách Quốc gia lần thứ tư",
    date: "16 Tháng 11, 2021",
    image: "/blog/post-04.jpg",
  },
];

/* ================== Component ================== */

export default function Blog() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      {/* ===== BÀI VIẾT NỔI BẬT ===== */}
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Bài viết nổi bật
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topPosts.map((post, index) => (
          <div key={index} className="relative h-56 rounded-xl overflow-hidden">
            <Image
              src={post.image}
              alt="Bài viết nổi bật"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* ===== ĐƯỜNG KẺ NGANG 4px ===== */}
      <div className="my-12 h-[4px] bg-black" />

      {/* ===== NỘI DUNG CHÍNH ===== */}
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ===== ĐƯỜNG KẺ DỌC 4px ===== */}
        <div className="hidden lg:block absolute top-0 bottom-0 left-2/3 w-[2px] bg-black" />

        {/* ===== BÀI VIẾT MỚI NHẤT ===== */}
        <div className="lg:col-span-2 pr-10">
          <h3 className="text-lg font-semibold mb-5">Bài viết mới nhất</h3>

          <div className="rounded-xl overflow-hidden">
            <div className="relative h-80">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <p className="text-xs text-gray-600 mb-2 uppercase tracking-wide">
                {featuredPost.date}
              </p>

              <h4 className="text-xl font-semibold leading-snug mb-4">
                {featuredPost.title}
              </h4>

              <p className="text-sm text-gray-700 leading-relaxed">
                {featuredPost.excerpt}
              </p>
            </div>
          </div>
        </div>

        {/* ===== BÀI VIẾT KHÁC ===== */}
        <div className="pl-10">
          <h3 className="text-lg font-semibold mb-5">Bài viết khác</h3>

          <div className="space-y-6">
            {otherPosts.map((post, index) => (
              <div key={index}>
                <Link href="#" className="flex gap-4 group">
                  <div className="relative w-28 h-20 rounded-md overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-medium leading-snug group-hover:text-orange-500 line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">{post.date}</p>
                  </div>
                </Link>

                {/* ===== ĐƯỜNG KẺ PHÂN BÀI VIẾT 4px ===== */}
                {index !== otherPosts.length - 1 && (
                  <div className="mt-5 h-[2px] bg-black" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
