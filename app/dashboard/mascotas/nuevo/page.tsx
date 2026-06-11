import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { PetForm } from "@/components/pet-form";

export const dynamic = "force-dynamic";

export default async function NuevaMascotaPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  return (
    <div className="mx-auto max-w-lg px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900">Agregar mascota</h1>
      <p className="mt-2 text-sm text-gray-600">Registra una nueva mascota en tu perfil.</p>
      <div className="mt-6">
        <PetForm mode="create" />
      </div>
    </div>
  );
}
