"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search, LogIn, ShoppingBag } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import Image from "next/image"

const categories = [
  { label: "All Products", href: "/products" },
  { label: "Safety Helmets", href: "/products?category=helmets" },
  { label: "Respirators", href: "/products?category=respirators" },
  { label: "Gloves", href: "/products?category=gloves" },
  { label: "Welding Helmets", href: "/products?category=welding-helmets" },
  { label: "Eye Protection", href: "/products?category=eye-protection" },
  { label: "Ear Protection", href: "/products?category=ear-protection" },
  { label: "Safety Shoes", href: "/products?category=safety-shoes" },
]

export default function Header() {
  const router = useRouter()
  const [q, setQ] = useState("")

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!q.trim()) return
    router.push(`/products?search=${encodeURIComponent(q.trim())}`)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur">
      {/* ---- Top Row: Logo + Search + Actions ---- */}
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        <div className="flex items-center justify-between py-3 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/logo.svg" alt="Zedexel Store" width={36} height={36} />
            <span className="text-lg font-semibold tracking-tight md:text-xl">
              Zedexel Store
            </span>
          </Link>

          {/* Desktop Search */}
          <form
            onSubmit={onSubmit}
            className="hidden md:flex w-full max-w-lg items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm"
          >
            <Search className="size-5 opacity-60" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search helmets, respirators, gloves…"
              className="w-full bg-transparent outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              Search
            </button>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-slate-50"
            >
              <LogIn className="size-4" />
              <span>Login</span>
            </Link>

            <Link
              href="/cart"
              className="hidden md:inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-slate-50"
            >
              <ShoppingBag className="size-4" />
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ---- Second Row: Navigation Menu (Full Width Border) ---- */}
      <div className="w-full border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-3 md:px-6 py-2">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2 lg:w-[600px]">
                    {categories.map((c) => (
                      <ListItem key={c.href} title={c.label} href={c.href}>
                        Explore {c.label.toLowerCase()} in our catalog.
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/about">About Us</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/contact">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {/* ---- Mobile Search ---- */}
      <div className="container mx-auto px-3 pb-3 md:hidden">
        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm"
        >
          <Search className="size-5 opacity-60" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            className="w-full bg-transparent outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white"
          >
            Go
          </button>
        </form>
      </div>
    </header>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none rounded-md p-3 leading-tight no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <div className="text-sm font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
