import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === "admin@gmail.com" && password === "admin@123") {
    const token = jwt.sign({ email }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h",
    });

    const res = NextResponse.json({ success: true });
    res.cookies.set("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",          // 🔑 required so /admin can access it
        sameSite: "lax",    // prevents cross-site issues
      });
      
    return res;
  }

  return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
}
