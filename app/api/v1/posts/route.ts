import prisma from "@/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, slug, userId, body } = await req.json();

    if (!title || !slug || !userId || !body) {
      return NextResponse.json(
        { message: "all field are required" },
        { status: 400 }
      );
    }

    const isUser = await prisma.user.findUnique({ where: { id: userId } });

    if (!isUser) {
      return NextResponse.json(
        {
          message: "user are not found you are not able to create a post",
        },
        { status: 400 }
      );
    }

    await prisma.post.create({
      data: {
        title,
        slug,
        userId,
        body,
      },
    });

    return NextResponse.json({ message: "post created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
