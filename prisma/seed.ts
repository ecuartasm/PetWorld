import { PrismaClient } from "@prisma/client";
import { hash } from "argon2";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const passwordHash = await hash("demo1234");

  const user = await prisma.user.upsert({
    where: { email: "demo@petworld.co" },
    update: {},
    create: {
      email: "demo@petworld.co",
      passwordHash,
      displayName: "Maria Lopez",
      phone: "+57 310 555 1234",
      city: "Manizales",
      consentVersion: "1.0",
      consentTimestamp: new Date(),
    },
  });

  console.log(`Created user: ${user.email}`);

  const pet1 = await prisma.pet.upsert({
    where: { id: "seed-pet-luna" },
    update: {},
    create: {
      id: "seed-pet-luna",
      ownerId: user.id,
      name: "Luna",
      species: "DOG",
      breed: "Golden Retriever",
      birthDate: new Date("2021-03-15"),
      sex: "FEMALE",
      weightKg: 28.5,
      bio: "Luna es una golden retriever juguetona que ama los paseos en el parque y nadar en el rio.",
    },
  });

  const pet2 = await prisma.pet.upsert({
    where: { id: "seed-pet-milo" },
    update: {},
    create: {
      id: "seed-pet-milo",
      ownerId: user.id,
      name: "Milo",
      species: "CAT",
      breed: "Siames",
      birthDate: new Date("2022-08-01"),
      sex: "MALE",
      weightKg: 4.2,
      bio: "Milo es un gato siames curioso y cariñoso. Le encanta dormir al sol y jugar con su raton de juguete.",
    },
  });

  console.log(`Created pets: ${pet1.name}, ${pet2.name}`);
  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
