import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de privacidad - PetWorld",
};

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Politica de tratamiento de datos personales</h1>
      <p className="mt-2 text-sm text-gray-500">Ultima actualizacion: Junio 2026 | Version 1.0</p>

      <div className="mt-8 space-y-6 text-gray-600 leading-relaxed text-sm">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">1. Responsable del tratamiento</h2>
          <p className="mt-2">
            PetWorld, con domicilio en Manizales, Colombia, es responsable del tratamiento de los datos
            personales recopilados a traves de esta plataforma, de conformidad con la Ley 1581 de 2012
            y el Decreto 1377 de 2013.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. Datos que recopilamos</h2>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Datos de identificacion: nombre, correo electronico, telefono, ciudad.</li>
            <li>Datos de mascotas: nombre, especie, raza, fecha de nacimiento, peso, descripcion.</li>
            <li>Datos de uso: historial de conversaciones con el asistente, sesiones.</li>
            <li>Datos tecnicos: direccion IP, datos de navegacion para seguridad y mejora del servicio.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">3. Finalidad del tratamiento</h2>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Gestionar tu cuenta y autenticacion.</li>
            <li>Proveer los servicios de la plataforma (perfiles de mascotas, asistente, contenido).</li>
            <li>Mejorar nuestros servicios y experiencia de usuario.</li>
            <li>Comunicarnos contigo sobre tu cuenta y nuestros servicios.</li>
            <li>Cumplir obligaciones legales.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">4. Autorizacion</h2>
          <p className="mt-2">
            Al registrarte en PetWorld, otorgas tu autorizacion previa, expresa e informada para el
            tratamiento de tus datos personales conforme a esta politica. Puedes revocar tu autorizacion
            en cualquier momento escribiendo a hola@petworld.co.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. Derechos del titular</h2>
          <p className="mt-2">
            Como titular de tus datos, tienes derecho a: conocer, actualizar, rectificar y suprimir
            tus datos personales; revocar la autorizacion; acceder gratuitamente a tus datos; y
            presentar quejas ante la Superintendencia de Industria y Comercio (SIC).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">6. Seguridad</h2>
          <p className="mt-2">
            Implementamos medidas tecnicas y organizativas para proteger tus datos contra acceso no
            autorizado, alteracion, divulgacion o destruccion. Las contrasenas se almacenan con hash
            seguro (argon2) y las sesiones se manejan con cookies httpOnly.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">7. Contacto</h2>
          <p className="mt-2">
            Para ejercer tus derechos o resolver dudas sobre el tratamiento de tus datos, contactanos
            en: <a href="mailto:hola@petworld.co" className="text-primary-600 hover:underline">hola@petworld.co</a>
          </p>
        </section>
      </div>
    </div>
  );
}
