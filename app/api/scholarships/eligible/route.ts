import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getCurrentUser } from "@/app/lib/auth";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get logged-in user
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

    // Get student profile
    const profile = await prisma.studentProfile.findUnique({
      where: {
        userId: currentUser.userId,
      },
    });

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete your profile first.",
        },
        { status: 400 }
      );
    }

    // Get all scholarships
    const scholarships = await prisma.scholarship.findMany({
      orderBy: {
        deadline: "asc",
      },
    });

    // Match scholarships with student profile
    const eligibleScholarships = scholarships.filter(
      (scholarship) => {

        // State check
        const stateMatch =
          !scholarship.state ||
          scholarship.state === "All" ||
          scholarship.state === profile.state;

        // Category check
        const categoryMatch =
          !scholarship.category ||
          scholarship.category === "All" ||
          scholarship.category === profile.category;

        // Course check
        const courseMatch =
          !scholarship.course ||
          scholarship.course === "All" ||
          scholarship.course === profile.course;

        // Year check
        const yearMatch =
          !scholarship.year ||
          scholarship.year === "All" ||
          scholarship.year === profile.year;

        // Percentage check
        const percentageMatch =
          scholarship.minPercentage == null ||
          (profile.percentage != null &&
            profile.percentage >= scholarship.minPercentage);

        // Family income check
        const incomeMatch =
          scholarship.maxIncome == null ||
          (profile.familyIncome != null &&
            profile.familyIncome <= scholarship.maxIncome);

        return (
          stateMatch &&
          categoryMatch &&
          courseMatch &&
          yearMatch &&
          percentageMatch &&
          incomeMatch
        );
      }
    );

    return NextResponse.json({
      success: true,
      profile,
      scholarships: eligibleScholarships,
      count: eligibleScholarships.length,
    });

  } catch (error) {
    console.error("Eligibility Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to find eligible scholarships.",
      },
      { status: 500 }
    );
  }
}