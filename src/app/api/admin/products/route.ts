import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET all products with pagination + sorting
export async function GET(req: NextRequest) {
    try {
      const { search, category, vendor, stock, sort, page = "1", limit = "12" } =
        Object.fromEntries(req.nextUrl.searchParams);
  
      const client = await clientPromise;
      const db = client.db("test");
      const collection = db.collection("products");
  
      const query: any = {};
      if (search) query.name = { $regex: search, $options: "i" };
      if (category) query.category = category;
      if (vendor) query.vendor = vendor;
      if (stock === "in") query.stock = { $gt: 0 };
      if (stock === "out") query.stock = 0;
  
      // Sorting
      const sortOptions: any = {};
      switch (sort) {
        case "latestCreated":
          sortOptions.createdAt = -1;
          break;
        case "latestUpdated":
          sortOptions.updatedAt = -1;
          break;
        case "priceAsc":
          sortOptions.price = 1;
          break;
        case "priceDesc":
          sortOptions.price = -1;
          break;
        case "nameAsc":
          sortOptions.name = 1;
          break;
        case "nameDesc":
          sortOptions.name = -1;
          break;
        default:
          sortOptions.updatedAt = -1;
      }
  
      const skip = (parseInt(page) - 1) * parseInt(limit);
  
      const products = await collection
        .find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .toArray();
  
      const total = await collection.countDocuments(query);
      const totalPages = Math.ceil(total / parseInt(limit));
  
      // ✅ Distinct values for filters
      const categories = await collection.distinct("category");
      const vendors = await collection.distinct("vendor");
  
      return NextResponse.json({
        products,
        categories,
        vendors,
        totalPages,
        total,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: 500 }
      );
    }
  }

// POST - Add a new product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.price || !body.stock) {
      return NextResponse.json(
        { error: "Name, Price and Stock are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("test");
    const collection = db.collection("products");

    const newProduct = {
      ...body,
      price: parseFloat(body.price),
      stock: parseInt(body.stock),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newProduct);

    return NextResponse.json({
      message: "Product added successfully",
      productId: result.insertedId,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
