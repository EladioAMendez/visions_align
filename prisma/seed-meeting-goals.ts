import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultMeetingGoals = [
  {
    value: 'PROJECT_UPDATE',
    label: 'Project Update',
    description: 'Status reports, progress reviews, milestone check-ins',
    sortOrder: 1,
  },
  {
    value: 'BUDGET_ASK',
    label: 'Budget Ask',
    description: 'Resource requests, funding proposals, investment pitches',
    sortOrder: 2,
  },
  {
    value: 'NEW_IDEA_PITCH',
    label: 'New Idea Pitch',
    description: 'Innovation proposals, new initiatives, creative concepts',
    sortOrder: 3,
  },
  {
    value: 'PERFORMANCE_REVIEW',
    label: 'Performance Review',
    description: 'Performance discussions, feedback sessions, career conversations',
    sortOrder: 4,
  },
  {
    value: 'STRATEGIC_ALIGNMENT',
    label: 'Strategic Alignment',
    description: 'Strategic planning, goal setting, vision alignment',
    sortOrder: 5,
  },
  {
    value: 'PROBLEM_SOLVING',
    label: 'Problem Solving',
    description: 'Issue resolution, troubleshooting, crisis management',
    sortOrder: 6,
  },
  {
    value: 'STAKEHOLDER_ALIGNMENT',
    label: 'Stakeholder Alignment',
    description: 'Getting buy-in, consensus building, coalition formation',
    sortOrder: 7,
  },
];

async function seedMeetingGoals() {
  console.log('🌱 Seeding meeting goals...');

  for (const goal of defaultMeetingGoals) {
    await prisma.meetingGoalOption.upsert({
      where: { value: goal.value },
      update: {
        label: goal.label,
        description: goal.description,
        sortOrder: goal.sortOrder,
        isActive: true,
      },
      create: goal,
    });
  }

  console.log('✅ Meeting goals seeded successfully!');
}

async function main() {
  try {
    await seedMeetingGoals();
  } catch (error) {
    console.error('❌ Error seeding meeting goals:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}

export { seedMeetingGoals };
