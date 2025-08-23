import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const DB_NAME = "zedexel";
const COLLECTION = "products";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const product = await db
      .collection(COLLECTION)
      .findOne({ _id: new ObjectId(params.id) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      const { id } = await params; // ✅ must await params
      if (!ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
      }
  
      const body = await req.json();
      delete body._id; // ✅ prevent immutable _id update
  
      const client = await clientPromise;
      const db = client.db(DB_NAME);
  
      const result = await db
        .collection(COLLECTION)
        .updateOne({ _id: new ObjectId(id) }, { $set: body });
  
      return NextResponse.json({ success: true, result });
    } catch (error) {
      console.error("PUT error:", error);
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
  }
  

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const result = await db
      .collection(COLLECTION)
      .deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
