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

export async function PUT(request: NextRequest, { params }) {
  const id = params.id;
  try {
    const { title, body } = await request.json();

    // check id valid
    if (!id || id == "" || id == null || id == 0) {
      return NextResponse.json(
        { message: "post id is required" },
        { status: 400 }
      );
    }

    if (title == "" || !title) {
      return NextResponse.json({ message: "title is empty" }, { status: 400 });
    } else if (body == "" || !body) {
      return NextResponse.json(
        { message: "content is empty" },
        { status: 400 }
      );
    }

    const updatePost = await prisma.post.update({
      where: { id },
      data: {
        title,
        body,
      },
    });

    return NextResponse.json(
      { message: "Post updated successfull.", updatePost },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }) {
  const id = params.id;

  try {
    const { userId } = await request.json();

    // check id valid
    if (!id || id == "" || id == null || id == 0) {
      return NextResponse.json(
        { message: "post id is required" },
        { status: 400 }
      );
    }

    const findPost = await prisma.post.findFirst({
      where: { id },
    });

    if (findPost?.userId !== userId) {
      return NextResponse.json(
        { message: "user are not same" },
        { status: 400 }
      );
    }

    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ message: "post is deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}