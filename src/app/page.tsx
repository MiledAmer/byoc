import ProductGrid from "@/components/product-grid"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Footer from "@/components/footer"

export const metadata = {
  title: "BYOC - Buy Your Own Clothes",
  description: "Bold neon streetwear for the bold. Express yourself with BYOC.",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <ProductGrid />
      <Footer />
    </div>
  )
}
