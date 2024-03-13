import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../prisma";
import bcrypt from "bcrypt";

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const dataFromBody = await req.json();
    console.log(dataFromBody);
    const { name, email, password } = dataFromBody;

    if (name === "" && email === "" && password === "") {
      return NextResponse.json({
        message: "name email & password are required",
      });
    }

    const alreadyUser = await prisma.user.findFirst({ where: { email } });
    if (alreadyUser) {
      return NextResponse.json(
        { message: "user already exist" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    console.log(user);

    return NextResponse.json({ message: "user are created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
