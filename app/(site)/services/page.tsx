"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Droplets, Wind, Sparkles, Shield, Car, Zap, Sun, Layers,
  Brush, Flame, Gem, Star, ChevronRight
} from "lucide-react";

const services = [
  { icon: <Droplets size={28} />, title: "Lavado Exterior", desc: "Foam bath profesional con espuma activa que levanta la suciedad sin dañar la pintura.", category: "Exterior" },
  { icon: <Zap size={28} />, title: "Foam Bath", desc: "Aplicación de espuma de alta densidad para una limpieza profunda y segura.", category: "Exterior" },
  { icon: <Brush size={28} />, title: "Hand Wash", desc: "Lavado a mano con microfibra premium para cero rayaduras ni daños.", category: "Exterior" },
  { icon: <Car size={28} />, title: "Wheel Cleaning", desc: "Limpieza profunda de aros, frenos y llantas con productos especializados.", category: "Exterior" },
  { icon: <Sun size={28} />, title: "Tire Shine", desc: "Aplicación de brillo de goma para un look premium y protección UV.", category: "Exterior" },
  { icon: <Star size={28} />, title: "Full Detail", desc: "El paquete completo: exterior, interior y todos los detalles de lujo.", category: "Exterior" },
  { icon: <Wind size={28} />, title: "Interior Deep Clean", desc: "Limpieza profunda de toda la cabina: tapicería, alfombras, plásticos y cristales.", category: "Interior" },
  { icon: <Flame size={28} />, title: "Steam Cleaning", desc: "Sanitización con vapor a alta presión que elimina bacterias, gérmenes y olores.", category: "Interior" },
  { icon: <Layers size={28} />, title: "Leather Treatment", desc: "Limpieza y acondicionamiento de cuero con productos importados.", category: "Interior" },
  { icon: <Sparkles size={28} />, title: "Stain Removal", desc: "Eliminación de manchas difíciles en tapicería y alfombras con extractor industrial.", category: "Interior" },
  { icon: <Gem size={28} />, title: "Ceramic Coating", desc: "Protección cerámica de grado profesional con acabado hidrofóbico espejo.", category: "Protección" },
  { icon: <Shield size={28} />, title: "Paint Protection", desc: "Film de protección transparente que protege contra impactos y rayones.", category: "Protección" },
  { icon: <Droplets size={28} />, title: "Hydrophobic Finish", desc: "Sellador hidrofóbico que repele el agua y facilita la limpieza.", category: "Protección" },
  { icon: <Star size={28} />, title: "Multi-Year Protection", desc: "Paquetes de protección cerámica con garantía de 2, 3 y 5 años.", category: "Protección" },
  { icon: <Zap size={28} />, title: "Paint Correction", desc: "Corrección de pintura en 1, 2 o 3 pasos para eliminar imperfecciones.", category: "Corrección" },
  { icon: <Sun size={28} />, title: "Swirl Removal", desc: "Eliminación de swirl marks con máquina de orbita dual de precisión.", category: "Corrección" },
  { icon: <Brush size={28} />, title: "Scratch Reduction", desc: "Reducción de rayaduras superficiales y oxidación en la pintura.", category: "Corrección" },
  { icon: <Gem size={28} />, title: "Gloss Enhancement", desc: "Pulido de brillo para maximizar el gloss y la profundidad del color.", category: "Corrección" },
];

const categories = ["Todos", "Exterior", "Interior", "Protección", "Corrección"];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-[#007BFF] text-sm font-semibold uppercase tracking-widest mb-3">
            Servicios
          </p>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-4">
            Todos Nuestros
            <br />
            <span className="text-[#007BFF]">Servicios Premium</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Desde un lavado exterior hasta ceramic coating de 5 años. Cada
            servicio realizado con los mejores productos y técnicas del mercado.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.07 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 border border-[#007BFF]/15 hover:border-[#007BFF]/40 transition-all group hover:shadow-[0_0_30px_rgba(0,123,255,0.15)]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#007BFF]/15 border border-[#007BFF]/30 flex items-center justify-center text-[#007BFF] group-hover:bg-[#007BFF]/25 transition-colors">
                  {s.icon}
                </div>
                <span className="text-xs text-[#007BFF] bg-[#007BFF]/10 px-2 py-1 rounded-full font-medium">
                  {s.category}
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{s.desc}</p>
              <Link
                href="/booking"
                className="inline-flex items-center gap-1 text-[#007BFF] text-sm font-semibold hover:text-[#00AFFF] transition-colors"
              >
                Reservar <ChevronRight size={15} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#007BFF] text-white font-bold rounded-xl text-lg hover:bg-[#0066dd] transition-all hover:shadow-[0_0_30px_rgba(0,123,255,0.5)]"
          >
            Reservar Ahora <ChevronRight size={20} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
