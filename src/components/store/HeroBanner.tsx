export default function HeroBanner() {
    // Using a remote Unsplash image for now (no Next/Image config needed)
    const img =
      "https://images.unsplash.com/photo-1581093588401-8e88a6f3b5fd?q=80&w=1600&auto=format&fit=crop";
  
    return (
      <section className="relative">
        <img
          src={img}
          alt="Industrial safety essentials"
          className="h-[38vh] w-full object-cover md:h-[48vh] lg:h-[56vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
        <div className="absolute inset-0">
          <div className="container flex h-full flex-col justify-end pb-8 text-white md:justify-center">
            <h1 className="max-w-2xl text-2xl font-semibold leading-tight md:text-4xl">
              Trusted Safety Gear for Every Shift
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/90 md:text-base">
              Helmets, respirators, gloves, and more—carefully curated for industrial performance.
            </p>
            <div className="mt-4">
              <a
                href="/products"
                className="inline-flex items-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
              >
                Shop All Products
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
  