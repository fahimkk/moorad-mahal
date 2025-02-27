import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import createPrismaClient from "@/lib/createPrismaClient";
import { mapUser } from "@/lib/users.utils";

const prisma: PrismaClient = createPrismaClient()

export async function POST(req: Request) {
  try {
    const reqData = await req.json()
    const { email, mobile, password, name } = reqData 

    if ((!email && !mobile) || !password || !name) {
      return NextResponse.json({ error: "(Email or Mobile), name and password are required" }, { status: 400 });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const userData = {
        password: hashedPassword,
        email,
        mobile: mobile ? String(mobile) : undefined,
        name,
        gender: reqData.gender,
        roles: reqData.roles,
    }

    // Create user in the database
    const user = await prisma.users.create({
      data: userData,
    });

    return NextResponse.json({ message: "User created successfully", user: mapUser(user) });
  } catch (error: any) {
    console.log("ERROR: ", error?.message)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
