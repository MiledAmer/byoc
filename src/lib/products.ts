export interface Product {
  id: number
  name: string
  price: number
  priceFormatted: string
  image: string
  rating: number
  description: string
  sizes: string[]
  colors: string[]
  category: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "Neon Chaos Hoodie",
    price: 89,
    priceFormatted: "$89",
    image: "/neon-green-hoodie-streetwear.jpg",
    rating: 5,
    description:
      "Unleash the chaos with our signature neon hoodie. Premium heavyweight cotton blend with bold geometric patterns and electric green accents that glow in the dark. Perfect for those who dare to stand out.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black/Neon Green", "Charcoal/Lime"],
    category: "Hoodies",
  },
  {
    id: 2,
    name: "Grid Tee",
    price: 39,
    priceFormatted: "$39",
    image: "/black-graphic-t-shirt-geometric.jpg",
    rating: 4,
    description:
      "Digital grid aesthetic meets street fashion. Soft cotton tee with abstract geometric patterns that capture the essence of urban chaos. A wardrobe essential for the modern rebel.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Dark Grey", "Midnight Blue"],
    category: "T-Shirts",
  },
  {
    id: 3,
    name: "Electric Cargo Pants",
    price: 129,
    priceFormatted: "$129",
    image: "/black-cargo-pants-neon-details.jpg",
    rating: 5,
    description:
      "Function meets fury. Premium cargo pants with neon reflective strips and multiple pockets for maximum utility. Adjustable straps and a tapered fit that screams rebellion.",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Black/Neon", "Charcoal/Green"],
    category: "Pants",
  },
  {
    id: 4,
    name: "Void Jacket",
    price: 199,
    priceFormatted: "$199",
    image: "/black-jacket-neon-accents.jpg",
    rating: 5,
    description:
      "Command the darkness. Water-resistant outer shell with neon piping and hidden pockets. This jacket is built for the night and designed to turn heads.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black/Neon Green", "Onyx/Electric"],
    category: "Jackets",
  },
  {
    id: 5,
    name: "Pulse Cap",
    price: 45,
    priceFormatted: "$45",
    image: "/black-baseball-cap-neon-trim.jpg",
    rating: 4,
    description:
      "Top off your look with electric style. Snapback cap with embroidered logo and neon accent trim. Adjustable fit for maximum comfort.",
    sizes: ["One Size"],
    colors: ["Black/Neon", "Black/White"],
    category: "Accessories",
  },
  {
    id: 6,
    name: "Circuit Socks",
    price: 15,
    priceFormatted: "$15",
    image: "/neon-green-socks-pattern.jpg",
    rating: 5,
    description:
      "Details matter. Premium cotton blend socks with circuit board patterns and reinforced heel. Comfort from the ground up.",
    sizes: ["S/M", "L/XL"],
    colors: ["Black/Neon", "Grey/Lime"],
    category: "Accessories",
  },
]

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export const categories = ["All", "Hoodies", "T-Shirts", "Pants", "Jackets", "Accessories"]
