"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Trash2, CheckCircle, Clock } from "lucide-react";

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  vehicleType: string;
  date: string;
  time: string;
  status: string;
  notes: string | null;
  createdAt: Date;
}

export default function AppointmentsClient({
  appointments: initial,
}: {
  appointments: Appointment[];
}) {
  const [appointments, setAppointments] = useState(initial);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = appointments.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filter === "all" || a.status === filter;
    return matchSearch && matchStatus;
  });

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  }

  async function deleteAppointment(id: string) {
    if (!confirm("¿Eliminar esta cita?")) return;
    await fetch(`/api/appointments/${id}`, { method: "DELETE" });
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="p-6 lg:p-8 pt-16 lg:pt-8">
      <div className="mb-6">
        <h1 className="text-white font-black text-2xl">Citas</h1>
        <p className="text-gray-500 text-sm">{appointments.length} citas en total</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, servicio o email..."
            className="w-full bg-[#0a0a0a] border border-[#007BFF]/20 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#007BFF] transition-all"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-[#0a0a0a] border border-[#007BFF]/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#007BFF] transition-all"
        >
          <option value="all">Todas</option>
          <option value="pending">Pendientes</option>
          <option value="confirmed">Confirmadas</option>
          <option value="cancelled">Canceladas</option>
        </select>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl border border-[#007BFF]/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#007BFF]/10">
                <th className="text-left px-5 py-3.5 text-gray-500 font-medium">Cliente</th>
                <th className="text-left px-5 py-3.5 text-gray-500 font-medium hidden md:table-cell">Servicio</th>
                <th className="text-left px-5 py-3.5 text-gray-500 font-medium hidden lg:table-cell">Fecha / Hora</th>
                <th className="text-left px-5 py-3.5 text-gray-500 font-medium">Estado</th>
                <th className="text-right px-5 py-3.5 text-gray-500 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#007BFF]/05">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-600">
                    No se encontraron citas
                  </td>
                </tr>
              ) : (
                filtered.map((apt) => (
                  <motion.tr
                    key={apt.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-[#007BFF]/03 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <p className="text-white font-medium">{apt.name}</p>
                      <p className="text-gray-500 text-xs">{apt.email}</p>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <p className="text-gray-300">{apt.service}</p>
                      <p className="text-gray-600 text-xs">{apt.vehicleType}</p>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <p className="text-gray-300">{apt.date}</p>
                      <p className="text-gray-600 text-xs">{apt.time}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        apt.status === "pending"
                          ? "bg-yellow-400/10 text-yellow-400"
                          : apt.status === "confirmed"
                          ? "bg-green-400/10 text-green-400"
                          : "bg-red-400/10 text-red-400"
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {apt.status !== "confirmed" && (
                          <button
                            onClick={() => updateStatus(apt.id, "confirmed")}
                            className="p-1.5 rounded-lg text-green-400 hover:bg-green-400/10 transition-colors"
                            title="Confirmar"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        {apt.status !== "cancelled" && (
                          <button
                            onClick={() => updateStatus(apt.id, "cancelled")}
                            className="p-1.5 rounded-lg text-yellow-400 hover:bg-yellow-400/10 transition-colors"
                            title="Cancelar"
                          >
                            <Clock size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteAppointment(apt.id)}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
