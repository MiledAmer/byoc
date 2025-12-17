import SectionLoader from "@/components/section-loader";

export default function loading() {
  return (
    <div className="text-foreground min-h-screen bg-black">
      {/* Hero Section */}
      <section className="border-neon/20 relative border-b bg-black px-4 py-16">
        <div className="bg-neon absolute top-1/2 right-1/4 h-96 w-96 rounded-full opacity-5 mix-blend-screen blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <h1 className="mb-4 text-6xl font-black tracking-tighter md:text-8xl">
            <span className="text-white">ALL</span>{" "}
            <span className="text-neon glow-text">PRODUCTS</span>
          </h1>
          <p className="text-lg text-white/60 md:text-xl">
            Embrace the chaos. Own your style.
          </p>
        </div>
      </section>
      {/* Category Filter Skeleton */}
      <section className="border-neon/20 sticky top-0 z-40 border-b bg-black/90 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-2 overflow-x-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-10 w-24 animate-pulse rounded-lg bg-white/10"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-screen bg-black px-4 py-16">
        <div className="bg-neon absolute top-1/3 left-1/4 h-80 w-80 rounded-full opacity-10 mix-blend-screen blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center gap-12 py-20">
            <SectionLoader />
          </div>
        </div>
      </section>
    </div>
  );
}
