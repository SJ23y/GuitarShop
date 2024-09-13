import { PrismaClient } from '@prisma/client';
import { GuitarGenerator } from '../../guitar-generator/guitar-generator.interface.js';
import { DefaultGuitarGenerator } from '../../guitar-generator/guitar-generator.js';


async function seedDb(count: number, prismaClient: PrismaClient, guitarGenerator: GuitarGenerator) {

  for (let i = 0; i < count; i++) {
    const newGuitar = guitarGenerator.generate();
    await prismaClient.guitar.create({
      data: {
        ...newGuitar
      }
    });
  }
  console.info('Database was filled')
}

async function bootstrap() {
  const prismaClient = new PrismaClient();
  const guitarGenerator = new DefaultGuitarGenerator()

  try {
    await seedDb(15, prismaClient, guitarGenerator);
    globalThis.process.exit(0);
  } catch(error: unknown) {
    console.error(error);
    globalThis.process.exit(1)
  } finally {
    await prismaClient.$disconnect;
    console.log('Prisma client disconnected')
  }
}

bootstrap();
