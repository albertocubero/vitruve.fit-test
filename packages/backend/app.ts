const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const athlete = await prisma.athlete.create({
    data: {
      name: 'John Doe',
      age: 18,
      team: 'Alpha',
      metrics: {
        create: [
          {
            metricType: 'Speed',
            value: 25.5,
            unit: 'km/h',
            timestamp: new Date(),
          },
          {
            metricType: 'Endurance',
            value: 60,
            unit: 'minutes',
            timestamp: new Date(),
          },
        ],
      },
    },
  });
  console.log(athlete);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
