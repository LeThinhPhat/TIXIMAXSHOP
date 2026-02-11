import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Header2 from "./components/layout/Header2";

export const metadata: Metadata = {
  title: "EmcomerFado - Mua sắm thả ga, giá cả hợp lý",
  description:
    "Nền tảng thương mại điện tử đa ngành hàng hàng đầu Việt Nam. Hàng triệu sản phẩm chính hãng, giao hàng nhanh, đổi trả dễ dàng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased bg-gray-50 min-h-screen">
        <Header />
        <Header2 />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
