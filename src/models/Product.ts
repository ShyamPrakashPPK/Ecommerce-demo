// models/Product.ts
import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    vendor: { type: String, required: true },
    brand: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);
export default Product;
