import { PrismaClient, CategoryType } from '@prisma/client'; // <-- import CategoryType
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@lifechrono.com' },
    update: {},
    create: {
      email: 'demo@lifechrono.com',
      name: 'Demo User',
      password: 'demo123', // ideally hashed
    },
  });

  const categories = [
    { name: 'Deep Work', color: '#FF5733', type: CategoryType.PRODUCTIVE },
    { name: 'Rest & Sleep', color: '#3498DB', type: CategoryType.RESTORATION },
    { name: 'Leisure', color: '#9B59B6', type: CategoryType.LEISURE },
    { name: 'Fitness', color: '#2ECC71', type: CategoryType.PRODUCTIVE },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        userId_name: {
          userId: user.id,
          name: category.name,
        },
      },
      update: {},
      create: {
        ...category,
        userId: user.id,
      },
    });
  }

  console.log('✅ Default user and categories seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
