"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Exact 1312 × 323 banners (place files in /public/banners)
const IMAGES = [
  { src: "/banners/full.png", alt: "Banner 1" },
  { src: "/banners/full.png", alt: "Banner 4" },
];

export default function ProductBanner() {
  return (
    <section className="">
      <div className="mx-auto pl-10">
      <Image
                    src={IMAGES[0].src}
                    alt={IMAGES[0].alt}
                    fill
                    priority={0 === 0}
                    sizes="1312px"
                    className="object-cover object-center"
                  />
      </div>
    </section>
  );
}