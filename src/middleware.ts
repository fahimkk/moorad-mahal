'use server';

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow public APIs to be accessed without authentication
    if (
        pathname === "/api/auth/login" ||
        pathname === "/api/auth/register" ||
        pathname.startsWith("/api/public")
    ) {
      return NextResponse.next();
    }
    // For protected routes, check authorization
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // return NextResponse.redirect(new URL("/login", request.url));
    }

    const token = authHeader.split(" ")[1];

    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);

        // Check Expiry Time
        const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
        if (payload?.exp && payload.exp < currentTime) {
            return NextResponse.json({ error: "Token Expired" }, { status: 401 });
        }
        // Store user data in cookies
        const response = NextResponse.next();
        response.cookies.set({
            name: "user",
            value: JSON.stringify(payload),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies only in production
            path: "/",
        });
        return response
    } catch (error) {
        console.log("ERROR: ", error)
        return NextResponse.json({ error: "Invalid Token" }, { status: 403 });
    }
}

export const config = {
    matcher: [
        "/api/protected/:path*",
        "/api/auth/:path*"
    ]
}