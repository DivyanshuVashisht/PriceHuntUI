// ===== app/results/page.tsx =====
"use client"; // Keep this here as useSearchParams is a client-side hook

import { Suspense, useEffect, useState } from "react"; // Import Suspense
import { useSearchParams } from "next/navigation";
import { Product } from "../types/product";
import ProductCard from "../components/ProductCard";

// This is your main component logic that relies on useSearchParams
function SearchResultsContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || ""; // Get the 'q' parameter from the URL

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Add state for error handling

  useEffect(() => {
    // If there's no query, don't fetch
    if (!q) {
      setProducts([]); // Clear previous products if query is empty
      setLoading(false);
      setError(null);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setError(null); // Clear any previous errors
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        if (!res.ok) { // Check if the response was successful
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        // Assuming your API returns an object with a 'products' array
        setProducts(data.products || []);
      } catch (err: any) { // Catch potential network or parsing errors
        console.error("Error fetching products:", err);
        setError(err.message || "Failed to fetch products");
        setProducts([]); // Clear products on error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [q]); // Re-run effect whenever the 'q' query parameter changes

  // Display different states based on loading, error, or data availability
  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (products.length === 0 && q) {
    return <p>No products found for "{q}".</p>;
  }

  if (!q) {
    return <p>Please enter a search term.</p>;
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product, i) => (
        // It's better to use a unique ID for the key if available, otherwise index is fallback
        <ProductCard key={i} product={product} />
      ))}
    </div>
  );
}

// This is the exported default component for the page
export default function ResultsPage() {
  return (
    <main className="p-6">
      {/*
        The Suspense boundary tells Next.js to render the 'fallback' content
        on the server during build/prerendering, and then render SearchResultsContent
        on the client once useSearchParams is available.
      */}
      <Suspense fallback={<div>Loading search parameters...</div>}>
        {/*
          We're moving the h1 inside SearchResultsContent to ensure 'q' is available
          when it renders, or you could keep it here if you only want to display "Results"
          and handle the 'q' display within the Suspense boundary.
          I've put it back here to be explicitly part of the main layout,
          and handle the `q` value gracefully within the `SearchResultsContent`.
        */}
        <h1 className="text-3xl font-bold mb-4">Results</h1>
        <SearchResultsContent />
      </Suspense>
    </main>
  );
}