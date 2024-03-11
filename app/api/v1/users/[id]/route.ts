import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  //
  const { id } = params;
  console.log(id);
  //
  try {
    const user = await prisma.user.findUnique({
      //
      where: { id },

      //
      select: { id: true, name: true, email: true, posts: true },
    });

    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json(
        { message: "user are not found" },
        { status: 400 }
      );
    }
    //
  } catch (error: any) {
    //
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
