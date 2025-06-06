import { Product } from "../types/product";

export default function ProductCard({ product }: { product: Product}) {
    return (
    <div className="border rounded p-4 shadow-md max-w-sm">
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-2" />
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p className="text-blue-600 font-bold">{product.price}</p>
      <p className="text-sm text-gray-600">{product.site}</p>
      <a href={product.url} target="_blank" className="text-sm text-blue-500 underline mt-2 inline-block">
        View on Site
      </a>
    </div>
  );
}