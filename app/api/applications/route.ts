import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getCurrentUser } from "@/app/lib/auth";

const prisma = new PrismaClient();

// GET - Get current user's applications
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login first.",
        },
        { status: 401 }
      );
    }

    const applications =
      await prisma.application.findMany({
        where: {
          userId: user.userId,
        },
        include: {
          scholarship: true,
        },
        orderBy: {
          appliedAt: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      applications,
      count: applications.length,
    });
  } catch (error) {
    console.error(
      "Get Applications Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch applications.",
      },
      { status: 500 }
    );
  }
}

// POST - Apply for scholarship
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login first.",
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

    // Check scholarship
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

    // Check duplicate application
    const existingApplication =
      await prisma.application.findUnique({
        where: {
          userId_scholarshipId: {
            userId: user.userId,
            scholarshipId: scholarshipId,
          },
        },
      });

    if (existingApplication) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You have already applied for this scholarship.",
        },
        { status: 400 }
      );
    }

    // Create application
    const application =
      await prisma.application.create({
        data: {
          userId: user.userId,
          scholarshipId: scholarshipId,
          status: "Applied",
        },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Application saved successfully.",
        application,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Application API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to save application.",
      },
      { status: 500 }
    );
  }
}