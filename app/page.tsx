// ===== app/page.tsx =====

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-4">PriceHunt</h1>
      <form
        action="/results"
        method="GET"
        className="w-full max-w-md flex gap-2"
      >
        <input
          type="text"
          name="q"
          placeholder="Search for a product..."
          className="flex-grow p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Search
        </button>
      </form>
    </main>
  );
}