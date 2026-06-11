"use client";

import { useRouter } from "next/navigation";

export function DeletePetButton({ petId, petName }: { petId: string; petName: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Estas seguro de eliminar a ${petName}? Esta accion no se puede deshacer.`)) {
      return;
    }

    const res = await fetch(`/api/pets/${petId}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 transition-colors"
    >
      Eliminar
    </button>
  );
}
