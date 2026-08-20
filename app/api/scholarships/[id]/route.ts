import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Scholarship ID is required" },
        { status: 400 }
      );
    }

    const scholarship = await prisma.scholarship.findUnique({
      where: { id },
    });

    if (!scholarship) {
      return NextResponse.json(
        { error: "Scholarship not found" },
        { status: 404 }
      );
    }

    // Delete saved scholarship records first
    await prisma.savedScholarship.deleteMany({
      where: {
        scholarshipId: id,
      },
    });

    // Delete applications linked to this scholarship
    await prisma.application.deleteMany({
      where: {
        scholarshipId: id,
      },
    });

    // Now delete the scholarship
    await prisma.scholarship.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Scholarship deleted successfully",
    });
  } catch (error) {
    console.error("DELETE SCHOLARSHIP ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete scholarship" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const scholarship = await prisma.scholarship.findUnique({
      where: { id },
    });

    if (!scholarship) {
      return NextResponse.json(
        { error: "Scholarship not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, scholarship });
  } catch (error) {
    console.error("GET SCHOLARSHIP ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch scholarship" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const scholarship = await prisma.scholarship.findUnique({
      where: { id },
    });

    if (!scholarship) {
      return NextResponse.json(
        { error: "Scholarship not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.scholarship.update({
      where: { id },
      data: {
        title: body.title,
        provider: body.provider,
        description: body.description,
        state: body.state,
        category: body.category,
        course: body.course,
        year: body.year,
        minPercentage: body.minPercentage ? parseFloat(body.minPercentage) : null,
        maxIncome: body.maxIncome ? parseFloat(body.maxIncome) : null,
        amount: body.amount ? parseFloat(body.amount) : null,
        deadline: body.deadline ? new Date(body.deadline) : null,
        applicationLink: body.applicationLink,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Scholarship updated successfully",
      scholarship: updated,
    });
  } catch (error) {
    console.error("UPDATE SCHOLARSHIP ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update scholarship" },
      { status: 500 }
    );
  }
}