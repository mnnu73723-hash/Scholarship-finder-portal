import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getCurrentUser } from "@/app/lib/auth";

const prisma = new PrismaClient();

// GET saved scholarships
export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not logged in.",
        },
        { status: 401 }
      );
    }

    const savedScholarships =
      await prisma.savedScholarship.findMany({
        where: {
          userId: currentUser.userId,
        },
        include: {
          scholarship: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      savedScholarships,
    });
  } catch (error) {
    console.error("Get Saved Scholarships Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch saved scholarships.",
      },
      { status: 500 }
    );
  }
}

// SAVE scholarship
export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not logged in.",
        },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { scholarshipId } = body;

    if (!scholarshipId) {
      return NextResponse.json(
        {
          success: false,
          message: "Scholarship ID is required.",
        },
        { status: 400 }
      );
    }

    // Check scholarship exists
    const scholarship =
      await prisma.scholarship.findUnique({
        where: {
          id: scholarshipId,
        },
      });

    if (!scholarship) {
      return NextResponse.json(
        {
          success: false,
          message: "Scholarship not found.",
        },
        { status: 404 }
      );
    }

    // Check already saved
    const existing =
      await prisma.savedScholarship.findUnique({
        where: {
          userId_scholarshipId: {
            userId: currentUser.userId,
            scholarshipId,
          },
        },
      });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Scholarship already saved.",
        },
        { status: 400 }
      );
    }

    const savedScholarship =
      await prisma.savedScholarship.create({
        data: {
          userId: currentUser.userId,
          scholarshipId,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message: "Scholarship saved successfully! ❤️",
        savedScholarship,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Save Scholarship Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save scholarship.",
      },
      { status: 500 }
    );
  }
}

// UNSAVE scholarship
export async function DELETE(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not logged in.",
        },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { scholarshipId } = body;

    if (!scholarshipId) {
      return NextResponse.json(
        {
          success: false,
          message: "Scholarship ID is required.",
        },
        { status: 400 }
      );
    }

    const savedScholarship =
      await prisma.savedScholarship.findUnique({
        where: {
          userId_scholarshipId: {
            userId: currentUser.userId,
            scholarshipId,
          },
        },
      });

    if (!savedScholarship) {
      return NextResponse.json(
        {
          success: false,
          message: "Scholarship is not saved.",
        },
        { status: 404 }
      );
    }

    await prisma.savedScholarship.delete({
      where: {
        id: savedScholarship.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Scholarship removed from saved list.",
    });
  } catch (error) {
    console.error("Unsave Scholarship Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to remove scholarship.",
      },
      { status: 500 }
    );
  }
}