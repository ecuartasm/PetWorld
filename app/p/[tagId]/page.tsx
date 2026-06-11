import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ tagId: string }> }): Promise<Metadata> {
  const { tagId } = await params;
  const pet = await prisma.pet.findUnique({ where: { tagId }, select: { name: true, species: true, breed: true } });
  if (!pet) return { title: "Mascota no encontrada - PawTag" };
  const desc = [pet.species === "DOG" ? "Perro" : pet.species === "CAT" ? "Gato" : "Mascota", pet.breed].filter(Boolean).join(" - ");
  return {
    title: `${pet.name} - PawTag`,
    description: `Perfil publico de ${pet.name}. ${desc}`,
  };
}

export default async function PublicPetPage({ params }: { params: Promise<{ tagId: string }> }) {
  const { tagId } = await params;

  const pet = await prisma.pet.findUnique({
    where: { tagId },
    select: {
      name: true,
      species: true,
      breed: true,
      avatarUrl: true,
      bio: true,
      ownerName: true,
      ownerPhone: true,
      altPhone: true,
      allergies: true,
      medications: true,
      conditions: true,
      vetName: true,
      vetPhone: true,
    },
  });

  if (!pet) notFound();

  const speciesLabel = pet.species === "DOG" ? "Perro" : pet.species === "CAT" ? "Gato" : "Mascota";
  const speciesEmoji = pet.species === "DOG" ? "🐶" : pet.species === "CAT" ? "🐱" : "🐾";
  const hasRecovery = pet.ownerPhone || pet.ownerName || pet.altPhone;
  const hasMedical = pet.allergies || pet.medications || pet.conditions || pet.vetName;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-primary-600 to-pink-600 px-4 py-3 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-white font-bold">
          <span>🐾</span> PawTag by PetWorld
        </Link>
      </div>

      {/* Hero */}
      <div className="relative flex flex-col items-center pt-8 pb-6 px-4">
        {pet.avatarUrl ? (
          <img
            src={pet.avatarUrl}
            alt={pet.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-200 to-pink-200 border-4 border-white shadow-xl flex items-center justify-center text-5xl">
            {speciesEmoji}
          </div>
        )}
        <h1 className="mt-4 text-3xl font-bold text-white">{pet.name}</h1>
        <p className="mt-1 text-gray-300">
          {speciesLabel}
          {pet.breed && ` · ${pet.breed}`}
        </p>
        {pet.bio && <p className="mt-2 text-sm text-gray-400 text-center max-w-sm">{pet.bio}</p>}
      </div>

      {/* Content */}
      <div className="mx-auto max-w-md px-4 pb-12 space-y-4">
        {/* Lost pet recovery */}
        {hasRecovery && (
          <section className="rounded-2xl bg-white p-5 shadow-lg">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
              <span>📞</span> Encontraste a esta mascota?
            </h2>
            {pet.ownerPhone && (
              <a
                href={`tel:${pet.ownerPhone}`}
                className="mt-3 flex items-center gap-3 rounded-xl bg-green-500 px-5 py-3.5 text-white font-semibold shadow-md hover:bg-green-600 transition-colors"
              >
                <span className="text-xl">📞</span>
                <span>
                  {pet.ownerName && <span className="block text-sm text-green-100">Llamar a {pet.ownerName}</span>}
                  <span className="text-lg">{pet.ownerPhone}</span>
                </span>
              </a>
            )}
            {pet.altPhone && (
              <p className="mt-2 text-sm text-gray-600">
                Alternativo:{" "}
                <a href={`tel:${pet.altPhone}`} className="text-primary-600 font-medium hover:underline">
                  {pet.altPhone}
                </a>
              </p>
            )}
          </section>
        )}

        {/* Medical info */}
        {hasMedical && (
          <section className="rounded-2xl bg-white p-5 shadow-lg">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
              <span>🏥</span> Informacion medica
            </h2>
            <div className="mt-3 space-y-3">
              {pet.allergies && (
                <div className="flex items-start gap-3">
                  <span className="text-lg">⚠️</span>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Alergias</p>
                    <p className="text-sm text-gray-900">{pet.allergies}</p>
                  </div>
                </div>
              )}
              {pet.medications && (
                <div className="flex items-start gap-3">
                  <span className="text-lg">💊</span>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Medicamentos</p>
                    <p className="text-sm text-gray-900">{pet.medications}</p>
                  </div>
                </div>
              )}
              {pet.conditions && (
                <div className="flex items-start gap-3">
                  <span className="text-lg">🏥</span>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Condiciones</p>
                    <p className="text-sm text-gray-900">{pet.conditions}</p>
                  </div>
                </div>
              )}
              {(pet.vetName || pet.vetPhone) && (
                <div className="flex items-start gap-3">
                  <span className="text-lg">🩺</span>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Veterinario</p>
                    <p className="text-sm text-gray-900">{pet.vetName}</p>
                    {pet.vetPhone && (
                      <a href={`tel:${pet.vetPhone}`} className="text-sm text-primary-600 hover:underline">
                        {pet.vetPhone}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Digital ID */}
        <section className="rounded-2xl bg-white p-5 shadow-lg">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
            <span>🏷️</span> Identificacion digital
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-500">Nombre</p>
              <p className="font-medium text-gray-900">{pet.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Especie</p>
              <p className="font-medium text-gray-900">{speciesLabel}</p>
            </div>
            {pet.breed && (
              <div className="col-span-2">
                <p className="text-xs text-gray-500">Raza</p>
                <p className="font-medium text-gray-900">{pet.breed}</p>
              </div>
            )}
          </div>
        </section>

        {/* Powered by */}
        <div className="pt-4 text-center">
          <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors">
            Powered by PawTag · PetWorld
          </Link>
        </div>
      </div>
    </div>
  );
}
