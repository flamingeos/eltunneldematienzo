"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, ToggleLeft, ToggleRight, Tag } from "lucide-react";

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  active: boolean;
  expiresAt: Date | null;
  createdAt: Date;
}

const inputClass =
  "w-full bg-[#050505] border border-[#007BFF]/20 rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#007BFF] transition-all text-sm";

export default function PromotionsAdminClient({
  promotions: initial,
}: {
  promotions: Promotion[];
}) {
  const [promotions, setPromotions] = useState(initial);
  const [form, setForm] = useState({
    title: "", description: "", discount: "", expiresAt: "",
  });
  const [creating, setCreating] = useState(false);

  async function createPromotion(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch("/api/promotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, active: true }),
      });
      if (res.ok) {
        const promo = await res.json();
        setPromotions((prev) => [promo, ...prev]);
        setForm({ title: "", description: "", discount: "", expiresAt: "" });
      }
    } finally {
      setCreating(false);
    }
  }

  async function toggleActive(id: string, active: boolean) {
    await fetch(`/api/promotions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    setPromotions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !active } : p))
    );
  }

  async function deletePromotion(id: string) {
    if (!confirm("¿Eliminar esta promoción?")) return;
    await fetch(`/api/promotions/${id}`, { method: "DELETE" });
    setPromotions((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="p-6 lg:p-8 pt-16 lg:pt-8">
      <div className="mb-6">
        <h1 className="text-white font-black text-2xl">Promociones</h1>
        <p className="text-gray-500 text-sm">{promotions.filter((p) => p.active).length} activas</p>
      </div>

      {/* Create form */}
      <form
        onSubmit={createPromotion}
        className="glass rounded-2xl border border-[#007BFF]/20 p-6 mb-6"
      >
        <h2 className="text-white font-bold mb-4 flex items-center gap-2">
          <Plus size={18} className="text-[#007BFF]" />
          Nueva Promoción
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Título (ej: Monday Wash)"
            className={inputClass}
            required
          />
          <input
            value={form.discount}
            onChange={(e) => setForm({ ...form, discount: e.target.value })}
            placeholder="Descuento (ej: 15% OFF)"
            className={inputClass}
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Descripción"
            className={inputClass}
            required
          />
          <input
            type="date"
            value={form.expiresAt}
            onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
            className={inputClass}
            placeholder="Fecha de expiración (opcional)"
          />
        </div>
        <button
          type="submit"
          disabled={creating}
          className="px-6 py-2.5 bg-[#007BFF] text-white font-semibold rounded-xl hover:bg-[#0066dd] transition-all text-sm disabled:opacity-60"
        >
          {creating ? "Creando..." : "Crear Promoción"}
        </button>
      </form>

      {/* List */}
      <div className="glass rounded-2xl border border-[#007BFF]/15 overflow-hidden">
        {promotions.length === 0 ? (
          <div className="py-12 text-center">
            <Tag size={32} className="text-gray-700 mx-auto mb-3" />
            <p className="text-gray-600">No hay promociones aún</p>
          </div>
        ) : (
          <div className="divide-y divide-[#007BFF]/05">
            {promotions.map((promo) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-6 py-4 flex items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-medium truncate">{promo.title}</p>
                    <span className="text-xs bg-[#007BFF]/20 text-[#007BFF] px-2 py-0.5 rounded-full shrink-0">
                      {promo.discount}
                    </span>
                    {!promo.active && (
                      <span className="text-xs bg-red-400/10 text-red-400 px-2 py-0.5 rounded-full shrink-0">
                        Inactiva
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs truncate">{promo.description}</p>
                  {promo.expiresAt && (
                    <p className="text-yellow-500 text-xs mt-0.5">
                      Expira: {new Date(promo.expiresAt).toLocaleDateString("es-PR")}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleActive(promo.id, promo.active)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      promo.active
                        ? "text-green-400 hover:bg-green-400/10"
                        : "text-gray-600 hover:bg-white/5"
                    }`}
                  >
                    {promo.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                  </button>
                  <button
                    onClick={() => deletePromotion(promo.id)}
                    className="p-1.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
