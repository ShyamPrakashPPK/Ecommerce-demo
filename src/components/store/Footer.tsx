import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 border-t bg-slate-50/60">
      <div className="container grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 font-bold text-white">S</span>
            <span className="text-lg font-semibold">SafetyHub</span>
          </div>
          <p className="text-sm text-slate-600">
            Reliable safety & industrial equipment for every job site.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">Shop</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="/products?category=helmets" className="hover:underline">Safety Helmets</Link></li>
            <li><Link href="/products?category=respirators" className="hover:underline">Respirators</Link></li>
            <li><Link href="/products?category=gloves" className="hover:underline">Gloves</Link></li>
            <li><Link href="/products?category=eye-protection" className="hover:underline">Eye Protection</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            <li><Link href="/support" className="hover:underline">Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">Newsletter</h4>
          <p className="mb-3 text-sm text-slate-600">Get product updates & offers.</p>
          <form className="flex max-w-sm gap-2">
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-600"
            />
            <button className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} SafetyHub. All rights reserved.
      </div>
    </footer>
  );
}
