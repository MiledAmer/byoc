import ProductGrid from "@/components/product-grid";
import Hero from "@/components/hero";

export const metadata = {
  title: "BYOC - Buy Your Own Clothes",
  description: "Bold neon streetwear for the bold. Express yourself with BYOC.",
};

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Hero />
      <ProductGrid />
    </div>
  );
}
