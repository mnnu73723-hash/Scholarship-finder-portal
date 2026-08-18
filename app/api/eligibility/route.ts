import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      state,
      category,
      course,
      year,
      percentage,
      familyIncome,
    } = body;

    // Check required fields
    if (
      !state ||
      !category ||
      !course ||
      !year ||
      percentage === undefined ||
      familyIncome === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    const percentageNumber = Number(percentage);
    const incomeNumber = Number(familyIncome);

    if (
      Number.isNaN(percentageNumber) ||
      Number.isNaN(incomeNumber)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Percentage and family income must be valid numbers.",
        },
        { status: 400 }
      );
    }

    // Get all scholarships
    const scholarships =
      await prisma.scholarship.findMany();

    // Match scholarships
    const eligibleScholarships =
      scholarships.filter((scholarship) => {

        // State
        const stateMatch =
          !scholarship.state ||
          scholarship.state === "All India" ||
          scholarship.state
            .toLowerCase() === state.toLowerCase();

        // Category
        const categoryMatch =
          !scholarship.category ||
          scholarship.category
            .toLowerCase() === category.toLowerCase();

        // Course
        const courseMatch =
          !scholarship.course ||
          scholarship.course
            .toLowerCase() === course.toLowerCase();

        // Year
        const yearMatch =
          !scholarship.year ||
          scholarship.year
            .toLowerCase() === year.toLowerCase();

        // Minimum percentage
        const percentageMatch =
          scholarship.minPercentage == null ||
          percentageNumber >=
            scholarship.minPercentage;

        // Maximum income
        const incomeMatch =
          scholarship.maxIncome == null ||
          incomeNumber <= scholarship.maxIncome;

        return (
          stateMatch &&
          categoryMatch &&
          courseMatch &&
          yearMatch &&
          percentageMatch &&
          incomeMatch
        );
      });

    return NextResponse.json(
      {
        success: true,
        scholarships: eligibleScholarships,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error(
      "Eligibility API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to check eligibility.",
      },
      { status: 500 }
    );
  }
}