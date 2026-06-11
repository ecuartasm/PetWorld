import { redirect, notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PetForm } from "@/components/pet-form";

export const dynamic = "force-dynamic";

export default async function EditarMascotaPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const { id } = await params;
  const pet = await prisma.pet.findUnique({ where: { id } });

  if (!pet) notFound();
  if (pet.ownerId !== user.id) redirect("/dashboard/mascotas");

  const petData = {
    id: pet.id,
    name: pet.name,
    species: pet.species,
    breed: pet.breed,
    birthDate: pet.birthDate ? pet.birthDate.toISOString() : null,
    sex: pet.sex,
    weightKg: pet.weightKg,
    bio: pet.bio,
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900">Editar a {pet.name}</h1>
      <p className="mt-2 text-sm text-gray-600">Actualiza la informacion de tu mascota.</p>
      <div className="mt-6">
        <PetForm pet={petData} mode="edit" />
      </div>
    </div>
  );
}
