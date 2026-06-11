"use client";

import { useState } from "react";

interface PawTagSectionProps {
  petId: string;
  tagId: string;
  petName: string;
  ownerName: string | null;
  ownerPhone: string | null;
  altPhone: string | null;
  allergies: string | null;
  medications: string | null;
  conditions: string | null;
  vetName: string | null;
  vetPhone: string | null;
}

export function PawTagSection(props: PawTagSectionProps) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [error, setError] = useState("");
  const [nfcSupported] = useState(() => typeof window !== "undefined" && "NDEFReader" in window);

  const [form, setForm] = useState({
    ownerName: props.ownerName || "",
    ownerPhone: props.ownerPhone || "",
    altPhone: props.altPhone || "",
    allergies: props.allergies || "",
    medications: props.medications || "",
    conditions: props.conditions || "",
    vetName: props.vetName || "",
    vetPhone: props.vetPhone || "",
  });

  const publicUrl = typeof window !== "undefined"
    ? `${window.location.origin}/p/${props.tagId}`
    : `/p/${props.tagId}`;

  function copyUrl() {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function writeNFC() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ndef = new (window as any).NDEFReader();
      await ndef.write({ records: [{ recordType: "url", data: publicUrl }] });
      alert("URL escrita en el tag NFC exitosamente!");
    } catch (err) {
      alert("Error al escribir NFC: " + (err as Error).message);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setSaveMsg("");
    try {
      const res = await fetch(`/api/pets/${props.petId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerName: form.ownerName || null,
          ownerPhone: form.ownerPhone || null,
          altPhone: form.altPhone || null,
          allergies: form.allergies || null,
          medications: form.medications || null,
          conditions: form.conditions || null,
          vetName: form.vetName || null,
          vetPhone: form.vetPhone || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al guardar");
      }
      setSaveMsg("Guardado");
      setTimeout(() => setSaveMsg(""), 2500);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  return (
    <div className="mt-8 space-y-6">
      {/* Public URL & QR */}
      <div className="rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 p-6">
        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-white text-sm">🏷️</span>
          PawTag — ID Digital
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Esta es la URL publica de {props.petName}. Escribela en un tag NFC o genera un QR para el collar.
        </p>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            readOnly
            value={publicUrl}
            className="flex-1 rounded-lg border border-orange-200 bg-white px-3 py-2 text-sm text-gray-700 font-mono"
          />
          <button
            onClick={copyUrl}
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
          >
            {copied ? "Copiado!" : "Copiar"}
          </button>
        </div>

        {/* QR Code inline using a simple API (no dependency needed) */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="rounded-xl bg-white p-3 shadow-md border border-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(publicUrl)}`}
              alt={`QR code para ${props.petName}`}
              width={180}
              height={180}
              className="rounded"
            />
          </div>
          <p className="text-xs text-gray-500">Escanea para ver el perfil publico</p>
        </div>

        {nfcSupported && (
          <button
            onClick={writeNFC}
            className="mt-4 w-full rounded-lg border-2 border-orange-300 bg-white px-4 py-2.5 text-sm font-semibold text-orange-700 hover:bg-orange-50 transition-colors"
          >
            📡 Escribir URL en tag NFC
          </button>
        )}
      </div>

      {/* Contact info for lost pet */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
          <span>📞</span> Contacto para mascota perdida
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Esta informacion aparece en el perfil publico cuando alguien escanea el tag.
        </p>

        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del dueno</label>
            <input
              type="text"
              value={form.ownerName}
              onChange={set("ownerName")}
              placeholder="Tu nombre completo"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Telefono principal</label>
              <input
                type="tel"
                value={form.ownerPhone}
                onChange={set("ownerPhone")}
                placeholder="+57 310 555 0100"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Telefono alternativo</label>
              <input
                type="tel"
                value={form.altPhone}
                onChange={set("altPhone")}
                placeholder="+57 310 555 0101"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Medical info */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
          <span>🏥</span> Informacion medica
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Datos medicos importantes visibles para quien encuentre a tu mascota.
        </p>

        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Alergias</label>
            <textarea
              value={form.allergies}
              onChange={set("allergies")}
              placeholder="Ej: Polen, Pollo"
              rows={2}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Medicamentos</label>
            <textarea
              value={form.medications}
              onChange={set("medications")}
              placeholder="Ej: Apoquel 16mg diario"
              rows={2}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Condiciones</label>
            <textarea
              value={form.conditions}
              onChange={set("conditions")}
              placeholder="Ej: Alergias estacionales, displasia de cadera"
              rows={2}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre del veterinario</label>
              <input
                type="text"
                value={form.vetName}
                onChange={set("vetName")}
                placeholder="Dra. Carolina Gomez"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Telefono del veterinario</label>
              <input
                type="tel"
                value={form.vetPhone}
                onChange={set("vetPhone")}
                placeholder="+57 606 882 0200"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2.5 font-semibold text-white shadow-md hover:shadow-lg disabled:opacity-50 transition-all"
        >
          {saving ? "Guardando..." : "Guardar datos PawTag"}
        </button>
        {saveMsg && <span className="text-sm font-medium text-green-600">{saveMsg}</span>}
        {error && <span className="text-sm font-medium text-red-600">{error}</span>}
      </div>
    </div>
  );
}
