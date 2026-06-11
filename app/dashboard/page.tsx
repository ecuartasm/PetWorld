import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hola, {user.displayName}!</h1>
          <p className="mt-1 text-sm text-gray-600">Bienvenido a tu panel de PetWorld.</p>
        </div>
        <LogoutButton />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/dashboard/mascotas"
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <span className="text-3xl" aria-hidden="true">🐾</span>
          <h2 className="mt-3 text-lg font-semibold text-gray-900">Mis mascotas</h2>
          <p className="mt-1 text-sm text-gray-600">Administra los perfiles de tus mascotas.</p>
        </Link>

        <Link
          href="/dashboard/cuenta"
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <span className="text-3xl" aria-hidden="true">👤</span>
          <h2 className="mt-3 text-lg font-semibold text-gray-900">Mi cuenta</h2>
          <p className="mt-1 text-sm text-gray-600">Edita tu informacion personal.</p>
        </Link>
      </div>
    </div>
  );
}
