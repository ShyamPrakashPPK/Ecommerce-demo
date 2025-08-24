"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
} from "lucide-react";

type Logo = {
  id: string;
  name: string;
  src: string;
};

const LOGOS: Logo[] = [
  { id: "3m", name: "3M", src: "/logos/3M.png" },
  { id: "amntum", name: "Amntum", src: "/logos/amntum.png" },
  { id: "daikin", name: "Daikin", src: "/logos/daikin.png" },
  { id: "ge", name: "GE", src: "/logos/ge.png" },
  { id: "airwheel", name: "Airwheel", src: "/logos/airwheel.png" },
];

function LogoCard({ logo }: { logo: Logo }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4 md:p-6 w-[160px] h-[120px] md:w-[220px] md:h-[180px] flex items-center justify-center shrink-0">
      <Image
        src={logo.src}
        alt={logo.name}
        width={160}
        height={80}
        className="object-contain opacity-80 w-full h-full"
      />
    </div>
  );
}

export default function TrustedClients() {
  const [index, setIndex] = useState(0);

  const visible = useMemo(() => {
    const arr: Logo[] = [];
    // Always return 5 logos, CSS will handle the responsive display
    for (let i = 0; i < 5; i++) {
      arr.push(LOGOS[(index + i) % LOGOS.length]);
    }
    return arr;
  }, [index]);

  const prev = () => setIndex((i) => (i - 1 + LOGOS.length) % LOGOS.length);
  const next = () => setIndex((i) => (i + 1) % LOGOS.length);

  return (
    <section className="w-full">
      {/* Heading + carousel */}
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-3xl md:text-[40px] font-semibold text-center tracking-tight text-gray-900">
          Trusted by leading Clients
        </h2>

        <div className="mt-8 flex items-center justify-center gap-2 md:gap-4">
          {/* Left arrow */}
          <button
            aria-label="Previous"
            onClick={prev}
            className="inline-flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 shrink-0"
          >
            <ChevronLeft size={18} strokeWidth={2} className="md:w-[22px] md:h-[22px]" />
          </button>

          {/* Logo cards */}
          <div className="flex items-center gap-3 md:gap-6 overflow-hidden">
            {visible.map((logo) => (
              <LogoCard key={logo.id} logo={logo} />
            ))}
          </div>

          {/* Right arrow */}
          <button
            aria-label="Next"
            onClick={next}
            className="inline-flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 shrink-0"
          >
            <ChevronRight size={18} strokeWidth={2} className="md:w-[22px] md:h-[22px]" />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gray-200" />

      {/* Footer */}
      <footer className="bg-[#2F3341] text-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Column 1 */}
            <div className="space-y-6 md:border-r md:border-white/10 md:pr-8">
              <h3 className="text-lg font-semibold text-white">Get to Know Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-white/90 cursor-pointer">About Us</li>
                <li className="hover:text-white/90 cursor-pointer">Contact Us</li>
                <li className="hover:text-white/90 cursor-pointer">Process</li>
              </ul>

              <h3 className="text-lg font-semibold text-white">Useful links</h3>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-white/90 cursor-pointer">FAQ</li>
                <li className="hover:text-white/90 cursor-pointer">Terms &amp; Conditions</li>
                <li className="hover:text-white/90 cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white/90 cursor-pointer">News &amp; Blogs</li>
                <li className="hover:text-white/90 cursor-pointer">Help Center</li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col items-center text-center md:border-r md:border-white/10 md:pr-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <Image
                  src="/logo.svg"
                  alt="Zedexel Store Logo"
                  width={28}
                  height={28}
                  className="text-cyan-400"
                />
                <span className="text-2xl font-semibold text-white">Zedexel Store</span>
              </div>

              <p className="max-w-md text-sm text-gray-300 mb-6">
                An innovative tech platform by Zedexl Technology simplifying B2B
                procurement in Qatar.
              </p>

              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="#"
                  className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Twitter / X"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={18} />
                </a>
                <a
                  href="#"
                  className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Contact Informations</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-white/90 font-medium">Get in Touch With Us</div>
                  <div className="text-gray-300">iProcure.ai, Doha, Qatar</div>
                </div>
                <div>
                  <div className="text-white/90 font-medium">Email Address</div>
                  <div className="text-gray-300">info@iprocure.ai</div>
                </div>
                <div>
                  <div className="text-white/90 font-medium">Phone Number</div>
                  <div className="text-gray-300">+974 7799 9600</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8">
          <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span>© {new Date().getFullYear()} ZedExel. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
