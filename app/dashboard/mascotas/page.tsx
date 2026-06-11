import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { DeletePetButton } from "@/components/delete-pet-button";

export const dynamic = "force-dynamic";

export default async function MascotasPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const pets = await prisma.pet.findMany({
    where: { ownerId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Mis mascotas</h1>
        <Link
          href="/dashboard/mascotas/nuevo"
          className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 transition-colors"
        >
          + Agregar mascota
        </Link>
      </div>

      {pets.length === 0 ? (
        <div className="mt-12 text-center">
          <span className="text-5xl" aria-hidden="true">🐾</span>
          <h2 className="mt-4 text-lg font-semibold text-gray-900">No tienes mascotas registradas</h2>
          <p className="mt-2 text-sm text-gray-600">
            Agrega tu primera mascota para comenzar a usar PetWorld.
          </p>
          <Link
            href="/dashboard/mascotas/nuevo"
            className="mt-6 inline-block rounded-lg bg-primary-500 px-6 py-2.5 font-semibold text-white shadow-sm hover:bg-primary-600 transition-colors"
          >
            Agregar mi primera mascota
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{pet.name}</h3>
                  <p className="text-sm text-gray-600">
                    {pet.species === "DOG" ? "Perro" : pet.species === "CAT" ? "Gato" : "Otro"}
                    {pet.breed && ` - ${pet.breed}`}
                  </p>
                  {pet.bio && (
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">{pet.bio}</p>
                  )}
                </div>
                <span className="text-2xl" aria-hidden="true">
                  {pet.species === "DOG" ? "🐕" : pet.species === "CAT" ? "🐈" : "🐾"}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/dashboard/mascotas/${pet.id}`}
                  className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Ver perfil
                </Link>
                <Link
                  href={`/dashboard/mascotas/${pet.id}/editar`}
                  className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Editar
                </Link>
                <DeletePetButton petId={pet.id} petName={pet.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
