import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-t border-gray-100 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-50/50 blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-purple-50/50 blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-primary-400 to-pink-500 text-white text-xs shadow-md">
                🐾
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-pink-600">
                PetWorld
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-600">
              Donde cada patita tiene su mundo. Conocimiento, comunidad y servicios para las familias con mascotas de Colombia.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Plataforma</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/explorar" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Explorar</Link></li>
              <li><Link href="/acerca" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Acerca de</Link></li>
              <li><Link href="/servicios" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Servicios</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/privacidad" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Politica de privacidad</Link></li>
              <li><Link href="/terminos" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Terminos y condiciones</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Contacto</h3>
            <ul className="mt-3 space-y-2">
              <li className="text-sm text-gray-600">Colombia</li>
              <li><a href="mailto:hola@petworld.co" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">hola@petworld.co</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} PetWorld. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-400">
            Hecho con amor para las mascotas de Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
