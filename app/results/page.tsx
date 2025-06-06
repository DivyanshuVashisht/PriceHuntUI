// ===== app/results/page.tsx =====
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "../types/product";
import ProductCard from "../components/ProductCard";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) return;
    
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [q]);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Results for “{q}”</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}