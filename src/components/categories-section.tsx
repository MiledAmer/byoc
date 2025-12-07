"use client";

import type { Category } from "@/sanity/types/categories";
import { useRouter, useSearchParams } from "next/navigation";

export default function CategoriesSection({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") ?? "All";

  const handleCategoryClick = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (selectedCategory === categorySlug) {
      params.delete("category");
    } else {
      params.set("category", categorySlug);
    }
    
    router.push(`?${params.toString()}`, { scroll: false });
  };
  
  return (
    <section className="border-neon/20 sticky top-0 z-40 border-b bg-black/90 px-4 py-4 backdrop-blur-md">
      <div className="mx-auto max-w-7xl">
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryClick(category.slug.current)}
              className={`rounded-lg px-6 py-2 text-sm font-bold tracking-wider whitespace-nowrap uppercase transition ${
                selectedCategory === category.slug.current
                  ? "bg-neon shadow-neon/50 text-black shadow-lg"
                  : "border-neon/30 hover:text-neon hover:border-neon border bg-black text-white/70"
              }`}
            >
              {category.name.en}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
