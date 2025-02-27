import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import createPrismaClient from "@/lib/createPrismaClient";
import { mapUser } from "@/lib/users.utils";
import { cookies } from "next/headers";

const prisma: PrismaClient = createPrismaClient()

export async function GET() {
    try {
        const cookieStore = await cookies(); // Await here
        const userCookie = cookieStore.get("user")?.value;
        const userFromToken = userCookie ? JSON.parse(userCookie) : null;
        const { id } = userFromToken;
        if(!id) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        }
  
        const user = await prisma.users.findFirst({
            where: {
                id: BigInt(id),
                isDeleted: false
            },
        });
  
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json(mapUser(user));
    } catch (error: any) {
        console.log("ERROR: ", error?.message)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  
  