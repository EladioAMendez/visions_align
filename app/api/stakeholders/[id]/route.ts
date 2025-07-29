import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/next-auth';
import { prisma } from '@/libs/prisma';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, linkedinUrl, title, company, influence, relationship } = await req.json();
    const stakeholderId = params.id;

    if (!name || !linkedinUrl) {
      return NextResponse.json({ error: 'Name and LinkedIn URL are required' }, { status: 400 });
    }

    // Verify the stakeholder belongs to the current user
    const existingStakeholder = await prisma.stakeholder.findFirst({
      where: {
        id: stakeholderId,
        userId: session.user.id,
      },
    });

    if (!existingStakeholder) {
      return NextResponse.json({ error: 'Stakeholder not found' }, { status: 404 });
    }

    const updatedStakeholder = await prisma.stakeholder.update({
      where: { id: stakeholderId },
      data: {
        name,
        linkedinUrl,
        title,
        company,
        influence: influence || 'MEDIUM',
        relationship: relationship || 'NEUTRAL',
      },
    });

    return NextResponse.json(updatedStakeholder, { status: 200 });
  } catch (error) {
    console.error('Error updating stakeholder:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const stakeholderId = params.id;

    // Verify the stakeholder belongs to the current user
    const existingStakeholder = await prisma.stakeholder.findFirst({
      where: {
        id: stakeholderId,
        userId: session.user.id,
      },
    });

    if (!existingStakeholder) {
      return NextResponse.json({ error: 'Stakeholder not found' }, { status: 404 });
    }

    await prisma.stakeholder.delete({
      where: { id: stakeholderId },
    });

    return NextResponse.json({ message: 'Stakeholder deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting stakeholder:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
