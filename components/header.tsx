"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/90 backdrop-blur-lg supports-[backdrop-filter]:bg-white/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-pink-500 text-white text-sm shadow-md">
            🐾
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-pink-600">
            PetWorld
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/explorar" className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all">
            Explorar
          </Link>
          <Link href="/acerca" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
            Acerca de
          </Link>
          <Link href="/servicios" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
            Servicios
          </Link>
          <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
            Iniciar sesion
          </Link>
          <Link
            href="/auth/registro"
            className="rounded-lg bg-gradient-to-r from-primary-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all"
          >
            Registrarse
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden rounded-lg p-2 text-gray-700 hover:bg-primary-50 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Abrir menu de navegacion"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white/95 backdrop-blur px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/explorar" className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600" onClick={() => setMenuOpen(false)}>
              Explorar
            </Link>
            <Link href="/acerca" className="text-sm font-medium text-gray-700 hover:text-primary-600" onClick={() => setMenuOpen(false)}>
              Acerca de
            </Link>
            <Link href="/servicios" className="text-sm font-medium text-gray-700 hover:text-primary-600" onClick={() => setMenuOpen(false)}>
              Servicios
            </Link>
            <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-primary-600" onClick={() => setMenuOpen(false)}>
              Iniciar sesion
            </Link>
            <Link
              href="/auth/registro"
              className="rounded-lg bg-gradient-to-r from-primary-500 to-pink-500 px-4 py-2 text-center text-sm font-semibold text-white shadow-md"
              onClick={() => setMenuOpen(false)}
            >
              Registrarse
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
