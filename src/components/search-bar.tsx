"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function SearchBar({ Mobile = false }: { Mobile?: boolean }) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
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
        <button
          type="submit"
          className="text-neon absolute top-1/2 right-2 -translate-y-1/2 transition-all hover:drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]"
        >
          <Search size={18} />
        </button>
      </div>
    </form>
  );

  const mobile = (
    <Popover>
      <PopoverTrigger
        asChild
        className="text-neon transition-all hover:drop-shadow-[0_0_10px_rgba(0,255,0,0.5)] md:hidden"
      >
        <Button variant="ghost">
          <Search size={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={25} className="p-0 w-screen">{SearchInput(Mobile)}</PopoverContent>
    </Popover>
  );

  if (Mobile) {
    return mobile;
  }
  return SearchInput(Mobile);
}
