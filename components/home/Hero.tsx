"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]">

      {/* ── VIDEO LAYER ── */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: "translateZ(0)",
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        >
          <source
            src="/loop image logo car/hf_20260619_055524_4c74f92d-3446-4548-b977-db2b3812a303.mp4"
            type="video/mp4"
          />
        </video>

        {/* Cinematic dark vignette — heavier at top/bottom, lighter in center */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to bottom,
                #050505 0%,
                rgba(5,5,5,0.55) 18%,
                rgba(5,5,5,0.15) 38%,
                rgba(5,5,5,0.15) 62%,
                rgba(5,5,5,0.65) 82%,
                #050505 100%
              )
            `,
          }}
        />

        {/* Side fades */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to right,
                rgba(5,5,5,0.7) 0%,
                transparent 18%,
                transparent 82%,
                rgba(5,5,5,0.7) 100%
              )
            `,
          }}
        />
      </div>

      {/* ── BLUE AMBIENT GLOW ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 55%, rgba(0,123,255,0.13) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />

      {/* ── CONTENT ── */}
      <div
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-32"
        style={{ zIndex: 2 }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#007BFF]/40 bg-[#050505]/60 backdrop-blur-sm text-[#00AFFF] text-sm font-medium mb-8"
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
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/booking"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#007BFF] text-white font-bold rounded-xl text-lg hover:bg-[#0066dd] transition-all hover:shadow-[0_0_40px_rgba(0,123,255,0.7)] animate-pulse-glow"
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
