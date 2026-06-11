import Link from "next/link";
import { HeroIllustration } from "@/components/hero-illustration";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-primary-200/40 to-pink-200/40 blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-secondary-200/30 to-cyan-200/30 blur-3xl animate-pulse-slow delay-200" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-yellow-100/20 to-orange-100/20 blur-3xl animate-float-slow" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left animate-fade-in-up">
              <p className="inline-block rounded-full bg-gradient-to-r from-primary-100 to-pink-100 px-4 py-1.5 text-sm font-semibold text-primary-700 mb-6">
                Manizales, Colombia
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Donde cada{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-pink-500 to-purple-600 animate-gradient">
                  patita
                </span>{" "}
                tiene su mundo
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-600 sm:text-xl max-w-xl mx-auto lg:mx-0">
                El ecosistema digital que conecta a las familias con mascotas de Manizales.
                Perfil, salud, comunidad y servicios en un solo lugar.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href="/auth/registro"
                  className="group relative rounded-xl bg-gradient-to-r from-primary-500 to-pink-500 px-7 py-3.5 text-center font-semibold text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all hover:-translate-y-0.5"
                >
                  Crear cuenta gratis
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </Link>
                <Link
                  href="/explorar"
                  className="rounded-xl border-2 border-purple-200 bg-white/80 backdrop-blur px-7 py-3.5 text-center font-semibold text-purple-700 shadow-sm hover:border-purple-300 hover:bg-purple-50 transition-all hover:-translate-y-0.5"
                >
                  Explorar servicios
                </Link>
              </div>
            </div>

            {/* Illustration */}
            <div className="flex-1 animate-slide-in-right">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-16 sm:py-24 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-50/50 via-transparent to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Todo para tu mascota en{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-500 to-teal-500">
                un solo lugar
              </span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Un ecosistema completo pensado para las mascotas y sus familias en Colombia.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon="🪪"
              title="Identidad digital"
              description="Cada mascota tiene su perfil con pasaporte de salud, historial de vacunas y datos importantes."
              gradient="from-orange-400 to-amber-400"
              delay="delay-100"
            />
            <FeatureCard
              icon="📚"
              title="Conocimiento"
              description="Articulos, guias y un asistente inteligente para cuidar mejor a tu companero."
              gradient="from-blue-400 to-cyan-400"
              delay="delay-200"
            />
            <FeatureCard
              icon="🏥"
              title="Servicios veterinarios"
              description="Directorio de veterinarias, clinicas y profesionales en Manizales con resenas reales."
              gradient="from-green-400 to-emerald-400"
              delay="delay-300"
            />
            <FeatureCard
              icon="🐕"
              title="Servicios para mascotas"
              description="Grooming, paseos, guarderia, entrenamiento y mas servicios locales."
              gradient="from-purple-400 to-violet-400"
              delay="delay-400"
            />
            <FeatureCard
              icon="🤝"
              title="Comunidad"
              description="Conecta con otros duenos de mascotas, comparte experiencias y organiza encuentros."
              gradient="from-pink-400 to-rose-400"
              delay="delay-500"
            />
            <FeatureCard
              icon="🤖"
              title="Asistente PetWorld"
              description="Un asistente inteligente que responde tus preguntas sobre la plataforma y el cuidado general de mascotas."
              gradient="from-indigo-400 to-purple-400"
              delay="delay-100"
            />
          </div>
        </div>
      </section>

      {/* Stats / social proof */}
      <section className="py-16 bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <StatCard number="500+" label="Mascotas registradas" color="text-primary-600" />
            <StatCard number="30+" label="Veterinarias aliadas" color="text-purple-600" />
            <StatCard number="8" label="Servicios disponibles" color="text-pink-600" />
            <StatCard number="24/7" label="Asistente inteligente" color="text-secondary-600" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-pink-500 to-purple-600 animate-gradient" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl animate-fade-in-up">
            Unete a la comunidad PetWorld
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Crea el perfil de tu mascota y accede a todo el ecosistema. Es gratis y toma menos de un minuto.
          </p>
          <Link
            href="/auth/registro"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-bold text-primary-600 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
          >
            Comenzar ahora
          </Link>
        </div>
      </section>
    </>
  );
}

function FeatureCard({ icon, title, description, gradient, delay }: { icon: string; title: string; description: string; gradient: string; delay: string }) {
  return (
    <div className={`group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up ${delay}`}>
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} text-white text-xl shadow-lg`}>
        <span aria-hidden="true">{icon}</span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ number, label, color }: { number: string; label: string; color: string }) {
  return (
    <div className="text-center animate-fade-in-up">
      <p className={`text-3xl font-extrabold ${color} sm:text-4xl`}>{number}</p>
      <p className="mt-1 text-sm font-medium text-gray-600">{label}</p>
    </div>
  );
}
