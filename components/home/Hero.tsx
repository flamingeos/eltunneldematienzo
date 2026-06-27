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

const CARVED =
  "0 2px 4px rgba(0,0,0,1), 0 4px 16px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.95), 0 0 80px rgba(0,0,0,0.7)";

// Mask applied to the video container on both mobile and desktop.
// On mobile (16:9 box) it creates a soft vignette + fades the bottom into dark.
// On desktop (absolute inset) it creates the full 4-edge vignette.
const VIDEO_MASK = {
  WebkitMaskImage: `
    linear-gradient(to right,  transparent 0%, black 8%, black 92%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, black 6%, black 78%, transparent 100%)
  `,
  WebkitMaskComposite: "source-in",
  maskImage: `
    linear-gradient(to right,  transparent 0%, black 8%, black 92%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, black 6%, black 78%, transparent 100%)
  `,
  maskComposite: "intersect",
} as React.CSSProperties;

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
    /*
     * Layout strategy:
     *   MOBILE  – flex-col: video at top (natural 16:9, no zoom), content stacked below.
     *   DESKTOP – video switches to absolute inset-0 (out of flex flow), content fills
     *             the remaining full-height space and centers itself → same look as before.
     */
    <section className="relative bg-[#050505] flex flex-col min-h-screen">

      {/* ── VIDEO CONTAINER ──────────────────────────────────────────────────────
          Mobile  : relative, w-full, aspect-video, pushed below fixed navbar (mt-16).
          Desktop : absolute inset-0 — removes itself from flex flow, full-screen bg.
      ────────────────────────────────────────────────────────────────────────── */}
      <div
        className={[
          // Mobile base
          "relative w-full shrink-0",
          "mt-16",           // clear fixed navbar (64 px)
          "aspect-video",    // ← KEY: natural 16:9 ratio — no zoom on mobile
          // Desktop overrides
          "md:absolute md:inset-0",
          "md:aspect-auto",  // let absolute inset-0 control dimensions
          "md:mt-0",
        ].join(" ")}
        style={{ zIndex: 0, ...VIDEO_MASK }}
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

      {/* ── MOBILE ONLY: gradient bridge video → dark bg ─────────────────────── */}
      <div
        className="md:hidden shrink-0 pointer-events-none"
        style={{
          marginTop: "-3rem",   // overlap the last 48 px of video
          height: "4rem",       // 64 px tall gradient
          background: "linear-gradient(to bottom, transparent 0%, #050505 100%)",
          zIndex: 2,
          position: "relative",
        }}
      />

      {/* ── DESKTOP ONLY: dark scrim over video ──────────────────────────────── */}
      <div
        className="hidden md:block absolute inset-0 bg-[#050505]/45"
        style={{ zIndex: 1 }}
      />

      {/* ── CONTENT ──────────────────────────────────────────────────────────────
          flex-1 so it fills remaining space in the flex-col section.
          On mobile: natural top-down stacking with modest padding.
          On desktop: justify-center to vertically center in full viewport.
      ────────────────────────────────────────────────────────────────────────── */}
      <div
        className="relative flex-1 flex flex-col items-center justify-center text-center px-5 sm:px-10 pb-10 md:py-20"
        style={{ zIndex: 10 }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 rounded-full border border-[#007BFF]/30 bg-[#007BFF]/10 text-[#00AFFF] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.18em] mb-4 sm:mb-6 md:mb-8"
        >
          🏆&nbsp; El Centro de Detailing #1 de Puerto Rico
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-4 sm:mb-6 md:mb-7"
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
            className="object-contain w-20 h-20 sm:w-44 sm:h-44 md:w-72 md:h-72 lg:w-80 lg:h-80"
            priority
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-black text-white uppercase leading-none mb-3 sm:mb-4"
          style={{
            fontSize: "clamp(2rem, 7vw, 5.5rem)",
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
                  0 0 8px  rgba(0,123,255,0.9),
                  0 0 20px rgba(0,123,255,0.7),
                  0 0 45px rgba(0,123,255,0.45),
                  0 0 80px rgba(0,100,255,0.25),
                  0 4px 24px rgba(0,0,0,1);
                filter: brightness(1.05);
              }
              50% {
                text-shadow:
                  0 0 10px rgba(0,175,255,1),
                  0 0 25px rgba(0,123,255,0.95),
                  0 0 55px rgba(0,123,255,0.75),
                  0 0 100px rgba(0,100,255,0.5),
                  0 0 150px rgba(0,80,255,0.25),
                  0 4px 24px rgba(0,0,0,1);
                filter: brightness(1.18);
              }
            }
          `}</style>
          <span
            style={{
              color: "#00AFFF",
              WebkitTextStroke: "1px rgba(0,123,255,0.7)",
              animation: "matienzo-glow 3s ease-in-out infinite",
              display: "inline-block",
              letterSpacing: "0.12em",
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
            marginBottom: "1rem",
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="text-white font-medium leading-snug mb-3 sm:mb-4"
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1.25rem)",
            letterSpacing: "0.03em",
            textShadow: CARVED,
          }}
        >
          La Experiencia Premium en{" "}
          <span style={{ color: "#007BFF", fontWeight: 700 }}>Auto Detailing</span>{" "}
          de Puerto Rico
        </motion.p>

        {/* Description — hidden on smallest screens to keep content tight */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.46 }}
          className="hidden sm:block text-gray-300 leading-relaxed mb-8 sm:mb-10 max-w-xl"
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
          className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto mt-2 sm:mt-0"
        >
          <Link
            href="/booking"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 sm:py-3.5 bg-[#007BFF] text-white font-bold rounded-xl text-base hover:bg-[#0066dd] transition-all hover:shadow-[0_0_30px_rgba(0,123,255,0.6)]"
          >
            Reservar Ahora
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-8 py-4 sm:py-3.5 border border-white/25 text-white font-semibold rounded-xl text-base hover:border-[#007BFF] hover:bg-white/5 transition-all"
          >
            Ver Paquetes
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
