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

        {/* Showroom car display */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: "easeOut" }}
          className="mt-14 mx-auto max-w-3xl px-4"
        >
          <svg viewBox="0 0 700 230" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Body gradient — top highlight to deep blue */}
              <linearGradient id="bdGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#00AFFF" stopOpacity="0.95" />
                <stop offset="45%"  stopColor="#007BFF" stopOpacity="0.9"  />
                <stop offset="100%" stopColor="#003FAA" stopOpacity="0.85" />
              </linearGradient>
              {/* Glass gradient */}
              <linearGradient id="glGrad" x1="15%" y1="0%" x2="55%" y2="100%">
                <stop offset="0%"   stopColor="#00D4FF" stopOpacity="0.5"  />
                <stop offset="60%"  stopColor="#007BFF" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#004CC7" stopOpacity="0.08" />
              </linearGradient>
              {/* Rim dark fill */}
              <radialGradient id="rmGrad" cx="50%" cy="38%" r="55%">
                <stop offset="0%"   stopColor="#1a2540" />
                <stop offset="100%" stopColor="#050505" />
              </radialGradient>
              {/* Shine sweep gradient */}
              <linearGradient id="shGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="white" stopOpacity="0"    />
                <stop offset="40%"  stopColor="white" stopOpacity="0"    />
                <stop offset="48%"  stopColor="white" stopOpacity="0.12" />
                <stop offset="50%"  stopColor="white" stopOpacity="0.32" />
                <stop offset="52%"  stopColor="white" stopOpacity="0.12" />
                <stop offset="60%"  stopColor="white" stopOpacity="0"    />
                <stop offset="100%" stopColor="white" stopOpacity="0"    />
              </linearGradient>
              {/* Spotlight from top-center */}
              <radialGradient id="spotGrad" cx="50%" cy="-10%" r="75%">
                <stop offset="0%"   stopColor="#007BFF" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#007BFF" stopOpacity="0"    />
              </radialGradient>
              {/* Ground fade */}
              <linearGradient id="gndGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#005ACC" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#007BFF"  stopOpacity="0"   />
              </linearGradient>
              {/* Clip path = car body silhouette */}
              <clipPath id="carClip">
                <path d="M 38,215 L 38,200 Q 43,180 62,170 L 98,166 Q 118,162 132,150 Q 146,140 165,134 L 298,128 Q 320,124 338,108 Q 358,86 378,72 L 414,66 Q 444,64 466,73 Q 480,82 494,99 Q 504,114 509,132 L 526,140 L 575,142 Q 598,144 618,152 L 635,158 Q 648,168 654,186 L 656,204 L 656,215 Z" />
              </clipPath>
              {/* Glow filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="1.8" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Showroom spotlight */}
            <rect x="0" y="0" width="700" height="230" fill="url(#spotGrad)" />

            {/* Ground glow line */}
            <rect x="30" y="215" width="640" height="15" fill="url(#gndGrad)" />
            <line x1="30" y1="215" x2="670" y2="215" stroke="#007BFF" strokeWidth="0.5" strokeOpacity="0.35" />

            {/* ── CAR BODY ── */}
            <path
              d="M 38,215 L 38,200 Q 43,180 62,170 L 98,166 Q 118,162 132,150 Q 146,140 165,134 L 298,128 Q 320,124 338,108 Q 358,86 378,72 L 414,66 Q 444,64 466,73 Q 480,82 494,99 Q 504,114 509,132 L 526,140 L 575,142 Q 598,144 618,152 L 635,158 Q 648,168 654,186 L 656,204 L 656,215 Z"
              fill="url(#bdGrad)"
              filter="url(#glow)"
            />

            {/* ── WINDOW GLASS ── */}
            <path
              d="M 334,158 Q 350,130 368,104 Q 382,84 414,67 L 466,74 Q 479,83 492,99 Q 502,112 507,130 L 524,140 L 462,154 L 334,158 Z"
              fill="url(#glGrad)"
            />
            {/* Window top-edge highlight */}
            <path
              d="M 336,157 Q 352,128 370,103 Q 384,83 414,66 L 466,73 Q 478,82 491,98 Q 501,111 506,129"
              stroke="#00CFFF" strokeWidth="1.2" strokeOpacity="0.55" fill="none"
              filter="url(#softGlow)"
            />
            {/* B-pillar */}
            <line x1="422" y1="66" x2="427" y2="155" stroke="#005ACC" strokeWidth="3" strokeOpacity="0.6" />
            {/* Interior glints */}
            <path d="M 354,146 Q 368,118 382,98" stroke="#00AFFF" strokeWidth="0.9" strokeOpacity="0.2" fill="none" />
            <path d="M 436,67 Q 440,98 440,154" stroke="#00AFFF" strokeWidth="0.9" strokeOpacity="0.15" fill="none" />

            {/* ── BODY DETAILS ── */}
            {/* Hood character line */}
            <path d="M 100,182 Q 180,174 260,140 L 298,134" stroke="#00CFFF" strokeWidth="1" strokeOpacity="0.32" fill="none" />
            {/* Beltline crease */}
            <path d="M 98,188 Q 240,182 410,180 Q 560,180 640,186" stroke="#00CFFF" strokeWidth="0.9" strokeOpacity="0.25" fill="none" filter="url(#softGlow)" />
            {/* Door gap */}
            <line x1="427" y1="155" x2="425" y2="212" stroke="#004BB3" strokeWidth="1.2" strokeOpacity="0.3" />

            {/* ── HEADLIGHT (front LED strip) ── */}
            <rect x="38" y="188" width="10" height="20" rx="2" fill="#00AFFF" fillOpacity="0.75" filter="url(#glow)" />
            <rect x="39" y="190" width="8" height="3"  rx="1" fill="white" fillOpacity="1" />
            <rect x="39" y="195" width="8" height="2.5" rx="1" fill="#007BFF" fillOpacity="0.9" />
            <rect x="39" y="200" width="8" height="3"  rx="1" fill="#00AFFF" fillOpacity="0.7" />
            {/* DRL streak */}
            <path d="M 49,192 Q 82,183 108,180" stroke="#00AFFF" strokeWidth="1.8" strokeOpacity="0.5" fill="none" filter="url(#softGlow)" />

            {/* ── TAILLIGHT (rear LED) ── */}
            <rect x="638" y="182" width="10" height="26" rx="2" fill="#007BFF" fillOpacity="0.9" filter="url(#glow)" />
            <rect x="639" y="184" width="8" height="3"   rx="1" fill="#00AFFF" fillOpacity="1" />
            <rect x="639" y="190" width="8" height="2.5" rx="1" fill="white"   fillOpacity="0.85" />
            <rect x="639" y="195" width="8" height="3.5" rx="1" fill="#007BFF" fillOpacity="0.9" />
            {/* Exhaust */}
            <rect x="646" y="210" width="14" height="4" rx="2" fill="#007BFF" fillOpacity="0.4" filter="url(#softGlow)" />

            {/* ── WHEEL WELLS (dark punch-through) ── */}
            <circle cx="145" cy="215" r="44" fill="#050505" />
            <circle cx="485" cy="215" r="44" fill="#050505" />

            {/* ── FRONT WHEEL ── */}
            <circle cx="145" cy="215" r="40" fill="#0a0a0a" stroke="#007BFF" strokeWidth="2.2" filter="url(#glow)" />
            <circle cx="145" cy="215" r="28" fill="url(#rmGrad)" stroke="#007BFF" strokeWidth="1.4" strokeOpacity="0.9" />
            {/* 6 spokes */}
            <line x1="173" y1="215" x2="153" y2="215" stroke="#007BFF" strokeWidth="3" strokeOpacity="0.9" filter="url(#softGlow)" />
            <line x1="159" y1="239" x2="149" y2="223" stroke="#007BFF" strokeWidth="3" strokeOpacity="0.9" filter="url(#softGlow)" />
            <line x1="131" y1="239" x2="141" y2="223" stroke="#007BFF" strokeWidth="3" strokeOpacity="0.9" filter="url(#softGlow)" />
            <line x1="117" y1="215" x2="137" y2="215" stroke="#007BFF" strokeWidth="3" strokeOpacity="0.9" filter="url(#softGlow)" />
            <line x1="131" y1="191" x2="141" y2="207" stroke="#007BFF" strokeWidth="3" strokeOpacity="0.9" filter="url(#softGlow)" />
            <line x1="159" y1="191" x2="149" y2="207" stroke="#007BFF" strokeWidth="3" strokeOpacity="0.9" filter="url(#softGlow)" />
            <circle cx="145" cy="215" r="8" fill="#007BFF" fillOpacity="0.95" filter="url(#softGlow)" />
            <circle cx="145" cy="215" r="4" fill="#050505" />
            {/* Arch highlight */}
            <path d="M 105,215 A 40,40 0 0 1 185,215" stroke="#00AFFF" strokeWidth="1.8" strokeOpacity="0.45" fill="none" filter="url(#softGlow)" />

            {/* ── REAR WHEEL ── */}
            <circle cx="485" cy="215" r="40" fill="#0a0a0a" stroke="#007BFF" strokeWidth="2.2" filter="url(#glow)" />
            <circle cx="485" cy="215" r="28" fill="url(#rmGrad)" stroke="#007BFF" strokeWidth="1.4" strokeOpacity="0.9" />
            {/* 6 spokes */}
            <line x1="513" y1="215" x2="493" y2="215" stroke="#007BFF" strokeWidth="3" strokeOpacity="0.9" filter="url(#softGlow)" />
            <line x1="499" y1="239" x2="489" y2="223" stroke="#007BFF" strokeWidth="3" strokeOpacity="0.9" filter="url(#softGlow)" />
            <line x1="471" y1="239" x2="481" y2="223" stroke="#007BFF" strokeWidth="3" strokeOpacity="0.9" filter="url(#softGlow)" />
            <line x1="457" y1="215" x2="477" y2="215" stroke="#007BFF" strokeWidth="3" strokeOpacity="0.9" filter="url(#softGlow)" />
            <line x1="471" y1="191" x2="481" y2="207" stroke="#007BFF" strokeWidth="3" strokeOpacity="0.9" filter="url(#softGlow)" />
            <line x1="499" y1="191" x2="489" y2="207" stroke="#007BFF" strokeWidth="3" strokeOpacity="0.9" filter="url(#softGlow)" />
            <circle cx="485" cy="215" r="8" fill="#007BFF" fillOpacity="0.95" filter="url(#softGlow)" />
            <circle cx="485" cy="215" r="4" fill="#050505" />
            {/* Arch highlight */}
            <path d="M 445,215 A 40,40 0 0 1 525,215" stroke="#00AFFF" strokeWidth="1.8" strokeOpacity="0.45" fill="none" filter="url(#softGlow)" />

            {/* ── FLOOR REFLECTION (faint mirror below car) ── */}
            <g transform="scale(1,-1) translate(0,-430)" opacity="0.09">
              <path d="M 38,215 L 38,200 Q 43,180 62,170 L 98,166 Q 118,162 132,150 Q 146,140 165,134 L 298,128 Q 320,124 338,108 Q 358,86 378,72 L 414,66 Q 444,64 466,73 Q 480,82 494,99 Q 504,114 509,132 L 526,140 L 575,142 Q 598,144 618,152 L 635,158 Q 648,168 654,186 L 656,204 L 656,215 Z" fill="url(#bdGrad)" />
            </g>

            {/* ── ANIMATED SHINE SWEEP ── */}
            <motion.rect
              x={-130} y={0} width={130} height={230}
              fill="url(#shGrad)"
              clipPath="url(#carClip)"
              animate={{ x: [-130, 830] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3.8, ease: "easeInOut" }}
            />

            {/* Wheel puddle glow */}
            <ellipse cx="145" cy="218" rx="42" ry="6" fill="#007BFF" fillOpacity="0.1" />
            <ellipse cx="485" cy="218" rx="42" ry="6" fill="#007BFF" fillOpacity="0.1" />
          </svg>
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
