// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

type SortKey =
  | "latestCreated"
  | "latestUpdated"
  | "priceAsc"
  | "priceDesc"
  | "nameAsc"
  | "nameDesc";

const SORT_MAP: Record<SortKey, Record<string, 1 | -1>> = {
  latestCreated: { createdAt: -1 },
  latestUpdated: { updatedAt: -1 },
  priceAsc: { price: 1 },
  priceDesc: { price: -1 },
  nameAsc: { name: 1 },
  nameDesc: { name: -1 },
};

type StockFilter = "" | "in" | "out";

function parseMultiParam(val?: string) {
  if (!val) return [];
  return val
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function buildQuery(opts: {
  search?: string;
  categories?: string[];
  vendors?: string[];
  stock?: StockFilter;
  includeArchived?: boolean;
}) {
  const { search = "", categories = [], vendors = [], stock = "", includeArchived = false } = opts;
  const q: any = {};
  if (search) q.name = { $regex: search, $options: "i" };
  if (categories.length > 0) q.category = { $in: categories };
  if (vendors.length > 0) q.vendor = { $in: vendors };
  if (stock === "in") q.stock = { $gt: 0 };
  if (stock === "out") q.stock = 0;
  if (!includeArchived) q.status = { $ne: "archived" };
  return q;
}

export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams);

    const search = (params.search as string) || "";
    const categoriesSelected = parseMultiParam(params.category as string);
    const vendorsSelected = parseMultiParam(params.vendor as string);
    const stock = ((params.stock as string) || "") as StockFilter;
    const sort = ((params.sort as SortKey) || "latestUpdated") as SortKey;

    const pageNum = Math.max(1, parseInt((params.page as string) || "1", 10) || 1);
    const limitNum = Math.min(
      60,
      Math.max(1, parseInt((params.limit as string) || "12", 10) || 12),
    );

    const includeArchived = (params.includeArchived as string) === "true";

    const client = await clientPromise;
    const db = client.db("zedexel");
    const collection = db.collection("products");

    // Base listing query with current selections
    const baseQuery = buildQuery({
      search,
      categories: categoriesSelected,
      vendors: vendorsSelected,
      stock,
      includeArchived,
    });

    const sortOptions = SORT_MAP[sort] || SORT_MAP.latestUpdated;
    const skip = (pageNum - 1) * limitNum;

    const [productsRaw, total] = await Promise.all([
      collection.find(baseQuery).sort(sortOptions).skip(skip).limit(limitNum).toArray(),
      collection.countDocuments(baseQuery),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limitNum));

    // Distincts from ENTIRE collection (to always show full sets)
    const [allCategoriesRaw, allVendorsRaw] = await Promise.all([
      collection.distinct("category"),
      collection.distinct("vendor"),
    ]);

    const allCategories = (allCategoriesRaw ?? [])
      .map((x) => (x == null ? "" : String(x)))
      .filter((x) => x.length > 0)
      .sort();

    const allVendors = (allVendorsRaw ?? [])
      .map((x) => (x == null ? "" : String(x)))
      .filter((x) => x.length > 0)
      .sort();

    // Facet counts (contextual):
    // Category counts = ignore category filter, keep others
    const categoryCountQuery = buildQuery({
      search,
      categories: [],
      vendors: vendorsSelected,
      stock,
      includeArchived,
    });

    // Vendor counts = ignore vendor filter, keep others
    const vendorCountQuery = buildQuery({
      search,
      categories: categoriesSelected,
      vendors: [],
      stock,
      includeArchived,
    });

    const [categoryCountsAgg, vendorCountsAgg] = await Promise.all([
      collection
        .aggregate([
          { $match: categoryCountQuery },
          { $group: { _id: "$category", count: { $sum: 1 } } },
        ])
        .toArray(),
      collection
        .aggregate([
          { $match: vendorCountQuery },
          { $group: { _id: "$vendor", count: { $sum: 1 } } },
        ])
        .toArray(),
    ]);

    const categoryCountsMap = Object.fromEntries(
      categoryCountsAgg.map((d: any) => [d._id || "Uncategorized", d.count]),
    );
    const vendorCountsMap = Object.fromEntries(
      vendorCountsAgg.map((d: any) => [d._id || "Unknown", d.count]),
    );

    // Build unified arrays with label/count and an "All" row at the top
    const categoriesUnified: Array<{ label: string; count: number; key: string }> = [
      {
        label: "All",
        key: "__all__",
        count: Object.values(categoryCountsMap).reduce((a:any, b:any) => a + b, 0),
      },
      ...allCategories.map((c) => ({
        label: c,
        key: c,
        count: categoryCountsMap[c] ?? 0,
      })),
    ];

    const vendorsUnified: Array<{ label: string; count: number; key: string }> = [
      {
        label: "All",
        key: "__all__",
        count: Object.values(vendorCountsMap).reduce((a:any, b:any) => a + b, 0),
      },
      ...allVendors.map((v) => ({
        label: v,
        key: v,
        count: vendorCountsMap[v] ?? 0,
      })),
    ];

    // Normalize product images
    const products = productsRaw.map((p: any) => ({
      ...p,
      imageUrl:
        (Array.isArray(p.images) && p.images[0]) ||
        p.imageUrl ||
        "/placeholder.svg",
    }));

    return NextResponse.json({
      products,
      categories: categoriesUnified, // unified array with All + items
      vendors: vendorsUnified,       // unified array with All + items
      total,
      totalPages,
      page: pageNum,
      limit: limitNum,
      sort,
      filters: {
        search,
        categories: categoriesSelected,
        vendors: vendorsSelected,
        stock,
      },
      meta: { route: "/api/products", ts: Date.now() },
    });
  } catch (error) {
    console.error("[GET /api/products] error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body == null || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const required = ["name", "price", "stock"];
    for (const k of required) {
      if (body[k] === undefined || body[k] === null || body[k] === "") {
        return NextResponse.json(
          { error: "Name, Price and Stock are required" },
          { status: 400 },
        );
      }
    }

    const client = await clientPromise;
    const db = client.db("zedexel");
    const collection = db.collection("products");

    const newProduct = {
      ...body,
      name: String(body.name).trim(),
      category: body.category ? String(body.category).trim() : "",
      vendor: body.vendor ? String(body.vendor).trim() : "",
      price: parseFloat(body.price),
      stock: parseInt(String(body.stock), 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newProduct);

    return NextResponse.json({
      message: "Product added successfully",
      productId: result.insertedId,
    });
  } catch (error) {
    console.error("[POST /api/products] error:", error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}
