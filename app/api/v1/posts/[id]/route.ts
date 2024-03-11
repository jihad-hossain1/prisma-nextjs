// import prisma from "@/prisma";
import prisma from "../../../../../prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // request from params in data
    const { id } = params;

    // is post id are valid or not
    if (!id || id === "") {
      return NextResponse.json(
        { message: "Post id are not found" },
        { status: 400 }
      );
    }

    //find actual post
    const findPost = await prisma.post.findUnique({ where: { id: id } });

    //
    if (!findPost) {
      return NextResponse.json(
        { message: "Post are not found, try another way" },
        { status: 401 }
      );
    }

    return NextResponse.json(findPost);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
