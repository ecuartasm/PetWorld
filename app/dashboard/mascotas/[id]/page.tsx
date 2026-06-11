import { redirect, notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { PawTagSection } from "@/components/pawtag-section";

export const dynamic = "force-dynamic";

export default async function PetProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const { id } = await params;
  const pet = await prisma.pet.findUnique({ where: { id } });

  if (!pet) notFound();
  if (pet.ownerId !== user.id) redirect("/dashboard/mascotas");

  const speciesLabel = pet.species === "DOG" ? "Perro" : pet.species === "CAT" ? "Gato" : "Otro";
  const sexLabel = pet.sex === "MALE" ? "Macho" : pet.sex === "FEMALE" ? "Hembra" : "No especificado";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-4xl" aria-hidden="true">
            {pet.species === "DOG" ? "🐕" : pet.species === "CAT" ? "🐈" : "🐾"}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{pet.name}</h1>
            <p className="text-sm text-gray-600">
              {speciesLabel}
              {pet.breed && ` - ${pet.breed}`}
            </p>
          </div>
        </div>
        <Link
          href={`/dashboard/mascotas/${pet.id}/editar`}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Editar
        </Link>
      </div>

      {pet.bio && (
        <p className="mt-6 text-gray-600 leading-relaxed">{pet.bio}</p>
      )}

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Informacion</h2>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Especie</dt>
            <dd className="mt-1 text-sm text-gray-900">{speciesLabel}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Sexo</dt>
            <dd className="mt-1 text-sm text-gray-900">{sexLabel}</dd>
          </div>
          {pet.breed && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Raza</dt>
              <dd className="mt-1 text-sm text-gray-900">{pet.breed}</dd>
            </div>
          )}
          {pet.birthDate && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Fecha de nacimiento</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(pet.birthDate).toLocaleDateString("es-CO")}
              </dd>
            </div>
          )}
          {pet.weightKg && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Peso</dt>
              <dd className="mt-1 text-sm text-gray-900">{pet.weightKg} kg</dd>
            </div>
          )}
        </dl>
      </div>

      {/* PawTag Section */}
      <PawTagSection
        petId={pet.id}
        tagId={pet.tagId}
        petName={pet.name}
        ownerName={pet.ownerName}
        ownerPhone={pet.ownerPhone}
        altPhone={pet.altPhone}
        allergies={pet.allergies}
        medications={pet.medications}
        conditions={pet.conditions}
        vetName={pet.vetName}
        vetPhone={pet.vetPhone}
      />

      <div className="mt-8">
        <Link
          href="/dashboard/mascotas"
          className="text-sm text-primary-600 hover:underline"
        >
          &larr; Volver a mis mascotas
        </Link>
      </div>
    </div>
  );
}
