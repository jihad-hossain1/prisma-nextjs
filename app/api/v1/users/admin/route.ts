import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../../prisma";
import bcrypt from "bcrypt";

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.admin.findMany();

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const dataFromBody = await req.json();
    console.log(dataFromBody);
    const { name, aemail, password } = dataFromBody;

    if (name === "" && aemail === "" && password === "") {
      return NextResponse.json({
        message: "name aemail & password are required",
      });
    }

    const alreadyUser = await prisma.admin.findFirst({ where: { aemail } });
    if (alreadyUser) {
      return NextResponse.json(
        { message: "admin already exist" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.admin.create({
      data: {
        name,
        aemail,
        password: hashedPassword,
      },
    });
    console.log(user);

    return NextResponse.json({ message: "user are created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
