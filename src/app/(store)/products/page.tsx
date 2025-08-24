// app/(store)/products/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/store/ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


type StockFilter = "" | "in" | "out";

type Filters = {
  search: string;
  categories: string[]; // multi-select (by label)
  vendors: string[];    // multi-select (by label)
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
  limit: 12,
};

function toggleInArray(arr: string[], value: string) {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

type FacetItem = { label: string; count: number; key: string };

export default function ProductsPage() {
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

  // Build query from filters (send only raw labels; API expects comma-joined)
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
    return () => {
      active = false;
    };
  }, [queryString]);

  // Debounce search
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
  function clearCategories() {
    setFilters((f) => ({ ...f, categories: [], page: 1 }));
  }
  function clearVendors() {
    setFilters((f) => ({ ...f, vendors: [], page: 1 }));
  }
  function setStock(next: StockFilter) {
    setFilters((f) => ({ ...f, stock: next, page: 1 }));
  }
  function setSort(next: string) {
    setFilters((f) => ({ ...f, sort: next }));
  }
  function clearAll() {
    setSearchDraft("");
    setFilters({ ...DEFAULT_FILTERS });
  }
  function nextPage() {
    setFilters((f) => ({ ...f, page: Math.min(totalPages, f.page + 1) }));
  }
  function prevPage() {
    setFilters((f) => ({ ...f, page: Math.max(1, f.page - 1) }));
  }

  const catItems = showMoreCats ? categoriesFacet : categoriesFacet.slice(0, 7);
  const vendorItems = showMoreVendors ? vendorsFacet : vendorsFacet.slice(0, 7);

  // Helper to read "All" count from the first facet row (server includes it)
  const categoriesAllCount = categoriesFacet.find((x) => x.label === "All")?.count ?? total;
  const vendorsAllCount = vendorsFacet.find((x) => x.label === "All")?.count ?? total;

  return (
    <div className="min-h-screen ">
      {/* Top bar with tabs, search, sort */}
  
      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 py-6 flex gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block w-80 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={clearAll}
              className="px-3 py-1 rounded-full border border-gray-200 text-sm hover:bg-gray-50"
            >
              Clear All
            </button>
          </div>

          <Accordion type="multiple" className="w-full px-[5%] py-[3%]  bg-white rounded-lg border border-gray-200">
            {/* Vendors */}
            <AccordionItem value="vendors">
              <AccordionTrigger>Business Type</AccordionTrigger>
              <AccordionContent>
                <div className="px-2 py-2">
                  {vendorsFacet.length > 0 && (
                    <label className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        checked={filters.vendors.length === 0}
                        onChange={clearVendors}
                      />
                      <span>All</span>
                      <span className="ml-auto text-gray-500 text-sm">{vendorsAllCount}</span>
                    </label>
                  )}
                  {vendorItems
                    .filter((v) => v.label !== "All")
                    .map((v) => (
                      <label key={v.key} className="flex items-center gap-2 py-1">
                        <input
                          type="checkbox"
                          checked={filters.vendors.includes(v.label)}
                          onChange={() => toggleVendor(v.label)}
                        />
                        <span>{v.label}</span>
                        <span className="ml-auto text-gray-500 text-sm">{v.count}</span>
                      </label>
                    ))}
                  {vendorsFacet.length > 7 && (
                    <button
                      className="text-sm text-blue-600 mt-1"
                      onClick={() => setShowMoreVendors((s) => !s)}
                    >
                      {showMoreVendors ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Categories */}
            <AccordionItem value="categories">
              <AccordionTrigger>Category</AccordionTrigger>
              <AccordionContent>
                <div className="px-2 py-2">
                  {categoriesFacet.length > 0 && (
                    <label className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        checked={filters.categories.length === 0}
                        onChange={clearCategories}
                      />
                      <span>All</span>
                      <span className="ml-auto text-gray-500 text-sm">{categoriesAllCount}</span>
                    </label>
                  )}
                  {catItems
                    .filter((c) => c.label !== "All")
                    .map((c) => (
                      <label key={c.key} className="flex items-center gap-2 py-1">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(c.label)}
                          onChange={() => toggleCategory(c.label)}
                        />
                        <span>{c.label}</span>
                        <span className="ml-auto text-gray-500 text-sm">{c.count}</span>
                      </label>
                    ))}
                  {categoriesFacet.length > 7 && (
                    <button
                      className="text-sm text-blue-600 mt-1"
                      onClick={() => setShowMoreCats((s) => !s)}
                    >
                      {showMoreCats ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Stock */}
            <AccordionItem value="stock">
              <AccordionTrigger>Stock</AccordionTrigger>
              <AccordionContent>
                <div className="px-2 py-2">
                  <label className="block">
                    <input
                      type="radio"
                      name="stock"
                      checked={filters.stock === ""}
                      onChange={() => setStock("")}
                    />{" "}
                    All
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="stock"
                      checked={filters.stock === "in"}
                      onChange={() => setStock("in")}
                    />{" "}
                    In Stock
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="stock"
                      checked={filters.stock === "out"}
                      onChange={() => setStock("out")}
                    />{" "}
                    Out of Stock
                  </label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse border  border-gray-200 rounded p-3 space-y-3 bg-white">
                  <div className="bg-gray-200 h-36 rounded" />
                  <div className="bg-gray-200 h-4 rounded w-3/4" />
                  <div className="bg-gray-200 h-4 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : products.length === 0 ? (
            <div className="text-gray-600">No products match the selected filters.</div>
          ) : (
            <div>
    <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex bg-gray-100 rounded-md overflow-hidden">
                <button className="px-4 py-2 bg-white text-sm font-medium border border-gray-200 rounded-md">
                  Products
                </button>
                <button className="px-4 py-2 text-sm text-gray-600">
                  Suppliers
                </button>
              </div>
          <div className="flex items-center justify-between">
            {/* Tabs + context */}
            <div className="flex items-center gap-3">
             
              <span className="hidden md:inline text-sm text-gray-600">
                Showing result for: <span className="text-blue-600">Road alignment planning and design</span>
              </span>
            </div>

            {/* Search + Sort aligned to right */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  value={searchDraft}
                  onChange={(e) => setSearchDraft(e.target.value)}
                  placeholder="Search"
                  className="w-56 md:w-72 border border-gray-200 rounded px-3 py-2"
                />
                <span className="absolute right-3 top-2.5 text-gray-400">⌕</span>
              </div>
              <select
                value={filters.sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-200 rounded px-2 py-2"
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
        </div>
      </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {products.map((p) => (
                <ProductCard key={p._id} {...p} imageUrl={p.imageUrl || "/placeholder.svg"} />
              ))}
            </div>
              </div>
          )}

          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={prevPage}
              disabled={filters.page <= 1}
              className="px-3 py-1 border border-gray-200 rounded disabled:opacity-50 bg-white"
            >
              Prev
            </button>
            <span className="text-sm">
              Page {filters.page} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={filters.page >= totalPages}
              className="px-3 py-1 border border-gray-200 rounded disabled:opacity-50 bg-white"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
