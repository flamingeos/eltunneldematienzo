"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Star, Shield, Award } from "lucide-react";
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

        {/* Premium car silhouette */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.45 }}
          className="mt-14 relative mx-auto max-w-3xl"
        >
          <div className="relative">
            {/* Ground glow beneath car */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-[#007BFF]/30 blur-3xl rounded-full" />
            <svg viewBox="0 0 820 250" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0047BB" stopOpacity="0.8" />
                  <stop offset="35%" stopColor="#007BFF" stopOpacity="0.92" />
                  <stop offset="65%" stopColor="#00AFFF" stopOpacity="0.88" />
                  <stop offset="100%" stopColor="#004FCC" stopOpacity="0.75" />
                </linearGradient>
                <linearGradient id="glassGrad" x1="10%" y1="0%" x2="60%" y2="100%">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#007BFF" stopOpacity="0.1" />
                </linearGradient>
                <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1a2035" />
                  <stop offset="100%" stopColor="#050505" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3.5" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="2" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Ground reflections */}
              <ellipse cx="410" cy="240" rx="370" ry="13" fill="#007BFF" opacity="0.12" />
              <ellipse cx="410" cy="240" rx="240" ry="6" fill="#00AFFF" opacity="0.08" />

              {/* ── Main car body ── */}
              <path
                d="M65,232 L65,214 Q70,196 90,188 L138,184
                   Q158,176 174,162 Q186,148 206,133
                   Q224,122 256,118 L378,116
                   Q396,112 415,94 Q436,72 462,66
                   L498,65 Q528,65 556,77
                   Q574,90 590,112 Q600,130 607,150
                   L628,160 L688,162
                   Q710,163 730,167 L750,172
                   Q766,180 778,196 L782,215 L782,232 Z"
                fill="url(#bodyGrad)"
                filter="url(#glow)"
                opacity="0.9"
              />

              {/* ── Glasshouse / window area ── */}
              <path
                d="M405,158 Q420,124 440,97
                   Q458,70 492,66
                   L555,78 Q573,90 588,113
                   Q599,132 604,153
                   L478,161 L405,158 Z"
                fill="url(#glassGrad)"
              />
              {/* Window top edge highlight */}
              <path
                d="M407,157 Q422,122 441,96 Q459,69 492,65
                   L555,77 Q572,89 587,111 Q598,130 603,151"
                stroke="#00CFFF"
                strokeWidth="1.5"
                opacity="0.6"
                fill="none"
                filter="url(#softGlow)"
              />
              {/* B-pillar */}
              <line x1="471" y1="66" x2="476" y2="161" stroke="#007BFF" strokeWidth="3" opacity="0.55" />
              {/* Interior window glints */}
              <path d="M424,148 Q438,120 452,96" stroke="#00AFFF" strokeWidth="1" opacity="0.2" fill="none" />
              <path d="M510,66 Q514,100 515,158" stroke="#00AFFF" strokeWidth="1" opacity="0.15" fill="none" />

              {/* ── Hood & roof shine ── */}
              <path
                d="M140,182 Q200,152 278,128 L378,124"
                stroke="#00CFFF" strokeWidth="1.5" opacity="0.38" fill="none"
              />
              <path
                d="M445,68 L494,66 Q524,66 550,77"
                stroke="#00CFFF" strokeWidth="1.5" opacity="0.32" fill="none"
              />

              {/* ── Body crease / beltline ── */}
              <path
                d="M138,200 Q240,194 410,192 Q570,192 718,198"
                stroke="#00CFFF" strokeWidth="1" opacity="0.28" fill="none"
                filter="url(#softGlow)"
              />

              {/* ── Door gap line ── */}
              <line x1="476" y1="161" x2="474" y2="228" stroke="#007BFF" strokeWidth="1" opacity="0.2" />

              {/* ── Headlight — front LED strip ── */}
              <rect x="66" y="200" width="9" height="22" rx="2" fill="#00AFFF" opacity="0.65" filter="url(#glow)" />
              <rect x="67" y="202" width="7" height="3" rx="1" fill="white" opacity="1" />
              <rect x="67" y="207" width="7" height="2.5" rx="1" fill="#007BFF" opacity="0.85" />
              <rect x="67" y="212" width="7" height="3" rx="1" fill="#00AFFF" opacity="0.7" />
              {/* DRL accent */}
              <path d="M76,204 Q110,194 140,190" stroke="#00AFFF" strokeWidth="2" opacity="0.55" fill="none" filter="url(#softGlow)" />

              {/* ── Taillight — rear LED strip ── */}
              <rect x="746" y="196" width="9" height="24" rx="2" fill="#007BFF" opacity="0.85" filter="url(#glow)" />
              <rect x="747" y="198" width="7" height="3" rx="1" fill="#00AFFF" opacity="1" />
              <rect x="747" y="204" width="7" height="2.5" rx="1" fill="white" opacity="0.8" />
              <rect x="747" y="209" width="7" height="3.5" rx="1" fill="#007BFF" opacity="0.9" />

              {/* ── Exhaust hint ── */}
              <rect x="764" y="226" width="16" height="5" rx="2.5" fill="#007BFF" opacity="0.35" filter="url(#softGlow)" />

              {/* ── Wheel wells (dark cutout over body) ── */}
              <circle cx="190" cy="237" r="52" fill="#050505" />
              <circle cx="630" cy="237" r="52" fill="#050505" />

              {/* ── Front wheel ── */}
              <circle cx="190" cy="237" r="48" fill="#0b0b0b" stroke="#007BFF" strokeWidth="2.5" filter="url(#glow)" />
              <circle cx="190" cy="237" r="34" fill="url(#rimGrad)" stroke="#007BFF" strokeWidth="1.5" opacity="0.9" />
              {/* 6 spokes — front */}
              <line x1="224" y1="237" x2="199" y2="237" stroke="#007BFF" strokeWidth="3.5" opacity="0.88" filter="url(#softGlow)" />
              <line x1="207" y1="266" x2="195" y2="245" stroke="#007BFF" strokeWidth="3.5" opacity="0.88" filter="url(#softGlow)" />
              <line x1="173" y1="266" x2="186" y2="245" stroke="#007BFF" strokeWidth="3.5" opacity="0.88" filter="url(#softGlow)" />
              <line x1="156" y1="237" x2="181" y2="237" stroke="#007BFF" strokeWidth="3.5" opacity="0.88" filter="url(#softGlow)" />
              <line x1="173" y1="208" x2="186" y2="229" stroke="#007BFF" strokeWidth="3.5" opacity="0.88" filter="url(#softGlow)" />
              <line x1="207" y1="208" x2="195" y2="229" stroke="#007BFF" strokeWidth="3.5" opacity="0.88" filter="url(#softGlow)" />
              {/* Hub */}
              <circle cx="190" cy="237" r="9" fill="#007BFF" opacity="0.92" filter="url(#softGlow)" />
              <circle cx="190" cy="237" r="4.5" fill="#050505" />

              {/* ── Rear wheel ── */}
              <circle cx="630" cy="237" r="48" fill="#0b0b0b" stroke="#007BFF" strokeWidth="2.5" filter="url(#glow)" />
              <circle cx="630" cy="237" r="34" fill="url(#rimGrad)" stroke="#007BFF" strokeWidth="1.5" opacity="0.9" />
              {/* 6 spokes — rear */}
              <line x1="664" y1="237" x2="639" y2="237" stroke="#007BFF" strokeWidth="3.5" opacity="0.88" filter="url(#softGlow)" />
              <line x1="647" y1="266" x2="635" y2="245" stroke="#007BFF" strokeWidth="3.5" opacity="0.88" filter="url(#softGlow)" />
              <line x1="613" y1="266" x2="626" y2="245" stroke="#007BFF" strokeWidth="3.5" opacity="0.88" filter="url(#softGlow)" />
              <line x1="596" y1="237" x2="621" y2="237" stroke="#007BFF" strokeWidth="3.5" opacity="0.88" filter="url(#softGlow)" />
              <line x1="613" y1="208" x2="626" y2="229" stroke="#007BFF" strokeWidth="3.5" opacity="0.88" filter="url(#softGlow)" />
              <line x1="647" y1="208" x2="635" y2="229" stroke="#007BFF" strokeWidth="3.5" opacity="0.88" filter="url(#softGlow)" />
              {/* Hub */}
              <circle cx="630" cy="237" r="9" fill="#007BFF" opacity="0.92" filter="url(#softGlow)" />
              <circle cx="630" cy="237" r="4.5" fill="#050505" />

              {/* ── Wheel arch highlights ── */}
              <path d="M142,237 A48,48 0 0 1 238,237" stroke="#00AFFF" strokeWidth="2" opacity="0.45" fill="none" filter="url(#softGlow)" />
              <path d="M582,237 A48,48 0 0 1 678,237" stroke="#00AFFF" strokeWidth="2" opacity="0.45" fill="none" filter="url(#softGlow)" />

              {/* ── Wheel puddle reflections ── */}
              <ellipse cx="190" cy="245" rx="50" ry="7" fill="#007BFF" opacity="0.1" />
              <ellipse cx="630" cy="245" rx="50" ry="7" fill="#007BFF" opacity="0.1" />
            </svg>
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
