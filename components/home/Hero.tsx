"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Star, Shield, Award, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number; y: number; r: number;
      vx: number; vy: number; alpha: number;
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: Math.random() * 0.5 + 0.2,
        alpha: Math.random() * 0.6 + 0.1,
      });
    }

    let animId: number;
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 175, 255, ${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.y > canvas.height) {
          p.y = -5;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      });
      animId = requestAnimationFrame(draw);
    }
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#007BFF]/10 via-transparent to-[#050505]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#007BFF]/5 blur-3xl" />

      <Particles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#007BFF]/40 bg-[#007BFF]/10 text-[#00AFFF] text-sm font-medium mb-8"
        >
          <Star size={14} fill="currentColor" />
          Puerto Rico&apos;s #1 Auto Detailing
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]"
        >
          Puerto Rico&apos;s Premium
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #007BFF, #00AFFF)",
            }}
          >
            Auto Detailing
          </span>{" "}
          Experience
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10"
        >
          Professional car wash, detailing, ceramic coatings, memberships,
          and paint protection — all in one luxury experience.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link
            href="/booking"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#007BFF] text-white font-bold rounded-xl text-lg hover:bg-[#0066dd] transition-all hover:shadow-[0_0_30px_rgba(0,123,255,0.6)] animate-pulse-glow"
          >
            Reservar Ahora
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-8 py-4 border border-[#007BFF]/40 text-white font-semibold rounded-xl text-lg hover:border-[#007BFF] hover:bg-[#007BFF]/10 transition-all"
          >
            Ver Paquetes
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 text-sm text-gray-500"
        >
          {[
            { icon: <Shield size={16} />, label: "Garantía de Calidad" },
            { icon: <Star size={16} />, label: "5 Estrellas Google" },
            { icon: <Award size={16} />, label: "+500 Vehículos Detallados" },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-gray-400">
              <span className="text-[#007BFF]">{badge.icon}</span>
              {badge.label}
            </div>
          ))}
        </motion.div>

        {/* Animated orbital element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.45, ease: "easeOut" }}
          className="mt-16 flex justify-center"
        >
          <div className="relative flex items-center justify-center" style={{ width: 300, height: 300 }}>
            {/* Ambient glow */}
            <div className="absolute inset-0 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(0,123,255,0.15) 0%, transparent 70%)" }} />

            {/* Ripple rings */}
            {([0, 1, 2] as const).map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-[#007BFF]/50"
                style={{ width: 260, height: 260 }}
                animate={{ scale: [0.15, 1.05], opacity: [0.7, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.93, ease: "easeOut" }}
              />
            ))}

            {/* Outer slow-rotating dashed ring */}
            <motion.div
              className="absolute rounded-full"
              style={{ width: 264, height: 264, border: "1px dashed rgba(0,123,255,0.22)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            />

            {/* Middle rotating ring */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 196, height: 196,
                border: "2px solid rgba(0,123,255,0.38)",
                boxShadow: "0 0 20px rgba(0,123,255,0.12), inset 0 0 20px rgba(0,123,255,0.06)",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 19, repeat: Infinity, ease: "linear" }}
            />

            {/* 6 orbital dots on middle ring */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                initial={{ rotate: angle }}
                animate={{ rotate: angle - 360 }}
                transition={{ duration: 19, repeat: Infinity, ease: "linear" }}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    width: i % 2 === 0 ? 8 : 5,
                    height: i % 2 === 0 ? 8 : 5,
                    top: "50%",
                    left: "calc(50% + 98px)",
                    transform: "translate(-50%, -50%)",
                    background: i % 2 === 0 ? "#007BFF" : "#00AFFF",
                    boxShadow: `0 0 ${i % 2 === 0 ? 12 : 8}px ${i % 2 === 0 ? "rgba(0,123,255,0.9)" : "rgba(0,175,255,0.9)"}`,
                  }}
                />
              </motion.div>
            ))}

            {/* Inner fast ring */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 136, height: 136,
                border: "1.5px dashed rgba(0,175,255,0.4)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
            />

            {/* 4 orbital dots on inner ring */}
            {[0, 90, 180, 270].map((angle, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                initial={{ rotate: angle }}
                animate={{ rotate: angle + 360 }}
                transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 5,
                    height: 5,
                    top: "50%",
                    left: "calc(50% + 68px)",
                    transform: "translate(-50%, -50%)",
                    background: "#00AFFF",
                    boxShadow: "0 0 8px rgba(0,175,255,0.95)",
                  }}
                />
              </motion.div>
            ))}

            {/* Central pulsing orb */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 100, height: 100,
                background: "radial-gradient(circle, rgba(0,123,255,0.28) 0%, rgba(0,123,255,0.06) 60%, transparent 100%)",
              }}
              animate={{ scale: [1, 1.18, 1], opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Center icon badge */}
            <motion.div
              animate={{ scale: [1, 1.07, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 flex items-center justify-center rounded-2xl"
              style={{
                width: 68, height: 68,
                background: "rgba(0,123,255,0.15)",
                border: "1px solid rgba(0,123,255,0.45)",
                boxShadow: "0 0 35px rgba(0,123,255,0.4), inset 0 0 20px rgba(0,123,255,0.1)",
              }}
            >
              <Sparkles size={32} className="text-[#00AFFF]" />
            </motion.div>

            {/* Floating sparkle particles */}
            {[
              { x: -118, y: -62, delay: 0, s: 3 },
              { x: 92, y: -96, delay: 0.7, s: 4 },
              { x: 128, y: 32, delay: 1.4, s: 3 },
              { x: -102, y: 72, delay: 2.1, s: 4 },
              { x: 14, y: 122, delay: 0.35, s: 3 },
              { x: -38, y: -126, delay: 1.05, s: 3 },
              { x: 76, y: 108, delay: 1.75, s: 4 },
              { x: -126, y: -8, delay: 2.45, s: 3 },
            ].map((sp, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 rounded-full bg-[#00AFFF]"
                style={{ width: sp.s, height: sp.s, marginLeft: sp.x, marginTop: sp.y }}
                animate={{ opacity: [0, 1, 0], scale: [0.3, 1, 0.3] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: sp.delay, ease: "easeInOut" }}
              />
            ))}
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600"
      >
        <div className="w-5 h-8 rounded-full border border-gray-700 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-[#007BFF] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
