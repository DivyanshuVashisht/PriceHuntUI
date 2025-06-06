import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (!query) return;
        router.push(`/results?q=${encodeURIComponent(query)}`);
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6">🛒 PriceHunt</h1>
      <input
        type="text"
        placeholder="Search for a product..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-64 mb-4"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </main>
  );
}