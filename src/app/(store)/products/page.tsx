"use client";

import { JSX, useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/store/ProductCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import Breadcrumb from "@/components/store/BreadCrums";

type StockFilter = "" | "in" | "out";

type Filters = {
  search: string;
  categories: string[];
  vendors: string[];
  stock: StockFilter;
  sort: string;
  page: number;
  limit: number;
};

const DEFAULT_FILTERS: Filters = {
  search: "",
  categories: [],
  vendors: [],
  stock: "",
  sort: "latestUpdated",
  page: 1,
  limit: 8,
};

function toggleInArray(arr: string[], value: string) {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

type FacetItem = { label: string; count: number; key: string };

function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [initialSearch, setInitialSearch] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  const [categoriesFacet, setCategoriesFacet] = useState<FacetItem[]>([]);
  const [vendorsFacet, setVendorsFacet] = useState<FacetItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [searchDraft, setSearchDraft] = useState<string>("");
  const [showMoreCats, setShowMoreCats] = useState<boolean>(false);
  const [showMoreVendors, setShowMoreVendors] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialize filters from URL (only once)
  useEffect(() => {
    if (isInitialized) return;

    const urlFilters: Filters = {
      search: searchParams.get("search") || "",
      categories: searchParams.get("category")?.split(",") || [],
      vendors: searchParams.get("vendor")?.split(",") || [],
      stock: (searchParams.get("stock") as StockFilter) || "",
      sort: searchParams.get("sort") || "latestUpdated",
      page: Number(searchParams.get("page") || 1),
      limit: Number(searchParams.get("limit") || 8),
    };

    setFilters(urlFilters);
    setSearchDraft(urlFilters.search);
    setInitialSearch((prev) => (prev === "" ? urlFilters.search : prev));
    setIsInitialized(true);
  }, [searchParams, isInitialized]);

  // Update URL when filters change (only after initialization)
  useEffect(() => {
    if (!isInitialized) return;

    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.categories.length) params.set("category", filters.categories.join(","));
    if (filters.vendors.length) params.set("vendor", filters.vendors.join(","));
    if (filters.stock) params.set("stock", filters.stock);
    if (filters.sort) params.set("sort", filters.sort);
    params.set("page", String(filters.page));
    params.set("limit", String(filters.limit));

    router.replace(`?${params.toString()}`);
  }, [filters, router, isInitialized]);

  // Build query string for API
  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.categories.length > 0) params.set("category", filters.categories.join(","));
    if (filters.vendors.length > 0) params.set("vendor", filters.vendors.join(","));
    if (filters.stock) params.set("stock", filters.stock);
    if (filters.sort) params.set("sort", filters.sort);
    params.set("page", String(filters.page));
    params.set("limit", String(filters.limit));
    return params.toString();
  }, [filters]);

  const showSearchBanner = useMemo(() => {
    const current = (filters.search || "").trim();
    const baseline = (initialSearch || "").trim();
    // Show only when there is a non-empty search AND it differs from initial URL term
    return current.length > 0 && current !== baseline;
  }, [filters.search, initialSearch]);

  // Fetch products
  useEffect(() => {
    let active = true;
    async function fetchProducts() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/products?${queryString}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        if (!active) return;

        setProducts(Array.isArray(data.products) ? data.products : []);
        setCategoriesFacet(Array.isArray(data.categories) ? data.categories : []);
        setVendorsFacet(Array.isArray(data.vendors) ? data.vendors : []);
        setTotal(Number(data.total) || 0);
        setTotalPages(Number(data.totalPages) || 1);
      } catch (e: any) {
        if (!active) return;
        setError(e?.message || "Something went wrong");
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchProducts();
    return () => { active = false; };
  }, [queryString]);

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => {
      setFilters((f) => ({ ...f, search: searchDraft, page: 1 }));
    }, 350);
    return () => clearTimeout(t);
  }, [searchDraft]);

  function toggleCategory(label: string) {
    if (label === "All") return clearCategories();
    setFilters((f) => ({ ...f, categories: toggleInArray(f.categories, label), page: 1 }));
  }
  function toggleVendor(label: string) {
    if (label === "All") return clearVendors();
    setFilters((f) => ({ ...f, vendors: toggleInArray(f.vendors, label), page: 1 }));
  }
  function clearCategories() { setFilters((f) => ({ ...f, categories: [], page: 1 })); }
  function clearVendors() { setFilters((f) => ({ ...f, vendors: [], page: 1 })); }
  function setStock(next: StockFilter) { setFilters((f) => ({ ...f, stock: next, page: 1 })); }
  function setSort(next: string) { setFilters((f) => ({ ...f, sort: next })); }
  function clearAll() { setSearchDraft(""); setFilters({ ...DEFAULT_FILTERS }); }
  function nextPage() { setFilters((f) => ({ ...f, page: Math.min(totalPages, f.page + 1) })); }
  function prevPage() { setFilters((f) => ({ ...f, page: Math.max(1, f.page - 1) })); }

  const catItems = showMoreCats ? categoriesFacet : categoriesFacet.slice(0, 7);
  const vendorItems = showMoreVendors ? vendorsFacet : vendorsFacet.slice(0, 7);
  const categoriesAllCount = categoriesFacet.find((x) => x.label === "All")?.count ?? total;
  const vendorsAllCount = vendorsFacet.find((x) => x.label === "All")?.count ?? total;

  return (
    <div className="min-h-screen ">
      <div className="pb-10">
        <Breadcrumb
          items={[
            { name: "Products", link: "/products" },
          ]} />
      </div>
      <div className="pb-10 container mx-auto">
      <Image src="/banners/full.png" alt="Banner" width={1600} height={323} />
      <div className="mx-auto   py-6 mt-5 flex gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block w-80 shrink-0">
          <div className="flex items-center justify-between my-[10%]">
            <h2 className="text-2xl font-semibold">Filters</h2>
            <button onClick={clearAll} className="px-3 py-1 rounded-full border border-gray-200 text-[16px] hover:bg-gray-50">
              Clear All
            </button>
          </div>
          <Accordion type="multiple" defaultValue={["vendors", "categories", "stock"]} className="w-full px-4 py-4 bg-white rounded-lg border border-gray-200 text-cyan-600">
            {/* Vendors */}
            <AccordionItem value="vendors">
              <AccordionTrigger className="text-xl font-medium">Vendors</AccordionTrigger>
              <AccordionContent>
                <div className="px-2 py-2">
                  {vendorsFacet.length > 0 && (
                    <label className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        checked={filters.vendors.length === 0}
                        onChange={clearVendors}
                        className="w-4 h-4 text-cyan-600 bg-transparent border-2 border-cyan-600 rounded focus:ring-cyan-500 focus:ring-2 accent-cyan-600"
                      />
                      <span>All</span>
                      <span className="ml-auto text-cyan-700 text-sm">{vendorsAllCount}</span>
                    </label>
                  )}
                  {vendorItems.filter((v) => v.label !== "All").map((v) => (
                    <label key={v.key} className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        checked={filters.vendors.includes(v.label)}
                        onChange={() => toggleVendor(v.label)}
                        className="w-4 h-4 text-cyan-600 bg-transparent border-2 border-cyan-600 rounded focus:ring-cyan-500 focus:ring-2 accent-cyan-600"
                      />
                      <span>{v.label}</span>
                      <span className="ml-auto text-cyan-700 text-sm">{v.count}</span>
                    </label>
                  ))}
                  {vendorsFacet.length > 7 && (
                    <button className="text-sm text-cyan-600 mt-1" onClick={() => setShowMoreVendors((s) => !s)}>
                      {showMoreVendors ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Categories */}
            <AccordionItem value="categories">
              <AccordionTrigger className="text-xl font-medium">Category</AccordionTrigger>
              <AccordionContent>
                <div className="px-2 py-2">
                  {categoriesFacet.length > 0 && (
                    <label className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        checked={filters.categories.length === 0}
                        onChange={clearCategories}
                        className="w-4 h-4 text-cyan-600 bg-transparent border-2 border-cyan-600 rounded focus:ring-cyan-500 focus:ring-2 accent-cyan-600"
                      />
                      <span>All</span>
                      <span className="ml-auto text-gray-500 text-sm">{categoriesAllCount}</span>
                    </label>
                  )}
                  {catItems.filter((c) => c.label !== "All").map((c) => (
                    <label key={c.key} className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(c.label)}
                        onChange={() => toggleCategory(c.label)}
                        className="w-4 h-4 text-cyan-600 bg-transparent border-2 border-cyan-600 rounded focus:ring-cyan-500 focus:ring-2 accent-cyan-600"
                      />
                      <span>{c.label}</span>
                      <span className="ml-auto text-gray-500 text-sm">{c.count}</span>
                    </label>
                  ))}
                  {categoriesFacet.length > 7 && (
                    <button className="text-sm text-blue-600 mt-1" onClick={() => setShowMoreCats((s) => !s)}>
                      {showMoreCats ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Stock */}
            <AccordionItem value="stock">
              <AccordionTrigger className="text-xl font-medium">Stock</AccordionTrigger>
              <AccordionContent>
                <div className="px-2 py-2 space-y-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="stock"
                      checked={filters.stock === ""}
                      onChange={() => setStock("")}
                      className="w-4 h-4 text-cyan-600 bg-transparent border-2 border-cyan-600 focus:ring-cyan-500 focus:ring-2 accent-cyan-600"
                    />
                    All
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="stock"
                      checked={filters.stock === "in"}
                      onChange={() => setStock("in")}
                      className="w-4 h-4 text-cyan-600 bg-transparent border-2 border-cyan-600 focus:ring-cyan-500 focus:ring-2 accent-cyan-600"
                    />
                    In Stock
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="stock"
                      checked={filters.stock === "out"}
                      onChange={() => setStock("out")}
                      className="w-4 h-4 text-cyan-600 bg-transparent border-2 border-cyan-600 focus:ring-cyan-500 focus:ring-2 accent-cyan-600"
                    />
                    Out of Stock
                  </label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>

        {/* Main */}
        <main className="flex-1">
          <Tabs defaultValue="products" className="w-full">
            <div className="border-b border-gray-200 pb-2">

              <TabsList>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
              </TabsList>

            </div>
            {/* Products Tab */}
            <TabsContent value="products">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
                {/* Left side: "Showing result for" (only when appropriate) */}
                <div className="flex-1">
                  {showSearchBanner ? (
                    <div className="text-sm text-gray-700">
                      <span className="text-gray-600">Showing Result for: </span>
                      <span className="font-medium">{filters.search}</span>
                    </div>
                  ) : (
                    // Keep spacing consistent when hidden on wider screens
                    <div className="h-5" />
                  )}
                </div>

                {/* Right side: search field and sort, aligned like screenshot */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      value={searchDraft}
                      onChange={(e) => setSearchDraft(e.target.value)}
                      placeholder="Search"
                      className="w-44 md:w-60 border border-gray-300 rounded-md px-3 py-2"
                    />
                    <span className="absolute right-3 top-2.5 text-gray-400">⌕</span>
                  </div>

                  <select
                    value={filters.sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-2"
                  >
                    <option value="latestUpdated">Latest</option>
                    <option value="latestCreated">Newest</option>
                    <option value="priceAsc">Price ↑</option>
                    <option value="priceDesc">Price ↓</option>
                    <option value="nameAsc">Name A–Z</option>
                    <option value="nameDesc">Name Z–A</option>
                  </select>
                </div>
              </div>


              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="border rounded-lg shadow-sm p-3 flex flex-col gap-3 bg-white">
                      <Skeleton className="h-40 w-full rounded-md" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                      <div className="mt-auto flex justify-between items-center">
                        <Skeleton className="h-6 w-12" />
                        <Skeleton className="h-8 w-20 rounded-md" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-red-600">{error}</div>
              ) : products.length === 0 ? null : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((p) => (
                    <ProductCard key={p._id} {...p} imageUrl={p.imageUrl || "/placeholder.svg"} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {products.length > 0 && totalPages > 0 && (

                <div className="mt-6"> <Pagination> <PaginationContent className="justify-center"> {/* Previous */}
                  <PaginationItem> <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); if (filters.page > 1) prevPage(); }} className={filters.page <= 1 ? "pointer-events-none opacity-50" : ""} /> </PaginationItem>
                  {/* Page numbers: render a compact, centered range */}
                  {(() => {
                    const items: JSX.Element[] = [];
                    const maxButtons = 5; // total number of numbered buttons to show
                    const half = Math.floor(maxButtons / 2);
                    let start = Math.max(1, filters.page - half);
                    let end = Math.min(totalPages, start + maxButtons - 1);
                    if (end - start + 1 < maxButtons) {
                      start = Math.max(1, end - maxButtons - 1 + 1);
                    }

                    // Leading first + ellipsis
                    if (start > 1) {
                      items.push(
                        <PaginationItem key={1}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setFilters((f) => ({ ...f, page: 1 }));
                            }}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                      );
                      if (start > 2) {
                        items.push(
                          <PaginationItem key="lead-ellipsis">
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                    }

                    // Numbered window
                    for (let p = start; p <= end; p++) {
                      const isActive = p === filters.page;
                      items.push(
                        <PaginationItem key={p}>
                          <PaginationLink
                            href="#"
                            isActive={isActive}
                            onClick={(e) => {
                              e.preventDefault();
                              if (!isActive) setFilters((f) => ({ ...f, page: p }));
                            }}
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }

                    // Trailing ellipsis + last
                    if (end < totalPages) {
                      if (end < totalPages - 1) {
                        items.push(
                          <PaginationItem key="trail-ellipsis">
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      items.push(
                        <PaginationItem key={totalPages}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setFilters((f) => ({ ...f, page: totalPages }));
                            }}
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }

                    return items;
                  })()}

                  {/* Next */}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (filters.page < totalPages) nextPage();
                      }}
                      className={filters.page >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
                </Pagination>


                </div>)}
            </TabsContent>

            {/* Suppliers Tab */}
            <TabsContent value="suppliers">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {loading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="border rounded-lg shadow-sm p-3 flex flex-col gap-3 bg-white">
                      <Skeleton className="h-40 w-full rounded-md" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                      <div className="mt-auto flex justify-between items-center">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-8 w-20 rounded-md" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-600">No suppliers implemented yet.</div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      </div>
      </div>
    );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto py-6 mt-5 flex gap-6">
        <aside className="hidden md:block w-80 shrink-0">
          <div className="flex items-center justify-between my-[10%]">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
          <div className="w-full px-4 py-4 bg-white rounded-lg border border-gray-200">
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-12 w-full" />
          </div>
        </aside>
        <main className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="border rounded-lg shadow-sm p-3 flex flex-col gap-3 bg-white">
                <Skeleton className="h-40 w-full rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="mt-auto flex justify-between items-center">
                  <Skeleton className="h-6 w-12" />
                  <Skeleton className="h-8 w-20 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProductsPageContent />
    </Suspense>
  );
}
