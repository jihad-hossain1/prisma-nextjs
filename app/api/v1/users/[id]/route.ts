import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  //
  const { id } = params;
  //
  try {
    const user = await prisma.user.findUnique({
      //
      where: { id },

      //
      select: { id: true, name: true, email: true, role: true },
    });

    if (user) {
      return NextResponse.json({
        user,
        paths: [
          // {
          //   path: "path-one",
          //   name: "Path One",
          // },
          {
            path: "/affiliate/path-two",
            name: "Path Two",
            subPath: [
              {
                path: "menu-one",
                name: "Menu One",
              },
              {
                path: "menu-two",
                name: "Slice Two",
              },
            ],
          },
        ],
      });
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
