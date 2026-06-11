import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminos y condiciones - PetWorld",
};

export default function TerminosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Terminos y condiciones</h1>
      <p className="mt-2 text-sm text-gray-500">Ultima actualizacion: Junio 2026 | Version 1.0</p>

      <div className="mt-8 space-y-6 text-gray-600 leading-relaxed text-sm">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">1. Aceptacion</h2>
          <p className="mt-2">
            Al registrarte y usar PetWorld, aceptas estos terminos y condiciones. Si no estas de
            acuerdo, no uses la plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. Servicios</h2>
          <p className="mt-2">
            PetWorld ofrece una plataforma digital para gestionar perfiles de mascotas, acceder a
            informacion de cuidado y usar un asistente inteligente. Los servicios pueden cambiar o
            ampliarse con el tiempo.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">3. Cuenta de usuario</h2>
          <p className="mt-2">
            Eres responsable de mantener la confidencialidad de tu cuenta y contrasena. Debes
            proporcionar informacion veraz y mantenerla actualizada.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">4. Uso aceptable</h2>
          <p className="mt-2">
            Te comprometes a no usar la plataforma para actividades ilegales, danar a otros usuarios,
            publicar contenido ofensivo, o intentar acceder a cuentas o datos de otros usuarios.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. Asistente inteligente</h2>
          <p className="mt-2">
            El asistente proporciona informacion general y no constituye asesoramiento veterinario
            profesional. Para diagnosticos, tratamientos o emergencias de salud de tu mascota,
            consulta siempre con un veterinario.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">6. Propiedad intelectual</h2>
          <p className="mt-2">
            El contenido, diseno y funcionalidades de PetWorld son propiedad de PetWorld. Puedes
            usar la plataforma para fines personales pero no puedes reproducir o distribuir nuestro
            contenido sin autorizacion.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">7. Limitacion de responsabilidad</h2>
          <p className="mt-2">
            PetWorld no se hace responsable por danos derivados del uso de la informacion proporcionada
            por la plataforma o el asistente. La plataforma se proporciona &quot;tal cual&quot;.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">8. Contacto</h2>
          <p className="mt-2">
            Para preguntas sobre estos terminos: <a href="mailto:hola@petworld.co" className="text-primary-600 hover:underline">hola@petworld.co</a>
          </p>
        </section>
      </div>
    </div>
  );
}
