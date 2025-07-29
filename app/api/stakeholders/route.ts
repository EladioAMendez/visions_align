import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/next-auth';
import { prisma } from '@/libs/prisma';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, linkedinUrl, title, company, influence, relationship } = await req.json();

    if (!name || !linkedinUrl) {
      return NextResponse.json({ error: 'Name and LinkedIn URL are required' }, { status: 400 });
    }

    const stakeholder = await prisma.stakeholder.create({
      data: {
        name,
        linkedinUrl,
        title,
        company,
        influence: influence || 'MEDIUM',
        relationship: relationship || 'NEUTRAL',
        userId: session.user.id,
      },
    });

    return NextResponse.json(stakeholder, { status: 201 });
  } catch (error) {
    console.error('Error creating stakeholder:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
