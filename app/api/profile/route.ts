import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getCurrentUser } from "@/app/lib/auth";

const prisma = new PrismaClient();

// GET PROFILE
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

    const profile = await prisma.studentProfile.findUnique({
      where: {
        userId: currentUser.userId,
      },
    });

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}

// CREATE / UPDATE PROFILE
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

    const {
      state,
      category,
      course,
      year,
      percentage,
      familyIncome,
    } = body;

    const profile = await prisma.studentProfile.upsert({
      where: {
        userId: currentUser.userId,
      },

      update: {
        state,
        category,
        course,
        year,
        percentage: Number(percentage),
        familyIncome: Number(familyIncome),
      },

      create: {
        userId: currentUser.userId,
        state,
        category,
        course,
        year,
        percentage: Number(percentage),
        familyIncome: Number(familyIncome),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Profile saved successfully.",
        profile,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Save Profile Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}