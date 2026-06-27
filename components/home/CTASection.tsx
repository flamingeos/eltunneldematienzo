"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarCheck, ChevronRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#080c14] to-[#050505]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#007BFF]/30 shadow-[0_0_60px_rgba(0,123,255,0.15)]"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#007BFF]/20 border border-[#007BFF]/40 flex items-center justify-center mx-auto mb-5 sm:mb-6">
            <CalendarCheck size={28} className="text-[#007BFF] sm:hidden" />
            <CalendarCheck size={32} className="text-[#007BFF] hidden sm:block" />
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4">
            ¿Listo para el{" "}
            <span className="text-[#007BFF]">Mejor Detailing</span>?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mb-7 sm:mb-10 max-w-xl mx-auto">
            Reserva tu cita ahora y dale a tu vehículo el tratamiento de lujo
            que merece.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/booking"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 sm:px-10 bg-[#007BFF] text-white font-bold rounded-xl text-base sm:text-lg hover:bg-[#0066dd] transition-all hover:shadow-[0_0_30px_rgba(0,123,255,0.6)]"
            >
              Reservar Ahora
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/memberships"
              className="inline-flex items-center justify-center px-8 py-4 sm:px-10 border border-[#007BFF]/40 text-white font-semibold rounded-xl text-base sm:text-lg hover:border-[#007BFF] hover:bg-[#007BFF]/10 transition-all"
            >
              Ver Membresías
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
