"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { CalendarCheck, CheckCircle, ChevronRight, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Teléfono requerido"),
  service: z.string().min(1, "Selecciona un servicio"),
  vehicleType: z.string().min(1, "Selecciona tu vehículo"),
  date: z.string().min(1, "Selecciona una fecha"),
  time: z.string().min(1, "Selecciona una hora"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const services = [
  "Lavado Exterior", "Foam Bath", "Hand Wash", "Wheel Cleaning", "Tire Shine",
  "Full Detail", "Interior Deep Clean", "Steam Cleaning", "Leather Treatment",
  "Stain Removal", "Ceramic Coating", "Paint Protection", "Hydrophobic Finish",
  "Multi-Year Protection", "Paint Correction", "Swirl Removal",
  "Scratch Reduction", "Gloss Enhancement",
];

const vehicles = ["Sedan", "SUV / Crossover", "Pickup Truck", "Coupe / Sports", "Van / Minivan", "Luxury / Exotic"];

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

const inputClass =
  "w-full bg-[#0a0a0a] border border-[#007BFF]/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#007BFF] focus:shadow-[0_0_15px_rgba(0,123,255,0.2)] transition-all text-sm";

export default function BookingPage() {
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSuccess(true);
        reset();
      }
    } finally {
      setSubmitting(false);
    }
  }

  // Get min date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-[#007BFF] text-sm font-semibold uppercase tracking-widest mb-3">
            Reservaciones
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Reserva tu{" "}
            <span className="text-[#007BFF]">Cita</span>
          </h1>
          <p className="text-gray-400">
            Llena el formulario y te confirmamos tu cita por email.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl p-12 border border-[#007BFF]/30 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 rounded-full bg-[#007BFF]/20 border border-[#007BFF]/40 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle size={40} className="text-[#007BFF]" />
              </motion.div>
              <h2 className="text-white font-black text-3xl mb-3">
                ¡Cita Confirmada!
              </h2>
              <p className="text-gray-400 mb-8">
                Te enviamos un email de confirmación. Nos vemos pronto.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="px-8 py-3 bg-[#007BFF] text-white font-bold rounded-xl hover:bg-[#0066dd] transition-all"
              >
                Reservar Otra Cita
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="glass rounded-3xl p-8 border border-[#007BFF]/20 space-y-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <CalendarCheck size={20} className="text-[#007BFF]" />
                <h2 className="text-white font-bold text-lg">Información de la Cita</h2>
              </div>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Nombre completo</label>
                  <input {...register("name")} placeholder="Juan García" className={inputClass} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                  <input {...register("email")} type="email" placeholder="juan@email.com" className={inputClass} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              {/* Phone + Vehicle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Teléfono</label>
                  <input {...register("phone")} placeholder="(787) 555-0000" className={inputClass} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Tipo de vehículo</label>
                  <select {...register("vehicleType")} className={inputClass}>
                    <option value="">Seleccionar...</option>
                    {vehicles.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                  {errors.vehicleType && <p className="text-red-500 text-xs mt-1">{errors.vehicleType.message}</p>}
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Servicio</label>
                <select {...register("service")} className={inputClass}>
                  <option value="">Seleccionar servicio...</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
              </div>

              {/* Date + Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Fecha</label>
                  <input {...register("date")} type="date" min={today} className={inputClass} />
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Hora</label>
                  <select {...register("time")} className={inputClass}>
                    <option value="">Seleccionar hora...</option>
                    {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Notas adicionales (opcional)</label>
                <textarea
                  {...register("notes")}
                  placeholder="Ej: Tengo rayones en el capó, quiero ceramic coating..."
                  rows={3}
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#007BFF] text-white font-bold rounded-xl text-lg hover:bg-[#0066dd] transition-all hover:shadow-[0_0_30px_rgba(0,123,255,0.5)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Confirmar Reserva
                    <ChevronRight size={20} />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
