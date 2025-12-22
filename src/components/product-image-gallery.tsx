"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/sanity-utils";
import { cn } from "@/lib/utils";
import type { Product } from "@/sanity/types/products";

interface ProductImageGalleryProps {
  product: Product;
}

export default function ProductImageGallery({
  product,
}: ProductImageGalleryProps) {
  const allImages = [product.image, ...(product.images ?? [])].filter(
    (img): img is NonNullable<typeof product.image> => !!img,
  );

  const [selectedImage, setSelectedImage] = useState(allImages[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  const handlePreviousImage = () => {
    if (!selectedImage) return;
    const currentIndex = allImages.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setSelectedImage(allImages[prevIndex]);
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = allImages.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % allImages.length;
    setSelectedImage(allImages[nextIndex]);
  };

  return (
    <div className="space-y-4">
      <div
        className="border-neon/30 group relative aspect-square overflow-hidden rounded-lg border bg-black/50 backdrop-blur cursor-crosshair"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <div className="bg-neon absolute inset-0 opacity-5 mix-blend-screen pointer-events-none" />
        <Image
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          src={
            selectedImage?.asset
              ? (urlFor(selectedImage)?.url() ?? "/placeholder.svg")
              : "/placeholder.svg"
          }
          alt={product.title.en}
          className="object-cover transition-transform duration-200 ease-out"
          style={{
            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
            transform: isZoomed ? "scale(2)" : "scale(1)",
          }}
        />
        {allImages.length > 1 && (
          <>
            <button
              onClick={handlePreviousImage}
              className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-neon hover:text-black group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-neon hover:text-black group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
      {allImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <button
              key={image.asset._ref}
              onClick={() => setSelectedImage(image)}
              className={cn(
                "border-neon/30 relative h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-black/50 transition-all hover:border-neon",
                selectedImage === image && "border-neon ring-1 ring-neon",
              )}
            >
              <Image
                fill
                sizes="80px"
                src={
                  image?.asset
                    ? (urlFor(image)?.url() ?? "/placeholder.svg")
                    : "/placeholder.svg"
                }
                alt={`${product.title.en} view ${index + 1}`}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
