"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!token) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Enlace invalido</h1>
        <p className="mt-4 text-gray-600">
          El enlace de restablecimiento es invalido o ha expirado.
        </p>
        <Link href="/auth/forgot-password" className="mt-4 inline-block text-sm text-primary-600 hover:underline">
          Solicitar nuevo enlace
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const password = form.get("password") as string;
    const confirm = form.get("confirm") as string;

    if (password !== confirm) {
      setError("Las contrasenas no coinciden");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/password-reset/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al restablecer");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Error de conexion.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Contrasena actualizada</h1>
        <p className="mt-4 text-gray-600">Tu contrasena fue actualizada exitosamente.</p>
        <Link
          href="/auth/login"
          className="mt-6 inline-block rounded-lg bg-primary-500 px-6 py-2.5 font-semibold text-white hover:bg-primary-600"
        >
          Iniciar sesion
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900">Nueva contrasena</h1>
      <p className="mt-2 text-sm text-gray-600">Ingresa tu nueva contrasena.</p>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Nueva contrasena
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <div>
          <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
            Confirmar contrasena
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            required
            minLength={8}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary-500 px-4 py-2.5 font-semibold text-white shadow-sm hover:bg-primary-600 disabled:opacity-50 transition-colors"
        >
          {loading ? "Actualizando..." : "Actualizar contrasena"}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-4 py-16 text-center text-gray-500">Cargando...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
