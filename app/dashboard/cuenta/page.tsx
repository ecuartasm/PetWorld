"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  id: string;
  email: string;
  displayName: string;
  phone: string | null;
  city: string;
}

export default function CuentaPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.push("/auth/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setUser(data.user);
        setLoading(false);
      });
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);

    const form = new FormData(e.currentTarget);
    const body = {
      displayName: form.get("displayName"),
      phone: form.get("phone") || undefined,
      city: form.get("city") || undefined,
    };

    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al actualizar");
        return;
      }

      setUser(data.user);
      setMessage("Cuenta actualizada exitosamente.");
    } catch {
      setError("Error de conexion.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center text-gray-500">Cargando...</div>
    );
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-md px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900">Mi cuenta</h1>
      <p className="mt-2 text-sm text-gray-600">Actualiza tu informacion personal.</p>

      {message && (
        <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">{message}</div>
      )}
      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo electronico
          </label>
          <input
            id="email"
            type="email"
            value={user.email}
            disabled
            className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-500"
          />
          <p className="mt-1 text-xs text-gray-500">El correo no se puede cambiar.</p>
        </div>

        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
            Nombre completo
          </label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            defaultValue={user.displayName}
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Telefono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={user.phone || ""}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            Ciudad
          </label>
          <input
            id="city"
            name="city"
            type="text"
            defaultValue={user.city}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-lg bg-primary-500 px-4 py-2.5 font-semibold text-white shadow-sm hover:bg-primary-600 disabled:opacity-50 transition-colors"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
}
