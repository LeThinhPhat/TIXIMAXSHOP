// app/data/products.ts

export type Review = {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
};

export type RatingStat = {
  label: string;
  pct: number;
};

export type Product = {
  id: number;
  name: string;
  price: string;
  oldPrice: string;
  sold: string;
  category: string;
  country: string;
  image: string;
  description: string;
  reviews?: Review[];
  ratingStats?: RatingStat[];
};

export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/* ── SHARED DEFAULT REVIEWS (dùng khi product không có reviews riêng) ── */

export const defaultReviews: Review[] = [
  {
    id: 1,
    name: "Nguyễn Minh Tuấn",
    avatar: "N",
    rating: 5,
    date: "12/02/2025",
    comment:
      "Sản phẩm rất tốt, đúng mô tả, giao hàng nhanh. Sẽ ủng hộ shop dài dài!",
    verified: true,
  },
  {
    id: 2,
    name: "Trần Thị Lan",
    avatar: "T",
    rating: 4,
    date: "08/02/2025",
    comment:
      "Chất lượng ổn, đóng gói cẩn thận. Trừ 1 sao vì giao hơi chậm so với dự kiến.",
    verified: true,
  },
  {
    id: 3,
    name: "Lê Văn Hùng",
    avatar: "L",
    rating: 5,
    date: "01/02/2025",
    comment:
      "Mua lần 2 rồi, lần nào cũng hài lòng. Giá tốt hơn nhiều ngoài thị trường.",
    verified: false,
  },
];

export const defaultRatingStats: RatingStat[] = [
  { label: "Sản phẩm chất lượng", pct: 98 },
  { label: "Nhân viên hỗ trợ", pct: 79 },
  { label: "Giá tốt", pct: 77 },
  { label: "Giao hàng đúng hẹn", pct: 86 },
];

/* ── PRODUCTS ── */

export const products: Product[] = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Noise Cancelling Headphones",
    price: "6.490.000đ",
    oldPrice: "8.990.000đ",
    sold: "1.2k",
    category: "Điện tử",
    country: "Nhật",
    image: "/image/sony-xm5.jpg",
    description:
      "Tai nghe chống ồn hàng đầu từ Sony với công nghệ ANC tiên tiến, âm thanh Hi-Res, thời lượng pin 30 giờ.",
    reviews: [
      {
        id: 1,
        name: "Phạm Quốc Bảo",
        avatar: "P",
        rating: 5,
        date: "20/01/2025",
        comment:
          "Âm thanh cực kỳ rõ ràng, chống ồn tốt hơn mình nghĩ. Xứng đáng từng đồng!",
        verified: true,
      },
      {
        id: 2,
        name: "Lê Thị Mai",
        avatar: "L",
        rating: 4,
        date: "15/01/2025",
        comment:
          "Pin trâu, kết nối Bluetooth ổn định. Chỉ hơi nặng khi đeo lâu.",
        verified: true,
      },
      {
        id: 3,
        name: "Trần Đức Anh",
        avatar: "T",
        rating: 5,
        date: "10/01/2025",
        comment:
          "Mua làm quà tặng người yêu, cô ấy rất thích. Đóng gói cẩn thận.",
        verified: false,
      },
    ],
    ratingStats: [
      { label: "Chất lượng âm thanh", pct: 99 },
      { label: "Chống ồn hiệu quả", pct: 97 },
      { label: "Giá trị sản phẩm", pct: 88 },
      { label: "Giao hàng đúng hẹn", pct: 91 },
    ],
  },
  {
    id: 2,
    name: "Korean Vintage Floral Dress",
    price: "345.000đ",
    oldPrice: "490.000đ",
    sold: "3.4k",
    category: "Thời trang",
    country: "Hàn",
    image: "/image/dress-korea.jpg",
    description:
      "Váy hoa vintage phong cách Hàn Quốc, chất liệu mềm mại, phù hợp đi chơi hoặc đi làm.",
    reviews: [
      {
        id: 1,
        name: "Nguyễn Thu Hà",
        avatar: "N",
        rating: 5,
        date: "05/02/2025",
        comment:
          "Vải mềm mại, mặc rất thoải mái. Màu sắc đúng như ảnh, rất xinh!",
        verified: true,
      },
      {
        id: 2,
        name: "Vũ Thị Hương",
        avatar: "V",
        rating: 4,
        date: "01/02/2025",
        comment: "Form đẹp, hợp với nhiều vóc dáng. Nên order thêm 1 size.",
        verified: true,
      },
    ],
    ratingStats: [
      { label: "Chất lượng vải", pct: 95 },
      { label: "Đúng mô tả", pct: 92 },
      { label: "Giá tốt", pct: 96 },
      { label: "Giao hàng đúng hẹn", pct: 89 },
    ],
  },
  {
    id: 3,
    name: "Philips HR2041 Blender",
    price: "890.000đ",
    oldPrice: "1.190.000đ",
    sold: "680",
    category: "Nhà cửa",
    country: "Mỹ",
    image: "/image/blender-philips.jpg",
    description:
      "Máy xay sinh tố Philips công suất 450W, dung tích 1.5L, thiết kế nhỏ gọn tiện lợi.",
  },
  {
    id: 4,
    name: "The Ordinary Vitamin C Serum",
    price: "290.000đ",
    oldPrice: "390.000đ",
    sold: "8.9k",
    category: "Làm đẹp",
    country: "Mỹ",
    image: "/image/serum-ordinary.jpg",
    description:
      "Serum Vitamin C giúp làm sáng da, mờ thâm nám, bảo vệ da khỏi tác hại của môi trường.",
    reviews: [
      {
        id: 1,
        name: "Hoàng Minh Châu",
        avatar: "H",
        rating: 5,
        date: "14/02/2025",
        comment:
          "Dùng 2 tuần thấy da sáng rõ rệt, lỗ chân lông nhỏ hơn. Sẽ mua lại!",
        verified: true,
      },
      {
        id: 2,
        name: "Đinh Thị Ngọc",
        avatar: "D",
        rating: 4,
        date: "09/02/2025",
        comment:
          "Hàng chính hãng, tem seal còn nguyên. Thấm nhanh, không nhờn rít.",
        verified: true,
      },
      {
        id: 3,
        name: "Bùi Văn Khoa",
        avatar: "B",
        rating: 5,
        date: "03/02/2025",
        comment:
          "Mua cho vợ dùng, cô ấy khen nhiều lắm. Giá hợp lý so với chất lượng.",
        verified: false,
      },
    ],
    ratingStats: [
      { label: "Hiệu quả làm sáng da", pct: 94 },
      { label: "Thành phần an toàn", pct: 98 },
      { label: "Giá trị sản phẩm", pct: 95 },
      { label: "Giao hàng đúng hẹn", pct: 90 },
    ],
  },
  {
    id: 5,
    name: "Asics Gel-Nimbus 25 Running Shoes",
    price: "3.290.000đ",
    oldPrice: "4.200.000đ",
    sold: "450",
    category: "Thể thao",
    country: "Nhật",
    image: "/image/asics-nimbus.jpg",
    description:
      "Giày chạy bộ Asics với đệm GEL cao cấp, hỗ trợ bàn chân tối ưu cho cự ly dài.",
  },
  {
    id: 6,
    name: "Smart LED Desk Lamp",
    price: "490.000đ",
    oldPrice: "690.000đ",
    sold: "2.3k",
    category: "Nhà cửa",
    country: "Indo",
    image: "/image/led-lamp.jpg",
    description:
      "Đèn bàn LED thông minh, điều chỉnh độ sáng & màu sắc, bảo vệ mắt, tích hợp sạc USB.",
  },
];

export const countries = ["Tất cả", "Mỹ", "Nhật", "Hàn", "Indo"];

export const categories = [
  "Tất cả",
  "Điện tử",
  "Thời trang",
  "Nhà cửa",
  "Làm đẹp",
  "Thể thao",
];
