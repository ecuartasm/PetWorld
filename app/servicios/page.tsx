import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios - PetWorld",
  description: "Descubre todos los servicios del ecosistema PetWorld para mascotas en Colombia.",
};

const services = [
  {
    icon: "🪪",
    title: "Perfil e identidad digital",
    description:
      "Crea el perfil de tu mascota con su informacion basica, fotos, y un pasaporte de salud digital. Historial de vacunas, visitas al veterinario, alergias y mas, todo en un solo lugar seguro.",
    status: "disponible" as const,
  },
  {
    icon: "🤖",
    title: "Asistente inteligente",
    description:
      "Un asistente de IA disponible 24/7 que responde tus preguntas sobre la plataforma, servicios disponibles, y cuidado general de mascotas. No reemplaza al veterinario, pero te orienta.",
    status: "disponible" as const,
  },
  {
    icon: "📚",
    title: "Centro de conocimiento",
    description:
      "Articulos y guias sobre nutricion, salud, comportamiento, razas, grooming, y cuidado de mascotas senior. Contenido verificado en espanol para el contexto colombiano.",
    status: "disponible" as const,
  },
  {
    icon: "🏥",
    title: "Directorio veterinario",
    description:
      "Encuentra veterinarias, clinicas y profesionales en Colombia. Con resenas de la comunidad, horarios, ubicacion y servicios disponibles.",
    status: "proximamente" as const,
  },
  {
    icon: "✂️",
    title: "Servicios de grooming y cuidado",
    description:
      "Descubre y reserva servicios de bano, peluqueria, guarderia, paseos, entrenamiento y hotel para mascotas en tu zona.",
    status: "proximamente" as const,
  },
  {
    icon: "💬",
    title: "Telemedicina veterinaria",
    description:
      "Consultas por video o chat con veterinarios verificados para orientacion, seguimiento y segundas opiniones. Para no-emergencias.",
    status: "proximamente" as const,
  },
  {
    icon: "👥",
    title: "Red social para mascotas",
    description:
      "Un feed donde las mascotas (a traves de sus duenos) publican, siguen, y se conectan. Grupos por raza, ciudad e intereses. Encuentros y paseos comunitarios.",
    status: "proximamente" as const,
  },
  {
    icon: "🐾",
    title: "Encuentros y citas de juego",
    description:
      "Encuentra mascotas compatibles cerca de ti para paseos y juegos. Filtros por temperamento, tamano, energia y ubicacion.",
    status: "proximamente" as const,
  },
  {
    icon: "🎉",
    title: "Eventos",
    description:
      "Calendario de eventos pet-friendly: ferias de adopcion, congresos veterinarios, talleres, competencias y encuentros comunitarios.",
    status: "proximamente" as const,
  },
  {
    icon: "🛒",
    title: "Tienda y marketplace",
    description:
      "Productos de marcas locales e independientes: alimento, juguetes, accesorios, y productos de cuidado. Suscripciones para alimento automatico.",
    status: "proximamente" as const,
  },
];

export default function ServiciosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Servicios del ecosistema</h1>
        <p className="mt-4 text-lg text-gray-600">
          PetWorld es un ecosistema en crecimiento. Estos son los servicios disponibles y los que vienen en camino.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl" aria-hidden="true">{service.icon}</span>
              <StatusBadge status={service.status} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{service.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "disponible" | "proximamente" }) {
  if (status === "disponible") {
    return (
      <span className="inline-flex items-center rounded-full bg-secondary-100 px-2.5 py-0.5 text-xs font-medium text-secondary-800">
        Disponible
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-warm-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
      Proximamente
    </span>
  );
}
