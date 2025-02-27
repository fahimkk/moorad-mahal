import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import createPrismaClient from "@/lib/createPrismaClient";
import { mapUser } from "@/lib/users.utils";
import { SignJWT } from "jose";

const prisma: PrismaClient = createPrismaClient()
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(req: Request) {
  try {
    const { email, mobile, password } = await req.json();
    if(!email && !mobile) {
        return NextResponse.json({ error: 'Invalid email and mobile' }, { status: 401 })
    }

    const orQuery: Array<{ email?: string; mobile?: string }> =  []

    if (email) orQuery.push({email: email})
    if (mobile) orQuery.push({mobile: String(mobile)})


    const user = await prisma.users.findFirst({
        where: {
            OR: orQuery,
            isDeleted: false
        },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await new SignJWT({ id: Number(user.id), email: user.email, mobile: user.mobile, role: user.roles })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(SECRET_KEY);


    return NextResponse.json({ token, user: mapUser(user) });
  } catch (error: any) {
    console.log("ERROR: ", error?.message)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

