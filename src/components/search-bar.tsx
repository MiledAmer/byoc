"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function SearchBar({ Mobile = false }: { Mobile?: boolean }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const [searchQuery, setSearchQuery] = useState(search);
  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    } else {
      params.delete("search");
    }

    router.push(`/products?${params.toString()}`);
  };

  const SearchInput = (Mobile: boolean) => (
    <form
      onSubmit={handleSearch}
      className={`max-w-md flex-1 ${Mobile ? "" : "hidden md:flex"}`}
    >
      <div className="relative w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="border-neon/30 focus:border-neon focus:ring-neon w-full rounded-md border bg-black/50 px-4 py-2 pr-10 text-sm text-white transition-all placeholder:text-white/40 focus:ring-1 focus:outline-none"
        />
        <span className="text-neon absolute top-1/2 right-2 -translate-y-1/2">
          <Search size={18} />
        </span>
      </div>
    </form>
  );

  const mobile = (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-neon md:hidden" aria-label="Search">
          <Search size={18} />
        </button>
      </PopoverTrigger>
      <PopoverContent sideOffset={25} className="w-screen p-0">
        {SearchInput(Mobile)}
      </PopoverContent>
    </Popover>
  );

  if (Mobile) {
    return mobile;
  }
  return SearchInput(Mobile);
}
