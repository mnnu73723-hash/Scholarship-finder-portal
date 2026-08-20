import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const [totalScholarships, totalUsers, totalApplications, totalMessages] =
      await Promise.all([
        prisma.scholarship.count(),
        prisma.user.count(),
        prisma.application.count(),
        prisma.contactMessage.count(),
      ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalScholarships,
        totalUsers,
        totalApplications,
        totalMessages,
      },
    });
  } catch (error) {
    console.error("STATS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}