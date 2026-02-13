// app/products/[id]/page.tsx
import ProductDetailPage from "@/app/components/product/ProductDetailPage";

export default function Page({ params }: { params: { id: string } }) {
  return <ProductDetailPage id={params.id} />;
}
