"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const body = { email: form.get("email") };

    try {
      const res = await fetch("/api/auth/password-reset/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al enviar solicitud");
        return;
      }

      setSent(true);
    } catch {
      setError("Error de conexion.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Revisa tu correo</h1>
        <p className="mt-4 text-gray-600">
          Si existe una cuenta con ese correo, recibiras un enlace para restablecer tu contrasena.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          (En desarrollo, el enlace aparece en la consola del servidor.)
        </p>
        <Link href="/auth/login" className="mt-6 inline-block text-sm text-primary-600 hover:underline">
          Volver a iniciar sesion
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900">Restablecer contrasena</h1>
      <p className="mt-2 text-sm text-gray-600">
        Ingresa tu correo y te enviaremos un enlace para crear una nueva contrasena.
      </p>

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
            name="email"
            type="email"
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary-500 px-4 py-2.5 font-semibold text-white shadow-sm hover:bg-primary-600 disabled:opacity-50 transition-colors"
        >
          {loading ? "Enviando..." : "Enviar enlace"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        <Link href="/auth/login" className="text-primary-600 hover:underline">
          Volver a iniciar sesion
        </Link>
      </p>
    </div>
  );
}
