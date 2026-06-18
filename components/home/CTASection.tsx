"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarCheck, ChevronRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#080c14] to-[#050505]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-12 border border-[#007BFF]/30 shadow-[0_0_60px_rgba(0,123,255,0.15)]"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#007BFF]/20 border border-[#007BFF]/40 flex items-center justify-center mx-auto mb-6">
            <CalendarCheck size={32} className="text-[#007BFF]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
            ¿Listo para el{" "}
            <span className="text-[#007BFF]">Mejor Detailing</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Reserva tu cita ahora y dale a tu vehículo el tratamiento de lujo
            que merece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#007BFF] text-white font-bold rounded-xl text-lg hover:bg-[#0066dd] transition-all hover:shadow-[0_0_30px_rgba(0,123,255,0.6)]"
            >
              Reservar Ahora
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/memberships"
              className="inline-flex items-center justify-center px-10 py-4 border border-[#007BFF]/40 text-white font-semibold rounded-xl text-lg hover:border-[#007BFF] hover:bg-[#007BFF]/10 transition-all"
            >
              Ver Membresías
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
