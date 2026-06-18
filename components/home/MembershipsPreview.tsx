"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "$59.99",
    period: "/mes",
    features: ["Lavado Exterior", "Foam Wax", "Tire Shine", "Lavados Ilimitados"],
    popular: false,
    color: "border-[#007BFF]/20",
    btn: "bg-[#007BFF]/10 text-[#007BFF] hover:bg-[#007BFF]/20",
  },
  {
    name: "Plus",
    price: "$79.99",
    period: "/mes",
    features: ["Interior + Exterior", "Vacuum", "Ambientador", "Foam Wax", "Lavados Ilimitados"],
    popular: true,
    color: "border-[#007BFF]",
    btn: "bg-[#007BFF] text-white hover:bg-[#0066dd]",
  },
  {
    name: "Premium",
    price: "$99.99",
    period: "/mes",
    features: ["Detailing Completo", "Steam Cleaning", "Mantenimiento Cerámico", "Programación Prioritaria"],
    popular: false,
    color: "border-[#007BFF]/20",
    btn: "bg-[#007BFF]/10 text-[#007BFF] hover:bg-[#007BFF]/20",
  },
];

export default function MembershipsPreview() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#050505] to-[#080c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[#007BFF] text-sm font-semibold uppercase tracking-widest mb-3">
            Membresías
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
            Ahorra Cada Mes
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Elige el plan perfecto para tu vehículo y disfruta de lavados
            ilimitados por un precio mensual fijo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-6 border ${plan.color} glass ${
                plan.popular
                  ? "shadow-[0_0_40px_rgba(0,123,255,0.3)]"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#007BFF] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  Más Popular
                </div>
              )}
              <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                <span className="text-gray-500 mb-1">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check size={15} className="text-[#007BFF] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/memberships"
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${plan.btn}`}
              >
                Empezar Ahora
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
