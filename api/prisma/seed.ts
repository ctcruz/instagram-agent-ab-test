import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  // Apaga dados existentes para não duplicar
  await prisma.content.deleteMany();
  await prisma.promptTemplate.deleteMany();

  // Insere 3 templates de teste
  await prisma.promptTemplate.createMany({
    data: [
      {
        name: 'Friendly Casual',
        systemPrompt:
          'You are a friendly social media manager. Write Instagram captions in a casual, friendly tone. Include emojis where relevant.',
        alpha: 1,
        beta: 1,
        appearances: 0,
      },
      {
        name: 'Inspirational Motivator',
        systemPrompt:
          'You are an inspirational content creator. Write Instagram captions that motivate and inspire, using uplifting language and quotes.',
        alpha: 1,
        beta: 1,
        appearances: 0,
      },
      {
        name: 'Informative Expert',
        systemPrompt:
          'You are a knowledgeable expert. Write Instagram captions that provide clear, useful tips, and concise explanations in an authoritative tone.',
        alpha: 1,
        beta: 1,
        appearances: 0,
      },
    ],
  });

  console.log('✅ Seed concluído com sucesso!');

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
