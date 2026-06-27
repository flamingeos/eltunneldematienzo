"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Zap, DollarSign } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Basic",
    price: 59.99,
    features: [
      "Lavado Exterior",
      "Foam Wax",
      "Tire Shine",
      "Lavados Ilimitados",
    ],
    popular: false,
    savings: "Ahorra $40+/mes",
  },
  {
    name: "Plus",
    price: 79.99,
    features: [
      "Interior + Exterior",
      "Vacuum Profesional",
      "Ambientador Premium",
      "Foam Wax",
      "Lavados Ilimitados",
    ],
    popular: true,
    savings: "Ahorra $60+/mes",
  },
  {
    name: "Premium",
    price: 99.99,
    features: [
      "Detailing Completo",
      "Steam Cleaning",
      "Mantenimiento Cerámico",
      "Programación Prioritaria",
    ],
    popular: false,
    savings: "Ahorra $100+/mes",
  },
];

function SavingsCalculator() {
  const [visits, setVisits] = useState(4);
  const pricePerVisit = 35;
  const total = visits * pricePerVisit;
  const plusPlan = 79.99;
  const savings = Math.max(0, total - plusPlan);

  return (
    <div className="glass rounded-2xl p-5 sm:p-8 border border-[#007BFF]/20 max-w-xl mx-auto mt-10 md:mt-16">
      <div className="flex items-center gap-2 mb-6">
        <DollarSign size={22} className="text-[#007BFF]" />
        <h3 className="text-white font-bold text-lg">Calculadora de Ahorro</h3>
      </div>
      <p className="text-gray-400 text-sm mb-6">
        ¿Cuántas veces lavas tu carro al mes?
      </p>
      <input
        type="range"
        min={1}
        max={12}
        value={visits}
        onChange={(e) => setVisits(Number(e.target.value))}
        className="w-full mb-4 accent-[#007BFF]"
      />
      <div className="flex justify-between text-sm text-gray-500 mb-6">
        <span>1 vez</span>
        <span className="text-[#007BFF] font-bold">{visits} veces/mes</span>
        <span>12 veces</span>
      </div>
      <div className="bg-[#050505] rounded-xl p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Sin membresía ({visits} × ${pricePerVisit})</span>
          <span className="text-white font-semibold">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Plan Plus</span>
          <span className="text-white font-semibold">${plusPlan}</span>
        </div>
        <div className="border-t border-[#007BFF]/20 pt-2 flex justify-between">
          <span className="text-[#007BFF] font-bold">Tu ahorro mensual</span>
          <span className="text-green-400 font-black text-lg">${savings.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default function MembershipsPage() {
  return (
    <div className="min-h-screen bg-[#050505] pt-20 pb-16 md:pt-24 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-[#007BFF] text-sm font-semibold uppercase tracking-widest mb-3">
            Membresías
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Planes para
            <br />
            <span className="text-[#007BFF]">Todos los Estilos</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Lavados ilimitados por un precio mensual fijo. Cancela cuando
            quieras.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-6 sm:p-8 border glass ${
                plan.popular
                  ? "border-[#007BFF] shadow-[0_0_50px_rgba(0,123,255,0.25)] mt-4 md:mt-0"
                  : "border-[#007BFF]/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 bg-[#007BFF] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  <Zap size={12} />
                  Más Popular
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-white font-black text-2xl mb-1">{plan.name}</h2>
                <span className="text-xs text-green-400 font-semibold bg-green-400/10 px-2 py-0.5 rounded-full">
                  {plan.savings}
                </span>
              </div>

              <div className="flex items-end gap-1 mb-8">
                <span className="text-5xl font-black text-white">${plan.price}</span>
                <span className="text-gray-500 mb-1">/mes</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-[#007BFF]/20 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-[#007BFF]" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/booking"
                className={`block text-center py-3.5 rounded-xl font-bold text-sm transition-all ${
                  plan.popular
                    ? "bg-[#007BFF] text-white hover:bg-[#0066dd] hover:shadow-[0_0_20px_rgba(0,123,255,0.5)]"
                    : "border border-[#007BFF]/40 text-[#007BFF] hover:border-[#007BFF] hover:bg-[#007BFF]/10"
                }`}
              >
                Empezar con {plan.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <SavingsCalculator />
      </div>
    </div>
  );
}
