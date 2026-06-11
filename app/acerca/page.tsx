import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acerca de - PetWorld",
  description: "Conoce el ecosistema PetWorld: la plataforma para mascotas y sus familias en Colombia.",
};

export default function AcercaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Acerca de PetWorld</h1>

      <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
        <p className="text-lg">
          <strong className="text-gray-900">PetWorld</strong> es una plataforma digital pensada para las mascotas colombianas
          y las familias que las aman. Nuestro objetivo es ser el hogar donde cada mascota tiene una identidad digital y
          sus personas encuentran todo lo que necesitan: conocimiento, comunidad, servicios y productos en un solo lugar de confianza.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 pt-4">Nuestra vision</h2>
        <p>
          En Colombia, cerca de dos de cada tres hogares conviven con al menos una mascota. La humanizacion de las mascotas,
          donde nuestros companeros ocupan un lugar central en la familia, impulsa la necesidad de servicios digitales que
          esten a la altura de ese amor. PetWorld nace para llenar ese espacio.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 pt-4">El ecosistema</h2>
        <p>
          Estamos construyendo un ecosistema completo que incluye:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Identidad digital:</strong> cada mascota tiene su perfil con pasaporte de salud y datos importantes.</li>
          <li><strong>Conocimiento:</strong> articulos, guias y un asistente inteligente con informacion verificada.</li>
          <li><strong>Directorio de servicios:</strong> veterinarias, grooming, paseos, guarderia y mas en tu ciudad.</li>
          <li><strong>Comunidad:</strong> conecta con otros duenos, comparte experiencias y organiza encuentros.</li>
          <li><strong>Comercio:</strong> productos y accesorios de marcas locales e independientes (proximamente).</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 pt-4">Empezamos en Manizales</h2>
        <p>
          Lanzamos en Manizales porque creemos en construir comunidad con densidad real antes de escalar.
          Queremos que cada dueno de mascota en la ciudad sienta que PetWorld fue hecho para el y su companero.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 pt-4">Nuestros valores</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Bienestar animal:</strong> promovemos la adopcion responsable y el cuidado consciente.</li>
          <li><strong>Confianza:</strong> informacion verificada, proveedores evaluados, datos protegidos.</li>
          <li><strong>Comunidad:</strong> creemos que las mascotas nos conectan como personas.</li>
          <li><strong>Innovacion local:</strong> tecnologia de clase mundial adaptada a la realidad colombiana.</li>
        </ul>
      </div>
    </div>
  );
}
