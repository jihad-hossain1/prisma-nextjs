import prisma from "../../../../prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();
    console.log("data info from server req: ", data);
    if (!data.email || data.email == "") {
      return NextResponse.json(
        { message: "email is required" },
        { status: 401 }
      );
    } else if (!data.content || data.content == "") {
      return NextResponse.json(
        { message: "content is required" },
        { status: 401 }
      );
    }

    const newBlog = await prisma.blog.create({
      data: {
        email: data.email,
        content: data.content,
      },
    });

    return NextResponse.json(newBlog);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany();

    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
