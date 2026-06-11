"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface PetData {
  id?: string;
  name: string;
  species: string;
  breed: string | null;
  birthDate: string | null;
  sex: string;
  weightKg: number | null;
  bio: string | null;
}

interface PetFormProps {
  pet?: PetData;
  mode: "create" | "edit";
}

export function PetForm({ pet, mode }: PetFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const weightStr = form.get("weightKg") as string;

    const body = {
      name: form.get("name"),
      species: form.get("species"),
      breed: form.get("breed") || null,
      birthDate: form.get("birthDate") || null,
      sex: form.get("sex"),
      weightKg: weightStr ? parseFloat(weightStr) : null,
      bio: form.get("bio") || null,
    };

    try {
      const url = mode === "create" ? "/api/pets" : `/api/pets/${pet?.id}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.details) setFieldErrors(data.details);
        setError(data.error || "Error al guardar");
        return;
      }

      if (mode === "create") {
        router.push(`/dashboard/mascotas/${data.pet.id}`);
      } else {
        router.push(`/dashboard/mascotas/${pet?.id}`);
      }
      router.refresh();
    } catch {
      setError("Error de conexion.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={pet?.name || ""}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
        />
        {fieldErrors.name && <p className="mt-1 text-xs text-red-600">{fieldErrors.name[0]}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="species" className="block text-sm font-medium text-gray-700">
            Especie *
          </label>
          <select
            id="species"
            name="species"
            required
            defaultValue={pet?.species || ""}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          >
            <option value="">Seleccionar...</option>
            <option value="DOG">Perro</option>
            <option value="CAT">Gato</option>
            <option value="OTHER">Otro</option>
          </select>
          {fieldErrors.species && <p className="mt-1 text-xs text-red-600">{fieldErrors.species[0]}</p>}
        </div>

        <div>
          <label htmlFor="sex" className="block text-sm font-medium text-gray-700">
            Sexo
          </label>
          <select
            id="sex"
            name="sex"
            defaultValue={pet?.sex || "UNKNOWN"}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          >
            <option value="UNKNOWN">No especificado</option>
            <option value="MALE">Macho</option>
            <option value="FEMALE">Hembra</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="breed" className="block text-sm font-medium text-gray-700">
          Raza
        </label>
        <input
          id="breed"
          name="breed"
          type="text"
          defaultValue={pet?.breed || ""}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
            Fecha de nacimiento
          </label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            defaultValue={pet?.birthDate ? pet.birthDate.split("T")[0] : ""}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <div>
          <label htmlFor="weightKg" className="block text-sm font-medium text-gray-700">
            Peso (kg)
          </label>
          <input
            id="weightKg"
            name="weightKg"
            type="number"
            step="0.1"
            min="0"
            defaultValue={pet?.weightKg || ""}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
          Descripcion
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          defaultValue={pet?.bio || ""}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          placeholder="Cuenta algo sobre tu mascota..."
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary-500 px-6 py-2.5 font-semibold text-white shadow-sm hover:bg-primary-600 disabled:opacity-50 transition-colors"
        >
          {loading ? "Guardando..." : mode === "create" ? "Crear mascota" : "Guardar cambios"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-gray-300 px-6 py-2.5 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
