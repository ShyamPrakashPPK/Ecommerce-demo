"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

type Slide = {
  src: string;
  alt: string;
  // Text content
  eyebrow?: string;
  title: string;
  subtitle?: string;
  // CTA
  ctaText: string;
  href: string; // e.g. "/products" or `/product/[id]`
  // Look & feel
  theme?: "dark" | "light"; // affects text color and overlay strength
  align?: "left" | "center" | "right"; // text alignment on banner
};

const SLIDES: Slide[] = [
  // Dark themed → /products
  {
    src: "/banners/1.png",
    alt: "Industrial Machinery Banner",
    eyebrow: "Precision Engineering",
    title: "Power Your Workflow",
    subtitle: "Pro-grade machines built for nonstop performance.",
    ctaText: "Shop All Products",
    href: "/products",
    theme: "dark",
    align: "left",
  },
  // Light themed → /product/[id]
  {
    src: "/banners/2.png",
    alt: "Safety Essentials Banner",
    eyebrow: "Safety Meets Innovation",
    title: "Trusted Gear. Zero Compromise.",
    subtitle: "From helmets to respirators—everything you need.",
    ctaText: "View Featured Item",
    href: "/product/68ab5132cab778c063992874", // 3M 6200 Respirator
    theme: "light",
    align: "right",
  },
  // Dark themed → /product/[id]
  {
    src: "/banners/3.png",
    alt: "Power Tools Banner",
    eyebrow: "Next-Gen Tools",
    title: "Built to Go the Distance",
    subtitle: "Torque, precision, and endurance in one lineup.",
    ctaText: "Explore This Tool",
    href: "/product/68ab5132cab778c063992878", // Bosch Drill
    theme: "dark",
    align: "center",
  },
  // Light themed → /products
  {
    src: "/banners/4.png",
    alt: "Automation & Robotics Banner",
    eyebrow: "Automation Ready",
    title: "Work Smarter. Scale Faster.",
    subtitle: "Modern solutions for modern operations.",
    ctaText: "Browse Collections",
    href: "/products",
    theme: "light",
    align: "left",
  },
];

export default function FullBanner() {
  return (
    <section className="w-full px-4 py-6">
      <div className="mx-auto">
        <Carousel className="w-full">
          <CarouselContent className="items-center">
            {SLIDES.map((s, idx) => (
              <CarouselItem key={idx} className="basis-full px-0">
                <div className="relative overflow-hidden">
                  {/* Background image */}
                  <div className="relative h-[350px] md:h-[420px] lg:h-[480px]">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      priority={idx === 0}
                      sizes="100vw"
                      className="object-cover"
                    />

                    {/* Gradient overlay for readability */}
                    <div
                      className={[
                        "absolute inset-0",
                        s.theme === "light"
                          ? "bg-gradient-to-t from-black/30 via-black/10 to-transparent"
                          : "bg-gradient-to-t from-black/60 via-black/30 to-transparent",
                      ].join(" ")}
                      aria-hidden="true"
                    />

                    {/* Text block */}
                    <div
                      className={[
                        "absolute inset-0 flex items-center px-6 md:px-10",
                        s.align === "left" && "justify-start",
                        s.align === "center" && "justify-center text-center",
                        s.align === "right" && "justify-end text-right",
                      ].join(" ")}
                    >
                      <div className="max-w-2xl space-y-3 md:space-y-4">
                        {s.eyebrow && (
                          <p
                            className={[
                              "text-xs md:text-sm tracking-wide uppercase",
                              s.theme === "light" ? "text-white/80" : "text-white/80",
                            ].join(" ")}
                          >
                            {s.eyebrow}
                          </p>
                        )}

                        <h2
                          className={[
                            "font-semibold leading-tight",
                            "text-2xl md:text-4xl lg:text-5xl",
                            "drop-shadow-sm",
                            s.theme === "light" ? "text-white" : "text-white",
                          ].join(" ")}
                        >
                          {s.title}
                        </h2>

                        {s.subtitle && (
                          <p
                            className={[
                              "text-sm md:text-base lg:text-lg",
                              "max-w-xl md:max-w-2xl",
                              s.align === "center" ? "mx-auto" : "",
                              s.theme === "light" ? "text-white/85" : "text-white/85",
                            ].join(" ")}
                          >
                            {s.subtitle}
                          </p>
                        )}

                        <div
                          className={[
                            "pt-2",
                            s.align === "center" ? "justify-center flex" : "inline-flex",
                          ].join(" ")}
                        >
                          <Link href={s.href} aria-label={s.ctaText}>
                            <Button
                              size="lg"
                              className={[
                                " shadow-md",
                                "backdrop-blur-sm",
                                // Subtle cyan vibe without hard-coding brand color
                                "bg-white/90 text-black hover:bg-white",
                              ].join(" ")}
                            >
                              {s.ctaText}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Prev/Next buttons */}
          <CarouselPrevious className="left-2 md:left-4" />
          <CarouselNext className="right-2 md:right-4" />
        </Carousel>
      </div>
    </section>
  );
}
