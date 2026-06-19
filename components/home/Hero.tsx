"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

const SRC =
  "/loop image logo car/hf_20260619_063252_c18f2f97-9d28-4120-9531-19099e7b8381.mp4";

const FADE_LEAD = 1.8;
const FADE_DUR  = 1.8;

// Shared text-shadow that carves text above any video frame
const CARVED =
  "0 2px 4px rgba(0,0,0,1), 0 4px 16px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.95), 0 0 80px rgba(0,0,0,0.7)";

export default function Hero() {
  const refA = useRef<HTMLVideoElement>(null);
  const refB = useRef<HTMLVideoElement>(null);
  const activeRef = useRef<"a" | "b">("a");
  const fadingRef = useRef(false);

  useEffect(() => {
    const a = refA.current;
    const b = refB.current;
    if (!a || !b) return;

    a.style.opacity = "1";
    b.style.opacity = "0";
    a.play().catch(() => {});

    const tick = () => {
      const active  = activeRef.current === "a" ? a : b;
      const standby = activeRef.current === "a" ? b : a;
      if (!active.duration || fadingRef.current) return;
      if (active.duration - active.currentTime > FADE_LEAD) return;

      fadingRef.current = true;
      standby.currentTime = 0;
      standby.play().catch(() => {});

      active.style.transition  = `opacity ${FADE_DUR}s ease-in-out`;
      standby.style.transition = `opacity ${FADE_DUR}s ease-in-out`;
      void active.offsetHeight;
      active.style.opacity  = "0";
      standby.style.opacity = "1";

      setTimeout(() => {
        active.pause();
        active.currentTime = 0;
        active.style.transition  = "none";
        standby.style.transition = "none";
        activeRef.current = activeRef.current === "a" ? "b" : "a";
        fadingRef.current = false;
      }, (FADE_DUR + 0.15) * 1000);
    };

    const id = setInterval(tick, 150);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">

      {/* ── VIDEO BACKGROUND ── */}
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: `
            linear-gradient(to right,  transparent 0%, black 12%, black 88%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 10%, black 80%, transparent 100%)
          `,
          WebkitMaskComposite: "source-in",
          maskImage: `
            linear-gradient(to right,  transparent 0%, black 12%, black 88%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 10%, black 80%, transparent 100%)
          `,
          maskComposite: "intersect",
          zIndex: 0,
        }}
      >
        <video
          ref={refA}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: "translateZ(0)", willChange: "opacity" }}
        >
          <source src={SRC} type="video/mp4" />
        </video>
        <video
          ref={refB}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: "translateZ(0)", willChange: "opacity" }}
        >
          <source src={SRC} type="video/mp4" />
        </video>
      </div>

      {/* Dark scrim — enough to guarantee contrast without killing the video */}
      <div className="absolute inset-0 bg-[#050505]/45" style={{ zIndex: 1 }} />

      {/* ── CONTENT — pure text, zero containers ── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 text-center pt-16 pb-12 flex flex-col items-center gap-0">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#007BFF]/30 bg-[#007BFF]/10 text-[#00AFFF] text-xs font-semibold uppercase tracking-[0.18em] mb-8"
        >
          🏆&nbsp; El Centro de Detailing #1 de Puerto Rico
        </motion.div>

        {/* Logo — large, prominent brand mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-7"
          style={{
            filter:
              "drop-shadow(0 0 28px rgba(0,123,255,0.7)) drop-shadow(0 0 8px rgba(0,180,255,0.4)) drop-shadow(0 4px 16px rgba(0,0,0,0.9))",
          }}
        >
          <Image
            src="/logo/el tunnel logo.png"
            alt="El Túnel de Matienzo"
            width={320}
            height={320}
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Primary headline — all white, text-stroke for carving */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-black text-white uppercase leading-none mb-4"
          style={{
            fontSize: "clamp(2.4rem, 7vw, 5.5rem)",
            letterSpacing: "0.1em",
            WebkitTextStroke: "2px rgba(0,123,255,0.85)",
            textShadow:
              "0 4px 20px rgba(0,0,0,1), 0 0 40px rgba(0,120,255,0.45), 0 2px 4px rgba(0,0,0,1), 0 0 80px rgba(0,0,0,0.9)",
          }}
        >
          EL TUNNEL DE
          <br />
          <style>{`
            @keyframes matienzo-glow {
              0%, 100% {
                text-shadow:
                  0 4px 20px rgba(0,0,0,1),
                  0 2px 4px rgba(0,0,0,1),
                  0 0 20px rgba(0,123,255,0.4),
                  0 0 40px rgba(0,123,255,0.2);
              }
              50% {
                text-shadow:
                  0 4px 20px rgba(0,0,0,1),
                  0 2px 4px rgba(0,0,0,1),
                  0 0 40px rgba(0,150,255,0.9),
                  0 0 80px rgba(0,123,255,0.6),
                  0 0 120px rgba(0,100,255,0.3);
              }
            }
          `}</style>
          <span
            style={{
              color: "#ffffff",
              WebkitTextStroke: "2px rgba(0,123,255,0.85)",
              animation: "matienzo-glow 3s ease-in-out infinite",
            }}
          >
            MATIENZO
          </span>
        </motion.h1>

        {/* Accent rule */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          style={{
            width: "72px",
            height: "2px",
            background: "linear-gradient(to right, transparent, #007BFF, transparent)",
            marginBottom: "1.25rem",
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="text-white font-medium leading-snug mb-4"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            letterSpacing: "0.03em",
            textShadow: CARVED,
          }}
        >
          La Experiencia Premium en{" "}
          <span style={{ color: "#007BFF", fontWeight: 700 }}>Auto Detailing</span>{" "}
          de Puerto Rico
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.46 }}
          className="text-gray-300 leading-relaxed mb-10 max-w-xl"
          style={{
            fontSize: "clamp(0.82rem, 1.4vw, 0.95rem)",
            textShadow: CARVED,
          }}
        >
          Lavado profesional, detailing, recubrimientos cerámicos, protección de
          pintura y membresías exclusivas — todo en una experiencia diseñada para
          mantener tu vehículo en condiciones impecables.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.54 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="/booking"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#007BFF] text-white font-bold rounded-xl text-base hover:bg-[#0066dd] transition-all hover:shadow-[0_0_30px_rgba(0,123,255,0.6)]"
          >
            Reservar Ahora
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-white/25 text-white font-semibold rounded-xl text-base hover:border-[#007BFF] hover:bg-white/5 transition-all"
          >
            Ver Paquetes
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
