import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ================= GET ALL SCHOLARSHIPS =================

export async function GET() {
  try {
    const scholarships = await prisma.scholarship.findMany({
      orderBy: {
        deadline: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      scholarships,
    });
  } catch (error) {
    console.error("Scholarship Fetch Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch scholarships.",
      },
      { status: 500 }
    );
  }
}

// ================= POST NEW SCHOLARSHIP =================

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      provider,
      description,
      state,
      category,
      course,
      year,
      minPercentage,
      maxIncome,
      amount,
      deadline,
      applicationLink,
    } = body;

    // Required fields
    if (!title || !provider) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and provider are required.",
        },
        { status: 400 }
      );
    }

    const scholarship = await prisma.scholarship.create({
      data: {
        title,
        provider,
        description,
        state,
        category,
        course,
        year,

        minPercentage:
          minPercentage !== ""
            ? Number(minPercentage)
            : null,

        maxIncome:
          maxIncome !== ""
            ? Number(maxIncome)
            : null,

        amount:
          amount !== ""
            ? Number(amount)
            : null,

        deadline: deadline
          ? new Date(deadline)
          : null,

        applicationLink,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Scholarship created successfully.",
        scholarship,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Scholarship Create Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create scholarship.",
      },
      { status: 500 }
    );
  }
}

// ================= DELETE SCHOLARSHIP =================

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const { id } = body;

    // Check ID
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Scholarship ID is required.",
        },
        { status: 400 }
      );
    }

    // Check if scholarship exists
    const scholarship = await prisma.scholarship.findUnique({
      where: {
        id: id,
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

    // Delete scholarship
    await prisma.scholarship.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Scholarship deleted successfully.",
    });
  } catch (error) {
    console.error("Scholarship Delete Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete scholarship.",
      },
      { status: 500 }
    );
  }
}