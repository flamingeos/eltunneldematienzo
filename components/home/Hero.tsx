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

      {/* Dark scrim */}
      <div className="absolute inset-0 bg-[#050505]/50" style={{ zIndex: 1 }} />

      {/* Ambient blue glow behind content card */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(0,123,255,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── CONTENT ── */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center pt-16 pb-12 min-h-screen"
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl mx-auto text-center"
          style={{
            background: "rgba(4, 6, 16, 0.52)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(0, 123, 255, 0.18)",
            borderRadius: "24px",
            boxShadow: `
              0 0 0 1px rgba(0,123,255,0.06),
              0 0 60px rgba(0,123,255,0.14),
              0 0 120px rgba(0,80,200,0.08),
              0 32px 80px rgba(0,0,0,0.55),
              inset 0 1px 0 rgba(255,255,255,0.06)
            `,
            padding: "clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 5vw, 3rem)",
          }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#007BFF]/30 bg-[#007BFF]/10 text-[#00AFFF] text-xs font-semibold uppercase tracking-[0.18em] mb-7"
          >
            <span>🏆</span>
            El Centro de Detailing #1 de Puerto Rico
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex justify-center mb-6"
          >
            <div
              className="relative"
              style={{
                filter: "drop-shadow(0 0 18px rgba(0,123,255,0.45)) drop-shadow(0 0 6px rgba(0,180,255,0.25))",
              }}
            >
              <Image
                src="/logo/el tunnel logo.png"
                alt="El Túnel de Matienzo"
                width={72}
                height={72}
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Primary headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-black text-white uppercase mb-2 leading-none"
            style={{
              fontSize: "clamp(1.9rem, 5.5vw, 3.8rem)",
              letterSpacing: "0.12em",
              textShadow: "0 2px 32px rgba(0,0,0,0.8)",
            }}
          >
            EL TÚNEL DE{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #4DA6FF, #007BFF, #00AFFF)" }}
            >
              MATIENZO
            </span>
          </motion.h1>

          {/* Divider line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mx-auto my-5"
            style={{
              width: "60px",
              height: "1.5px",
              background: "linear-gradient(to right, transparent, #007BFF, #00AFFF, transparent)",
            }}
          />

          {/* Secondary headline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-gray-200 font-semibold mb-5 leading-snug"
            style={{
              fontSize: "clamp(1rem, 2.2vw, 1.35rem)",
              letterSpacing: "0.02em",
              textShadow: "0 1px 16px rgba(0,0,0,0.9)",
            }}
          >
            La Experiencia Premium en
            <br />
            <span
              className="text-transparent bg-clip-text font-bold"
              style={{ backgroundImage: "linear-gradient(135deg, #007BFF, #00AFFF)" }}
            >
              Auto Detailing de Puerto Rico
            </span>
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.58 }}
            className="text-gray-400 leading-relaxed mb-8 mx-auto"
            style={{
              fontSize: "clamp(0.85rem, 1.5vw, 0.975rem)",
              maxWidth: "480px",
              textShadow: "0 1px 12px rgba(0,0,0,0.9)",
            }}
          >
            Lavado profesional, detailing, recubrimientos cerámicos, protección de
            pintura y membresías exclusivas — todo en una experiencia diseñada para
            mantener tu vehículo en condiciones impecables.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.66 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              href="/booking"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#007BFF] text-white font-bold rounded-xl text-base hover:bg-[#0066dd] transition-all hover:shadow-[0_0_30px_rgba(0,123,255,0.6)]"
            >
              Reservar Ahora
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-[#007BFF]/35 text-white font-semibold rounded-xl text-base hover:border-[#007BFF] hover:bg-[#007BFF]/10 transition-all"
              style={{ backdropFilter: "blur(8px)" }}
            >
              Ver Paquetes
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
