"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
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

      {/* ── VIDEO BACKGROUND with seamless mask-composite edge blend ── */}
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

      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-[#050505]/55" style={{ zIndex: 1 }} />

      {/* ── CONTENT ── */}
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
          style={{ textShadow: "0 2px 40px rgba(0,0,0,0.8)" }}
        >
          Puerto Rico&apos;s Premium
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg, #007BFF, #00AFFF)" }}
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
          className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10"
          style={{ textShadow: "0 1px 20px rgba(0,0,0,0.9)" }}
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
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#007BFF] text-white font-bold rounded-xl text-lg hover:bg-[#0066dd] transition-all hover:shadow-[0_0_30px_rgba(0,123,255,0.6)]"
          >
            Reservar Ahora
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-8 py-4 border border-[#007BFF]/40 bg-[#050505]/40 backdrop-blur-sm text-white font-semibold rounded-xl text-lg hover:border-[#007BFF] hover:bg-[#007BFF]/10 transition-all"
          >
            Ver Paquetes
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
