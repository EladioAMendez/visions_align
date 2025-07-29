const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding dropdown options...');

  // Seed influence options
  const influenceOptions = [
    { value: 'HIGH', label: 'High Influence', description: 'C-level executives, VPs, department heads who can make final decisions', sortOrder: 1 },
    { value: 'MEDIUM', label: 'Medium Influence', description: 'Senior managers, team leads who influence decisions but may need approval', sortOrder: 2 },
    { value: 'LOW', label: 'Low Influence', description: 'Individual contributors, junior staff with limited decision-making power', sortOrder: 3 },
  ];

  // Seed relationship options
  const relationshipOptions = [
    { value: 'ALLY', label: 'Strong Ally', description: 'Supportive, advocates for your ideas, trusted relationship', sortOrder: 1 },
    { value: 'NEUTRAL', label: 'Neutral', description: 'Professional but no strong opinion either way, needs convincing', sortOrder: 2 },
    { value: 'SKEPTICAL', label: 'Skeptical', description: 'Has concerns or doubts, requires more evidence/persuasion', sortOrder: 3 },
    { value: 'OPPONENT', label: 'Opponent', description: 'Actively resistant to your ideas, may need different approach', sortOrder: 4 },
  ];

  // Insert influence options
  for (const option of influenceOptions) {
    await prisma.dropdownOption.upsert({
      where: { category_value: { category: 'influence', value: option.value } },
      update: {
        label: option.label,
        description: option.description,
        sortOrder: option.sortOrder,
      },
      create: {
        category: 'influence',
        value: option.value,
        label: option.label,
        description: option.description,
        sortOrder: option.sortOrder,
      },
    });
  }

  // Insert relationship options
  for (const option of relationshipOptions) {
    await prisma.dropdownOption.upsert({
      where: { category_value: { category: 'relationship', value: option.value } },
      update: {
        label: option.label,
        description: option.description,
        sortOrder: option.sortOrder,
      },
      create: {
        category: 'relationship',
        value: option.value,
        label: option.label,
        description: option.description,
        sortOrder: option.sortOrder,
      },
    });
  }

  console.log('✅ Dropdown options seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
