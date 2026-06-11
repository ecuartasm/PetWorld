"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const body = {
      email: form.get("email"),
      password: form.get("password"),
    };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al iniciar sesion");
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
      <h1 className="text-2xl font-bold text-gray-900">Iniciar sesion</h1>
      <p className="mt-2 text-sm text-gray-600">
        Ingresa a tu cuenta de PetWorld.
      </p>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary-500 px-4 py-2.5 font-semibold text-white shadow-sm hover:bg-primary-600 disabled:opacity-50 transition-colors"
        >
          {loading ? "Ingresando..." : "Iniciar sesion"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <Link href="/auth/forgot-password" className="text-sm text-primary-600 hover:underline">
          Olvidaste tu contrasena?
        </Link>
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        No tienes cuenta?{" "}
        <Link href="/auth/registro" className="font-medium text-primary-600 hover:underline">
          Registrate
        </Link>
      </p>
    </div>
  );
}
