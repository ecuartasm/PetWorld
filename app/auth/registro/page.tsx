"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegistroPage() {
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
    const body = {
      email: form.get("email"),
      password: form.get("password"),
      displayName: form.get("displayName"),
      phone: form.get("phone") || undefined,
      consentAccepted: form.get("consent") === "on",
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.details) setFieldErrors(data.details);
        setError(data.error || "Error al registrarse");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Error de conexion. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900">Crear cuenta</h1>
      <p className="mt-2 text-sm text-gray-600">
        Registrate para crear el perfil de tu mascota.
      </p>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
            Nombre completo
          </label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
          {fieldErrors.displayName && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.displayName[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo electronico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.email[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contrasena
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
          {fieldErrors.password && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.password[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Telefono (opcional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <div className="flex items-start gap-2">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="consent" className="text-sm text-gray-600">
            Acepto la{" "}
            <Link href="/privacidad" className="text-primary-600 hover:underline">
              politica de tratamiento de datos personales
            </Link>{" "}
            y los{" "}
            <Link href="/terminos" className="text-primary-600 hover:underline">
              terminos y condiciones
            </Link>
            .
          </label>
        </div>
        {fieldErrors.consentAccepted && (
          <p className="text-xs text-red-600">{fieldErrors.consentAccepted[0]}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary-500 px-4 py-2.5 font-semibold text-white shadow-sm hover:bg-primary-600 disabled:opacity-50 transition-colors"
        >
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Ya tienes cuenta?{" "}
        <Link href="/auth/login" className="font-medium text-primary-600 hover:underline">
          Inicia sesion
        </Link>
      </p>
    </div>
  );
}
