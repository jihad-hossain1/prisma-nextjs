import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  try {
    const blog = await prisma.blog.findFirst({
      where: { id: id },
      select: {
        id: true,
        content: true,
      },
    });

    if (!blog) {
      return NextResponse.json(
        { message: "blog are not found" },
        { status: 401 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
