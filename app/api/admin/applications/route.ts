import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      include: {
        scholarship: true,
        user: true,
      },
      orderBy: {
        appliedAt: "desc",
      },
    });

    return NextResponse.json({ success: true, applications });
  } catch (error) {
    console.error("ADMIN APPLICATIONS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}