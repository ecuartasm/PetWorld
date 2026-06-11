"use client";

import { useState } from "react";

const tabs = [
  { id: "pawtag", label: "PawTag", icon: "🏷️", color: "from-orange-500 to-red-600" },
  { id: "conocimiento", label: "Conocimiento", icon: "📚", color: "from-violet-500 to-purple-600" },
  { id: "veterinario", label: "Veterinarias", icon: "🏥", color: "from-emerald-500 to-teal-600" },
  { id: "grooming", label: "Grooming", icon: "✂️", color: "from-pink-500 to-rose-600" },
  { id: "telemedicina", label: "Telemedicina", icon: "💻", color: "from-blue-500 to-indigo-600" },
  { id: "social", label: "Red Social", icon: "👥", color: "from-amber-500 to-orange-600" },
  { id: "encuentros", label: "Encuentros", icon: "🐾", color: "from-red-500 to-pink-600" },
  { id: "marketplace", label: "Marketplace", icon: "🛒", color: "from-cyan-500 to-blue-600" },
  { id: "eventos", label: "Eventos", icon: "🎉", color: "from-yellow-500 to-amber-600" },
];

export default function ExplorarPage() {
  const [activeTab, setActiveTab] = useState("pawtag");
  const currentTab = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Animated header banner */}
      <div className={`bg-gradient-to-r ${currentTab.color} transition-all duration-700 ease-in-out`}>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-5xl animate-bounce">{currentTab.icon}</span>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl animate-fade-in">
            Explora el Ecosistema PetWorld
          </h1>
          <p className="mt-2 text-lg text-white/90">
            Descubre lo que estamos construyendo para las mascotas de Manizales
          </p>
        </div>
      </div>

      {/* Tab navigation - scrollable on mobile */}
      <div className="sticky top-16 z-40 border-b border-gray-200 bg-white/95 backdrop-blur shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto py-2 scrollbar-hide" aria-label="Servicios">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span className="mr-1.5">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up" key={activeTab}>
          {activeTab === "pawtag" && <PawTagTab />}
          {activeTab === "conocimiento" && <ConocimientoTab />}
          {activeTab === "veterinario" && <VeterinarioTab />}
          {activeTab === "grooming" && <GroomingTab />}
          {activeTab === "telemedicina" && <TelemedicinaTab />}
          {activeTab === "social" && <SocialTab />}
          {activeTab === "encuentros" && <EncuentrosTab />}
          {activeTab === "marketplace" && <MarketplaceTab />}
          {activeTab === "eventos" && <EventosTab />}
        </div>
      </div>

      {/* Floating "coming soon" badge */}
      <div className="fixed bottom-6 left-6 z-50 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 px-5 py-2.5 text-sm font-medium text-white shadow-xl animate-pulse">
        🚧 Proximamente en Manizales
      </div>
    </div>
  );
}

/* ============ TAB CONTENT COMPONENTS ============ */

function PawTagTab() {
  const features = [
    { icon: "📡", title: "NFC + QR integrado", desc: "Cada tag tiene un chip NFC y un codigo QR. Quien encuentre a tu mascota solo necesita acercar su celular o escanear el codigo." },
    { icon: "📞", title: "Contacto inmediato", desc: "Tu numero de telefono aparece con un boton de llamada directa. Sin apps, sin registro, sin complicaciones." },
    { icon: "🏥", title: "Info medica de emergencia", desc: "Alergias, medicamentos y datos del veterinario visibles al instante para quien encuentre a tu mascota." },
    { icon: "🔒", title: "Tu decides que mostrar", desc: "Controla que informacion es publica. Puedes mostrar solo el telefono, o incluir datos medicos completos." },
    { icon: "🌐", title: "Funciona sin internet del finder", desc: "La persona que escanea solo necesita datos moviles o WiFi. No necesita tener la app instalada." },
    { icon: "♾️", title: "Actualizacion ilimitada", desc: "Cambiaste de numero? Actualiza desde tu cuenta y el tag fisico sigue funcionando igual." },
  ];

  const plans = [
    { name: "PawTag Basico", price: "$29.900", desc: "Tag QR resistente al agua", features: ["Codigo QR grabado", "Perfil publico de tu mascota", "Contacto de emergencia", "Resistente al agua"], color: "from-gray-700 to-gray-900", popular: false },
    { name: "PawTag NFC", price: "$49.900", desc: "Tag NFC + QR premium", features: ["Chip NFC integrado", "Codigo QR de respaldo", "Info medica de emergencia", "Resistente y liviano", "Notificacion de escaneo"], color: "from-orange-500 to-red-600", popular: true },
    { name: "PawTag Duo", price: "$79.900", desc: "Pack de 2 tags (collar + arnes)", features: ["2 tags NFC + QR", "Ideal para collar y arnes", "Todo lo del plan NFC", "Envio gratis en Manizales"], color: "from-purple-600 to-pink-600", popular: false },
  ];

  const steps = [
    { step: "1", title: "Crea el perfil de tu mascota", desc: "Registrate gratis y agrega los datos de tu mascota, contacto y info medica." },
    { step: "2", title: "Recibe tu PawTag", desc: "Te enviamos el tag fisico a tu casa en Manizales. Listo para usar." },
    { step: "3", title: "Ponlo en el collar", desc: "Asegura el tag al collar o arnes de tu mascota. Listo, protegido." },
    { step: "4", title: "Quien lo encuentre, te llama", desc: "Si tu mascota se pierde, cualquiera puede escanear el tag y contactarte al instante." },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-2xl shadow-lg">🏷️</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">PawTag — Identidad fisica para tu mascota</h2>
          <p className="text-sm text-gray-500">Un tag QR + NFC en el collar que ayuda a recuperar a tu mascota si se pierde</p>
        </div>
      </div>

      {/* Hero visual */}
      <div className="mb-8 rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50" />
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="text-3xl font-extrabold">Nunca pierdas a tu mejor amigo</h3>
            <p className="mt-3 text-lg text-white/90">
              PawTag es un tag fisico con tecnologia NFC y QR que se coloca en el collar de tu mascota.
              Si se pierde, cualquier persona puede escanearlo y contactarte al instante.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/20 backdrop-blur px-4 py-1.5 text-sm font-medium">NFC integrado</span>
              <span className="rounded-full bg-white/20 backdrop-blur px-4 py-1.5 text-sm font-medium">Resistente al agua</span>
              <span className="rounded-full bg-white/20 backdrop-blur px-4 py-1.5 text-sm font-medium">Sin suscripcion</span>
            </div>
          </div>
          <div className="flex-shrink-0 relative">
            <div className="w-40 h-40 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center shadow-2xl">
                <span className="text-5xl">🐾</span>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 bg-white text-orange-600 rounded-full px-3 py-1 text-xs font-bold shadow-lg animate-bounce-gentle">
              NFC
            </div>
            <div className="absolute -bottom-1 -left-2 bg-white text-pink-600 rounded-full px-3 py-1 text-xs font-bold shadow-lg animate-bounce-gentle-delayed">
              QR
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Como funciona</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s) => (
            <div key={s.step} className="rounded-xl border-2 border-orange-100 bg-gradient-to-b from-orange-50 to-white p-5 hover:border-orange-300 hover:shadow-md transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold text-lg shadow-md">
                {s.step}
              </div>
              <h4 className="mt-3 font-bold text-gray-900">{s.title}</h4>
              <p className="mt-1 text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Caracteristicas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-300">
              <span className="text-2xl">{f.icon}</span>
              <h4 className="mt-2 font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{f.title}</h4>
              <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Planes y precios</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative rounded-2xl border-2 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 ${plan.popular ? "border-orange-400 scale-105" : "border-gray-100"}`}>
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-1 text-xs font-bold text-white shadow-md">
                  Mas popular
                </span>
              )}
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${plan.color} text-white text-lg mb-3`}>
                🏷️
              </div>
              <h4 className="font-bold text-gray-900">{plan.name}</h4>
              <p className="text-xs text-gray-500">{plan.desc}</p>
              <p className="mt-2 text-2xl font-extrabold text-gray-900">{plan.price}</p>
              <p className="text-xs text-gray-400">Pago unico · Sin suscripcion</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-green-500 text-xs">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className={`mt-5 w-full rounded-lg py-2.5 text-sm font-semibold text-white transition-colors bg-gradient-to-r ${plan.color} hover:opacity-90`}>
                Obtener PawTag
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Demo mockup */}
      <div className="rounded-2xl bg-gradient-to-b from-gray-900 to-gray-800 p-6 text-white">
        <h3 className="text-lg font-bold text-center mb-4">Asi se ve cuando alguien escanea tu PawTag</h3>
        <div className="mx-auto max-w-xs rounded-2xl bg-gray-700/50 border border-gray-600 p-4 shadow-2xl">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center text-3xl">
              🐶
            </div>
            <p className="mt-2 text-lg font-bold">Luna</p>
            <p className="text-sm text-gray-300">Perro · Golden Retriever</p>
          </div>
          <div className="mt-4 rounded-xl bg-green-500/20 border border-green-500/40 p-3">
            <p className="text-xs text-green-300 font-medium">Encontraste a esta mascota?</p>
            <div className="mt-1 flex items-center gap-2 bg-green-500 rounded-lg px-3 py-2 text-white font-medium text-sm">
              <span>📞</span> Llamar a Alex — +57 310 555 0100
            </div>
          </div>
          <div className="mt-3 rounded-xl bg-gray-600/50 border border-gray-500/40 p-3">
            <p className="text-xs text-gray-400 font-medium">Info medica</p>
            <p className="text-sm text-gray-200 mt-1">⚠️ Alergias: Polen, Pollo</p>
            <p className="text-sm text-gray-200">💊 Apoquel 16mg diario</p>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-gray-400">
          El perfil se abre automaticamente al escanear — no requiere app
        </p>
      </div>
    </div>
  );
}

function ConocimientoTab() {
  const articles = [
    { category: "Nutricion", title: "Guia completa de alimentacion para perros en clima frio de Manizales", time: "8 min", color: "bg-green-100 text-green-700" },
    { category: "Salud", title: "Vacunacion en Colombia: calendario completo para perros y gatos 2026", time: "12 min", color: "bg-blue-100 text-blue-700" },
    { category: "Comportamiento", title: "Como socializar a tu cachorro en una ciudad como Manizales", time: "6 min", color: "bg-purple-100 text-purple-700" },
    { category: "Razas", title: "Razas ideales para apartamentos pequenos en zona cafetera", time: "10 min", color: "bg-amber-100 text-amber-700" },
    { category: "Cuidado Senior", title: "Artritis en perros mayores: como el clima frio afecta sus articulaciones", time: "7 min", color: "bg-red-100 text-red-700" },
    { category: "Primeros Auxilios", title: "Que hacer si tu mascota se intoxica con plantas comunes del eje cafetero", time: "5 min", color: "bg-orange-100 text-orange-700" },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-lg">📚</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Centro de Conocimiento</h2>
          <p className="text-sm text-gray-500">Guias y articulos para cuidar mejor a tu mascota</p>
        </div>
      </div>

      {/* Search bar mockup */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Buscar articulos, guias, razas..."
          disabled
          className="w-full rounded-xl border-2 border-purple-200 bg-white px-5 py-3.5 pl-12 text-gray-400 shadow-sm"
        />
        <svg className="absolute left-4 top-4 h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>

      {/* Categories pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {["Todo", "Nutricion", "Salud", "Comportamiento", "Razas", "Grooming", "Primeros Auxilios"].map((cat, i) => (
          <span key={cat} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-transform hover:scale-105 cursor-pointer ${i === 0 ? "bg-purple-600 text-white" : "bg-purple-50 text-purple-700 hover:bg-purple-100"}`}>
            {cat}
          </span>
        ))}
      </div>

      {/* Articles grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, i) => (
          <div
            key={i}
            className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${article.color}`}>
                {article.category}
              </span>
              <span className="text-xs text-gray-400">{article.time} lectura</span>
            </div>
            <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
              {article.title}
            </h3>
            <div className="mt-3 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-purple-500" style={{ width: `${30 + i * 12}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VeterinarioTab() {
  const vets = [
    { name: "Clinica Veterinaria La Manada", address: "Av. Santander #65-12, Manizales", rating: 4.8, reviews: 124, specialties: ["Cirugia", "Urgencias 24h"], phone: "606 887 2341" },
    { name: "Hospital Veterinario del Cafe", address: "Cra 23 #48-15, Barrio Palermo", rating: 4.9, reviews: 89, specialties: ["Dermatologia", "Oncologia"], phone: "606 882 5567" },
    { name: "VetPets Manizales", address: "Calle 59 #24-30, Centro", rating: 4.6, reviews: 203, specialties: ["Vacunacion", "Estetica"], phone: "606 884 1122" },
    { name: "Clinica Animal Care", address: "Cra 27 #72-05, Barrio Chipre", rating: 4.7, reviews: 67, specialties: ["Ortopedia", "Rehabilitacion"], phone: "606 881 9900" },
    { name: "Dr. Paws Centro Veterinario", address: "Av. Kevin Angel #15-42, Villamaria", rating: 4.5, reviews: 156, specialties: ["General", "Laboratorio"], phone: "606 886 3344" },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-lg">🏥</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Directorio Veterinario</h2>
          <p className="text-sm text-gray-500">Encuentra las mejores veterinarias en Manizales</p>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="mb-6 h-48 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-50 border-2 border-dashed border-emerald-300 flex items-center justify-center">
        <div className="text-center">
          <span className="text-4xl">🗺️</span>
          <p className="mt-2 text-sm font-medium text-emerald-700">Mapa interactivo de Manizales</p>
          <p className="text-xs text-emerald-600">Proximamente con ubicaciones en tiempo real</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {["Todas", "Urgencias 24h", "Cirugia", "Dermatologia", "Vacunacion", "Exoticos"].map((f, i) => (
          <span key={f} className={`rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer transition-all hover:scale-105 ${i === 0 ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}`}>
            {f}
          </span>
        ))}
      </div>

      {/* Vet cards */}
      <div className="space-y-4">
        {vets.map((vet, i) => (
          <div key={i} className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{vet.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{vet.address}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {vet.specialties.map((s) => (
                    <span key={s} className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">{s}</span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="font-bold text-gray-900">{vet.rating}</span>
                </div>
                <p className="text-xs text-gray-400">{vet.reviews} resenas</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="rounded-lg bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600 transition-colors">
                Llamar
              </button>
              <button className="rounded-lg border border-emerald-300 px-4 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors">
                Ver perfil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GroomingTab() {
  const services = [
    { name: "Spa Canino Manizales", service: "Bano + Corte completo", price: "$45.000 - $80.000", rating: 4.9, img: "🐩", time: "2-3 horas" },
    { name: "PeluPets Express", service: "Bano medicado", price: "$35.000 - $55.000", rating: 4.7, img: "🛁", time: "1-2 horas" },
    { name: "Huellitas Grooming", service: "Corte de unas + Limpieza oidos", price: "$20.000 - $30.000", rating: 4.8, img: "✨", time: "30 min" },
    { name: "Dog Fashion Manizales", service: "Spa premium + Aromaterapia", price: "$90.000 - $120.000", rating: 5.0, img: "👑", time: "3-4 horas" },
    { name: "Guarderia Patitas", service: "Guarderia dia completo", price: "$25.000/dia", rating: 4.6, img: "🏠", time: "8 horas" },
    { name: "WalkDog Caldas", service: "Paseo grupal (1 hora)", price: "$15.000/paseo", rating: 4.5, img: "🦮", time: "1 hora" },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white text-lg">✂️</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Grooming y Cuidado</h2>
          <p className="text-sm text-gray-500">Banos, cortes, paseos y guarderia en Manizales</p>
        </div>
      </div>

      {/* Service type buttons */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: "🛁", label: "Bano", count: 12 },
          { icon: "✂️", label: "Peluqueria", count: 8 },
          { icon: "🦮", label: "Paseos", count: 15 },
          { icon: "🏠", label: "Guarderia", count: 6 },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50 p-4 text-center hover:border-pink-400 hover:shadow-md transition-all duration-300 cursor-pointer">
            <span className="text-2xl">{s.icon}</span>
            <p className="mt-1 text-sm font-bold text-gray-900">{s.label}</p>
            <p className="text-xs text-pink-600">{s.count} opciones</p>
          </div>
        ))}
      </div>

      {/* Service cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {services.map((s, i) => (
          <div key={i} className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-xl hover:border-pink-200 transition-all duration-300 cursor-pointer">
            <div className="flex items-start gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-2xl group-hover:animate-bounce">
                {s.img}
              </span>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{s.name}</h3>
                <p className="text-sm text-gray-600">{s.service}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-pink-600">{s.price}</span>
                  <span className="text-xs text-gray-400">⏱️ {s.time}</span>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <span className="text-yellow-500 text-sm">{"★".repeat(Math.floor(s.rating))}</span>
                  <span className="text-xs text-gray-500">{s.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TelemedicinaTab() {
  const doctors = [
    { name: "Dra. Carolina Gomez", specialty: "Medicina interna", experience: "12 anos", available: true, price: "$35.000/consulta" },
    { name: "Dr. Andres Rios", specialty: "Dermatologia veterinaria", experience: "8 anos", available: true, price: "$40.000/consulta" },
    { name: "Dra. Valentina Cardona", specialty: "Nutricion animal", experience: "6 anos", available: false, price: "$30.000/consulta" },
    { name: "Dr. Felipe Ocampo", specialty: "Comportamiento y etologia", experience: "10 anos", available: true, price: "$45.000/consulta" },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg">💻</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Telemedicina Veterinaria</h2>
          <p className="text-sm text-gray-500">Consultas por video con veterinarios verificados</p>
        </div>
      </div>

      {/* How it works */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border border-blue-100">
        <h3 className="font-bold text-blue-900">Como funciona</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { step: "1", title: "Elige tu veterinario", desc: "Filtra por especialidad y disponibilidad" },
            { step: "2", title: "Agenda tu cita", desc: "Selecciona fecha y hora disponible" },
            { step: "3", title: "Consulta por video", desc: "Conectate desde tu celular o computador" },
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {s.step}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{s.title}</p>
                <p className="text-xs text-gray-600">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
        ⚠️ La telemedicina es para orientacion, seguimiento y segundas opiniones. Para emergencias, acude a una clinica presencial.
      </div>

      {/* Doctor cards */}
      <div className="space-y-4">
        {doctors.map((doc, i) => (
          <div key={i} className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-2xl">
                🩺
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900">{doc.name}</h3>
                  {doc.available && (
                    <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      Disponible
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{doc.specialty} — {doc.experience} experiencia</p>
                <p className="mt-1 font-semibold text-blue-600">{doc.price}</p>
              </div>
              <button className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${doc.available ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
                {doc.available ? "Agendar" : "No disponible"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SocialTab() {
  const posts = [
    { user: "Maria L.", pet: "Luna", breed: "Golden Retriever", content: "Paseando por el Parque Bicentenario esta manana 🌤️ Luna ama los dias soleados en Manizales!", likes: 34, comments: 8, time: "hace 2h" },
    { user: "Carlos M.", pet: "Thor", breed: "Pastor Aleman", content: "Thor completo su curso de obediencia basica! Muy orgulloso de este campeon 🏆", likes: 56, comments: 12, time: "hace 4h" },
    { user: "Ana P.", pet: "Michi", breed: "Persa", content: "Michi descubriendo la ventana nueva... los gatos y su curiosidad infinita 😺", likes: 89, comments: 23, time: "hace 6h" },
    { user: "Juan D.", pet: "Rocky", breed: "Bulldog Frances", content: "Primer dia de Rocky en la guarderia de la Cra 23. Se porto increible!", likes: 41, comments: 5, time: "hace 8h" },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-lg">👥</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Red Social PetWorld</h2>
          <p className="text-sm text-gray-500">Conecta con la comunidad de mascotas de Manizales</p>
        </div>
      </div>

      {/* Stories mockup */}
      <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
        {["Luna 🐕", "Milo 🐈", "Rocky 🐕", "Kira 🐕", "Simba 🐈", "Max 🐕", "Nala 🐈"].map((name, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer">
            <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${i === 0 ? "from-orange-400 to-pink-500" : "from-gray-200 to-gray-300"} p-0.5`}>
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-xl">
                {i % 2 === 0 ? "🐕" : "🐈"}
              </div>
            </div>
            <span className="text-xs text-gray-600 font-medium">{name}</span>
          </div>
        ))}
      </div>

      {/* Post feed */}
      <div className="space-y-4">
        {posts.map((post, i) => (
          <div key={i} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center text-lg">
                🐾
              </div>
              <div>
                <p className="font-bold text-gray-900">{post.pet} <span className="font-normal text-gray-500 text-sm">({post.breed})</span></p>
                <p className="text-xs text-gray-400">por {post.user} · {post.time}</p>
              </div>
            </div>
            <p className="mt-3 text-gray-700">{post.content}</p>
            {/* Placeholder image */}
            <div className="mt-3 h-40 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 flex items-center justify-center">
              <span className="text-4xl opacity-30">📷</span>
            </div>
            <div className="mt-3 flex items-center gap-6 text-sm text-gray-500">
              <button className="flex items-center gap-1 hover:text-red-500 transition-colors">❤️ {post.likes}</button>
              <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">💬 {post.comments}</button>
              <button className="flex items-center gap-1 hover:text-green-500 transition-colors">🔗 Compartir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EncuentrosTab() {
  const matches = [
    { name: "Lola", breed: "Labrador", age: "2 anos", energy: "Alta", size: "Grande", distance: "1.2 km", temperament: "Juguetona y sociable" },
    { name: "Toby", breed: "Schnauzer", age: "3 anos", energy: "Media", size: "Mediano", distance: "0.8 km", temperament: "Tranquilo y amigable" },
    { name: "Canela", breed: "Criolla", age: "1 ano", energy: "Alta", size: "Mediana", distance: "2.1 km", temperament: "Energica y curiosa" },
    { name: "Bruno", breed: "Beagle", age: "4 anos", energy: "Media", size: "Mediano", distance: "1.5 km", temperament: "Social y olfateador" },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white text-lg">🐾</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Encuentros y Citas de Juego</h2>
          <p className="text-sm text-gray-500">Encuentra companeros de paseo para tu mascota</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-xl bg-gradient-to-r from-pink-50 to-red-50 p-5 border border-pink-100">
        <h3 className="font-semibold text-gray-900 mb-3">Filtrar companeros</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div>
            <label className="text-xs font-medium text-gray-600">Tamano</label>
            <select disabled className="mt-1 w-full rounded-lg border border-pink-200 bg-white px-3 py-2 text-sm">
              <option>Todos</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Energia</label>
            <select disabled className="mt-1 w-full rounded-lg border border-pink-200 bg-white px-3 py-2 text-sm">
              <option>Alta</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Distancia</label>
            <select disabled className="mt-1 w-full rounded-lg border border-pink-200 bg-white px-3 py-2 text-sm">
              <option>{"< 3 km"}</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Vacunado</label>
            <select disabled className="mt-1 w-full rounded-lg border border-pink-200 bg-white px-3 py-2 text-sm">
              <option>Si</option>
            </select>
          </div>
        </div>
      </div>

      {/* Match cards - Tinder-style */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {matches.map((m, i) => (
          <div key={i} className="group rounded-2xl border-2 border-gray-100 bg-white p-5 shadow-sm hover:border-pink-300 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-pink-200 to-red-200 flex items-center justify-center text-3xl group-hover:animate-bounce">
                🐕
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{m.name}</h3>
                <p className="text-sm text-gray-500">{m.breed} · {m.age}</p>
                <p className="text-xs text-pink-600">📍 {m.distance} de ti</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600 italic">&ldquo;{m.temperament}&rdquo;</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs text-blue-700">Energia: {m.energy}</span>
              <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs text-green-700">Tamano: {m.size}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-lg bg-pink-500 py-2 text-sm font-semibold text-white hover:bg-pink-600 transition-colors">
                🐾 Quiero conocerlo!
              </button>
              <button className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50">
                Pasar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarketplaceTab() {
  const products = [
    { name: "Alimento Premium Ringo Cachorros", brand: "Ringo", price: "$89.900", oldPrice: "$99.900", category: "Alimento", rating: 4.7 },
    { name: "Cama Ortopedica para Perro Grande", brand: "PetComfort CO", price: "$149.000", oldPrice: null, category: "Accesorios", rating: 4.9 },
    { name: "Kit de Grooming en Casa", brand: "Huellitas", price: "$65.000", oldPrice: "$78.000", category: "Cuidado", rating: 4.6 },
    { name: "Collar GPS Rastreador", brand: "TrackPet", price: "$189.000", oldPrice: null, category: "Tecnologia", rating: 4.8 },
    { name: "Snacks Naturales de Pollo", brand: "NaturPet Caldas", price: "$22.900", oldPrice: "$27.000", category: "Snacks", rating: 4.5 },
    { name: "Juguete Interactivo Kong Classic", brand: "Kong", price: "$54.000", oldPrice: null, category: "Juguetes", rating: 4.9 },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-lg">🛒</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Marketplace PetWorld</h2>
          <p className="text-sm text-gray-500">Productos de marcas locales e independientes</p>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {["Todo", "Alimento", "Snacks", "Juguetes", "Cuidado", "Accesorios", "Tecnologia", "Medicinas"].map((c, i) => (
          <span key={c} className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium cursor-pointer transition-all hover:scale-105 ${i === 0 ? "bg-cyan-600 text-white shadow-md" : "bg-cyan-50 text-cyan-700 border border-cyan-200"}`}>
            {c}
          </span>
        ))}
      </div>

      {/* Promo banner */}
      <div className="mb-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-100">Envio gratis en Manizales</p>
            <p className="text-xl font-bold">En compras mayores a $80.000</p>
          </div>
          <span className="text-4xl animate-bounce">📦</span>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <div key={i} className="group rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
            {/* Image placeholder */}
            <div className="h-36 bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center group-hover:from-cyan-100 group-hover:to-blue-100 transition-colors">
              <span className="text-4xl opacity-50">📦</span>
            </div>
            <div className="p-4">
              <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-xs font-medium text-cyan-700">{p.category}</span>
              <h3 className="mt-2 font-semibold text-gray-900 text-sm line-clamp-2">{p.name}</h3>
              <p className="text-xs text-gray-500">{p.brand}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-lg font-bold text-cyan-600">{p.price}</span>
                {p.oldPrice && <span className="text-sm text-gray-400 line-through">{p.oldPrice}</span>}
              </div>
              <div className="mt-1 flex items-center gap-1">
                <span className="text-yellow-500 text-xs">★</span>
                <span className="text-xs text-gray-600">{p.rating}</span>
              </div>
              <button className="mt-3 w-full rounded-lg bg-cyan-500 py-2 text-sm font-semibold text-white hover:bg-cyan-600 transition-colors">
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventosTab() {
  const events = [
    { name: "CVDC 2026 — Congreso Veterinario de Colombia", date: "2026", location: "Colombia", type: "Profesional", free: false, attendees: 1200, url: "https://cvdc.com.co/" },
    { name: "Feria de Adopcion Manizales 2026", date: "Sabado 21 Junio", location: "Parque Caldas", type: "Adopcion", free: true, attendees: 234, url: null },
    { name: "Congreso Veterinario del Eje Cafetero", date: "15-17 Julio", location: "Centro de Convenciones", type: "Profesional", free: false, attendees: 89, url: null },
    { name: "Caminata Canina por Chipre", date: "Domingo 28 Junio", location: "Mirador de Chipre", type: "Comunidad", free: true, attendees: 156, url: null },
    { name: "Taller de Primeros Auxilios para Mascotas", date: "Sabado 5 Julio", location: "Clinica Animal Care", type: "Educacion", free: false, attendees: 32, url: null },
    { name: "Festival Pet-Friendly Coffee", date: "12-13 Julio", location: "Recinto del Pensamiento", type: "Festival", free: false, attendees: 412, url: null },
    { name: "Jornada de Vacunacion Gratuita", date: "Sabado 19 Julio", location: "Coliseo Mayor", type: "Salud", free: true, attendees: 567, url: null },
  ];

  const typeColors: Record<string, string> = {
    Adopcion: "bg-green-100 text-green-700",
    Profesional: "bg-blue-100 text-blue-700",
    Comunidad: "bg-amber-100 text-amber-700",
    Educacion: "bg-purple-100 text-purple-700",
    Festival: "bg-pink-100 text-pink-700",
    Salud: "bg-red-100 text-red-700",
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-white text-lg">🎉</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Eventos Pet-Friendly</h2>
          <p className="text-sm text-gray-500">Ferias, talleres, caminatas y mas en Manizales y Colombia</p>
        </div>
      </div>

      {/* CVDC 2026 Featured Invitation */}
      <a
        href="https://cvdc.com.co/"
        target="_blank"
        rel="noopener noreferrer"
        className="group mb-6 block rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-6 text-white shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDgpIi8+PC9zdmc+')] opacity-50" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-3xl">🏛️</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded-full bg-yellow-400/20 text-yellow-200 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide">Evento destacado</span>
              <span className="rounded-full bg-white/10 text-white/80 px-2.5 py-0.5 text-xs font-medium">Profesional</span>
            </div>
            <h3 className="mt-2 text-xl font-extrabold group-hover:underline decoration-2 underline-offset-4">
              CVDC 2026 — Congreso Veterinario de Colombia
            </h3>
            <p className="mt-1 text-sm text-white/80">
              El evento mas importante de la medicina veterinaria en Colombia. Conferencias, talleres, networking y las ultimas innovaciones del sector.
            </p>
          </div>
          <div className="flex-shrink-0 hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </div>
        </div>
        <div className="relative mt-3 flex items-center gap-4 text-sm text-white/70">
          <span>📅 2026</span>
          <span>📍 Colombia</span>
          <span className="ml-auto text-xs text-white/50 group-hover:text-white/80 transition-colors">cvdc.com.co →</span>
        </div>
      </a>

      {/* Calendar visual */}
      <div className="mb-6 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-amber-200 p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-amber-900">Junio - Julio 2026</h3>
          <div className="flex gap-2">
            <button className="rounded-md bg-amber-200 px-3 py-1 text-sm font-medium text-amber-800">← Anterior</button>
            <button className="rounded-md bg-amber-200 px-3 py-1 text-sm font-medium text-amber-800">Siguiente →</button>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs">
          {["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"].map((d) => (
            <span key={d} className="font-medium text-amber-700 py-1">{d}</span>
          ))}
          {Array.from({ length: 30 }, (_, i) => (
            <span key={i} className={`py-1.5 rounded-md ${[20, 27].includes(i) ? "bg-amber-400 text-white font-bold" : [4, 14].includes(i) ? "bg-amber-200 text-amber-800" : "text-gray-600"}`}>
              {i + 1}
            </span>
          ))}
        </div>
      </div>

      {/* Filter by type */}
      <div className="mb-6 flex flex-wrap gap-2">
        {["Todos", "Adopcion", "Comunidad", "Educacion", "Profesional", "Festival", "Salud"].map((t, i) => (
          <span key={t} className={`rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer transition-all hover:scale-105 ${i === 0 ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
            {t}
          </span>
        ))}
      </div>

      {/* Events list */}
      <div className="space-y-4">
        {events.map((event, i) => (
          <div key={i} className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg hover:border-amber-200 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeColors[event.type]}`}>
                    {event.type}
                  </span>
                  {event.free && (
                    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                      Gratis
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-bold text-gray-900 group-hover:text-amber-600 transition-colors">{event.name}</h3>
                <p className="mt-1 text-sm text-gray-500">📅 {event.date}</p>
                <p className="text-sm text-gray-500">📍 {event.location}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-amber-600">{event.attendees}</p>
                <p className="text-xs text-gray-400">interesados</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              {event.url ? (
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-amber-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-amber-600 transition-colors"
                >
                  Visitar sitio web
                </a>
              ) : (
                <button className="rounded-lg bg-amber-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-amber-600 transition-colors">
                  Me interesa
                </button>
              )}
              <button className="rounded-lg border border-amber-300 px-4 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-50 transition-colors">
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
