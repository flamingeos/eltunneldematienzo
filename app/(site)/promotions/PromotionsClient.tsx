"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Tag, Clock, ChevronRight, Zap } from "lucide-react";

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  expiresAt: Date | null;
}

const defaultPromos = [
  { id: "1", title: "Monday Wash", description: "Lavado exterior completo con foam wax incluido.", discount: "15% OFF", expiresAt: null },
  { id: "2", title: "Wednesday Special", description: "Lavado completo todo el día a precio especial.", discount: "$25 Todo el Día", expiresAt: null },
  { id: "3", title: "Segunda Visita", description: "Tu segundo lavado del mes con descuento exclusivo.", discount: "50% OFF", expiresAt: null },
];

export default function PromotionsClient({ promotions }: { promotions: Promotion[] }) {
  const display = promotions.length > 0 ? promotions : defaultPromos;

  return (
    <div className="min-h-screen bg-[#050505] pt-20 pb-16 md:pt-24 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-[#007BFF] text-sm font-semibold uppercase tracking-widest mb-3">
            Promociones
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Ofertas{" "}
            <span className="text-[#007BFF]">Activas</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg">
            Aprovecha nuestras promociones exclusivas y ahorra en cada visita.
          </p>
        </motion.div>

        {display.length === 0 ? (
          <div className="text-center py-20">
            <Zap size={48} className="text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No hay promociones activas por el momento.</p>
            <p className="text-gray-600 text-sm mt-2">¡Vuelve pronto para ver nuevas ofertas!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {display.map((promo, i) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="glass rounded-2xl overflow-hidden border border-[#007BFF]/20 hover:border-[#007BFF]/50 transition-all group hover:shadow-[0_0_30px_rgba(0,123,255,0.2)]"
              >
                {/* Discount badge */}
                <div className="bg-gradient-to-r from-[#007BFF] to-[#00AFFF] px-6 py-5 relative overflow-hidden">
                  <div className="absolute inset-0 animate-shine" />
                  <div className="flex items-center justify-between">
                    <span className="text-white font-black text-2xl">{promo.discount}</span>
                    <Tag size={24} className="text-white/60" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-white font-bold text-xl mb-2">{promo.title}</h3>
                  <p className="text-gray-400 text-sm mb-5 leading-relaxed">{promo.description}</p>

                  {promo.expiresAt && (
                    <div className="flex items-center gap-1.5 text-xs text-yellow-400 mb-5">
                      <Clock size={13} />
                      Expira: {new Date(promo.expiresAt).toLocaleDateString("es-PR")}
                    </div>
                  )}

                  <Link
                    href="/booking"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#007BFF]/15 border border-[#007BFF]/30 text-[#007BFF] font-semibold rounded-xl hover:bg-[#007BFF]/25 transition-colors text-sm"
                  >
                    Reservar con esta oferta <ChevronRight size={15} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
