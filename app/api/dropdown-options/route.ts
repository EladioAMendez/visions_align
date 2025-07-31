import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prisma";

export async function GET(req: NextRequest) {
  try {

    const category = req.nextUrl.searchParams.get('category');

    // If category is specified, filter by it
    const whereClause = category ? { category, isActive: true } : { isActive: true };

    const options = await prisma.dropdownOption.findMany({
      where: whereClause,
      select: {
        id: true,
        category: true,
        value: true,
        label: true,
        sortOrder: true,
      },
      orderBy: [
        { category: 'asc' },
        { sortOrder: 'asc' },
      ],
    });

    // Group by category for easier frontend consumption
    const groupedOptions = options.reduce((acc, option) => {
      if (!acc[option.category]) {
        acc[option.category] = [];
      }
      acc[option.category].push({
        value: option.value,
        label: option.label,
        sortOrder: option.sortOrder,
      });
      return acc;
    }, {} as Record<string, Array<{ value: string; label: string; sortOrder: number }>>);

    return NextResponse.json({ 
      success: true, 
      options: category ? options : groupedOptions
    });

  } catch (error) {
    console.error("Error fetching dropdown options:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
