"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const PLACEHOLDER = "/placeholder-pet.png";

interface AuthUser {
  id: string;
  displayName: string;
  petAvatar: string | null;
  petName: string | null;
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(PLACEHOLDER);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
          setImgSrc(data.user.petAvatar || PLACEHOLDER);
        } else {
          setUser(null);
          setImgSrc(PLACEHOLDER);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [pathname]);

  // Close dropdown on Escape or outside click
  useEffect(() => {
    if (!dropdownOpen) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        buttonRef.current?.focus();
      }
    }

    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = useCallback(async () => {
    setDropdownOpen(false);
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
  }, [router]);

  const altText = user?.petAvatar && user.petName ? user.petName : "Foto de tu mascota";
  const isPlaceholder = imgSrc === PLACEHOLDER;

  const loggedOutDesktop = (
    <>
      <span className="text-gray-300">|</span>
      <Link href="/auth/registro" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
        Registrarse
      </Link>
      <Link
        href="/auth/login"
        className="rounded-lg bg-gradient-to-r from-primary-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all"
      >
        Iniciar sesion
      </Link>
    </>
  );

  const loggedInDesktop = (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setDropdownOpen((o) => !o)}
        aria-label="Menu de cuenta"
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        className={`h-9 w-9 rounded-full border-2 border-primary-200 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-shadow hover:border-primary-400${isPlaceholder ? " bg-gray-100" : ""}`}
      >
        <Image
          src={imgSrc}
          alt={altText}
          width={36}
          height={36}
          className="h-full w-full object-cover"
          style={isPlaceholder ? { filter: "grayscale(0.5) saturate(0.7) opacity(0.85)" } : undefined}
          onError={() => setImgSrc(PLACEHOLDER)}
          unoptimized={isPlaceholder}
        />
      </button>

      {dropdownOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white py-1 shadow-lg shadow-gray-200/50 animate-fade-in-up"
        >
          <Link
            href="/dashboard/mascotas"
            role="menuitem"
            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
            onClick={() => setDropdownOpen(false)}
          >
            Mis mascotas
          </Link>
          <Link
            href="/dashboard/cuenta"
            role="menuitem"
            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
            onClick={() => setDropdownOpen(false)}
          >
            Mi cuenta
          </Link>
          <hr className="my-1 border-gray-100" />
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="block w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            Cerrar sesion
          </button>
        </div>
      )}
    </div>
  );

  const loadingPlaceholder = (
    <div className="h-9 w-9 rounded-full bg-gray-100 animate-pulse" />
  );

  const loggedOutMobile = (
    <>
      <Link href="/auth/registro" className="text-sm font-medium text-gray-700 hover:text-primary-600" onClick={() => setMenuOpen(false)}>
        Registrarse
      </Link>
      <Link
        href="/auth/login"
        className="rounded-lg bg-gradient-to-r from-primary-500 to-pink-500 px-4 py-2 text-center text-sm font-semibold text-white shadow-md"
        onClick={() => setMenuOpen(false)}
      >
        Iniciar sesion
      </Link>
    </>
  );

  const loggedInMobile = (
    <>
      <Link href="/dashboard/mascotas" className="text-sm font-medium text-gray-700 hover:text-primary-600" onClick={() => setMenuOpen(false)}>
        Mis mascotas
      </Link>
      <Link href="/dashboard/cuenta" className="text-sm font-medium text-gray-700 hover:text-primary-600" onClick={() => setMenuOpen(false)}>
        Mi cuenta
      </Link>
      <button
        type="button"
        onClick={() => { setMenuOpen(false); handleLogout(); }}
        className="text-left text-sm font-medium text-red-600 hover:text-red-700"
      >
        Cerrar sesion
      </button>
    </>
  );

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
          {loading ? loadingPlaceholder : user ? loggedInDesktop : loggedOutDesktop}
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
            {loading ? null : user ? loggedInMobile : loggedOutMobile}
          </div>
        </div>
      )}
    </header>
  );
}
