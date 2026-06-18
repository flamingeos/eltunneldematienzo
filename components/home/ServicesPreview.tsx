"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Droplets, Wind, Sparkles, Shield, ChevronRight } from "lucide-react";

const services = [
  {
    icon: <Droplets size={28} />,
    title: "Lavado Exterior",
    desc: "Foam bath, hand wash, wheel cleaning y tire shine profesional.",
    color: "from-blue-600 to-blue-400",
  },
  {
    icon: <Wind size={28} />,
    title: "Interior Deep Clean",
    desc: "Steam cleaning, leather treatment, vacuuming y eliminación de olores.",
    color: "from-cyan-600 to-cyan-400",
  },
  {
    icon: <Sparkles size={28} />,
    title: "Ceramic Coating",
    desc: "Protección cerámica hidrofóbica de múltiples años con acabado espejo.",
    color: "from-purple-600 to-purple-400",
  },
  {
    icon: <Shield size={28} />,
    title: "Corrección de Pintura",
    desc: "Eliminación de swirls, scratches y restauración del brillo original.",
    color: "from-blue-700 to-cyan-500",
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[#007BFF] text-sm font-semibold uppercase tracking-widest mb-3">
            Nuestros Servicios
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
            Tratamiento de Lujo
            <br />
            <span className="text-[#007BFF]">para tu Vehículo</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Desde un lavado express hasta un detailing completo con ceramic
            coating. Tu auto merece lo mejor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass rounded-2xl p-6 group cursor-pointer border border-[#007BFF]/20 hover:border-[#007BFF]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,123,255,0.2)]"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-5 group-hover:shadow-[0_0_20px_rgba(0,123,255,0.5)] transition-shadow`}
              >
                {s.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#007BFF] font-semibold hover:text-[#00AFFF] transition-colors"
          >
            Ver todos los servicios <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
