import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { prisma } from "@/libs/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

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
