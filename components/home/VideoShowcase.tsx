"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const SRC =
  "/loop image logo car/hf_20260619_063252_c18f2f97-9d28-4120-9531-19099e7b8381.mp4";

// How many seconds before the end to begin the crossfade
const FADE_LEAD = 1.8;
// Duration of the crossfade in seconds
const FADE_DUR = 1.8;

export default function VideoShowcase() {
  const refA = useRef<HTMLVideoElement>(null);
  const refB = useRef<HTMLVideoElement>(null);
  const activeRef = useRef<"a" | "b">("a");
  const fadingRef = useRef(false);

  useEffect(() => {
    const a = refA.current;
    const b = refB.current;
    if (!a || !b) return;

    // Set initial opacity directly — no React state to avoid re-renders
    a.style.opacity = "1";
    b.style.opacity = "0";
    a.play().catch(() => {});

    const tick = () => {
      const active = activeRef.current === "a" ? a : b;
      const standby = activeRef.current === "a" ? b : a;

      if (!active.duration || fadingRef.current) return;

      const remaining = active.duration - active.currentTime;
      if (remaining > FADE_LEAD) return;

      // Begin crossfade
      fadingRef.current = true;
      standby.currentTime = 0;
      standby.play().catch(() => {});

      active.style.transition = `opacity ${FADE_DUR}s ease-in-out`;
      standby.style.transition = `opacity ${FADE_DUR}s ease-in-out`;
      // Force a reflow so the transition fires from the current value
      void active.offsetHeight;
      active.style.opacity = "0";
      standby.style.opacity = "1";

      setTimeout(() => {
        active.pause();
        active.currentTime = 0;
        active.style.transition = "none";
        standby.style.transition = "none";
        activeRef.current = activeRef.current === "a" ? "b" : "a";
        fadingRef.current = false;
      }, (FADE_DUR + 0.15) * 1000);
    };

    const id = setInterval(tick, 150);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative bg-[#050505] overflow-hidden"
      style={{ paddingTop: "7rem", paddingBottom: "7rem" }}
    >
      {/* ── SECTION-LEVEL ATMOSPHERE ── */}
      {/* Wide deep blue haze that lives behind everything */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% 65%, rgba(0,110,220,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Hard bleed into hero section above */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "140px",
          background: "linear-gradient(to bottom, #050505 0%, transparent 100%)",
          zIndex: 20,
        }}
      />
      {/* Hard bleed into next section below */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "140px",
          background: "linear-gradient(to top, #050505 0%, transparent 100%)",
          zIndex: 20,
        }}
      />

      {/* ── HEADER ── */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[#007BFF] text-[11px] font-bold uppercase tracking-[0.32em] mb-4">
            Experiencia en Acción
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05]">
            El Arte del{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #007BFF, #00AFFF)",
              }}
            >
              Detailing
            </span>
          </h2>
        </motion.div>
      </div>

      {/* ── VIDEO STAGE ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="relative z-10"
        style={{ width: "92%", maxWidth: "1500px", margin: "0 auto" }}
      >
        {/* Atmospheric glow BEHIND the video */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: "-8% -5%",
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,123,255,0.22) 0%, rgba(0,80,180,0.08) 45%, transparent 75%)",
            filter: "blur(48px)",
            zIndex: 0,
          }}
        />
        {/* Tighter inner halo */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: "5% 10%",
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,150,255,0.10) 0%, transparent 100%)",
            filter: "blur(20px)",
            zIndex: 0,
          }}
        />

        {/* VIDEO CONTAINER — relative so edge overlays can position against it */}
        <div className="relative" style={{ zIndex: 1 }}>
          {/* Aspect ratio shell */}
          <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
            {/* Video A */}
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
            {/* Video B (crossfade twin) */}
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

          {/* ── EDGE DISSOLVE OVERLAYS ── all pointer-events-none, sit above video */}

          {/* LEFT dissolve */}
          <div
            className="absolute inset-y-0 left-0 pointer-events-none"
            style={{
              width: "22%",
              background:
                "linear-gradient(to right, #050505 0%, rgba(5,5,5,0.92) 25%, rgba(5,5,5,0.55) 60%, transparent 100%)",
              zIndex: 2,
            }}
          />
          {/* RIGHT dissolve */}
          <div
            className="absolute inset-y-0 right-0 pointer-events-none"
            style={{
              width: "22%",
              background:
                "linear-gradient(to left, #050505 0%, rgba(5,5,5,0.92) 25%, rgba(5,5,5,0.55) 60%, transparent 100%)",
              zIndex: 2,
            }}
          />
          {/* TOP dissolve */}
          <div
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{
              height: "24%",
              background:
                "linear-gradient(to bottom, #050505 0%, rgba(5,5,5,0.85) 35%, rgba(5,5,5,0.4) 70%, transparent 100%)",
              zIndex: 2,
            }}
          />
          {/* BOTTOM dissolve */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{
              height: "24%",
              background:
                "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.85) 35%, rgba(5,5,5,0.4) 70%, transparent 100%)",
              zIndex: 2,
            }}
          />

          {/* CORNER KILLERS — radial gradients that obliterate the 4 corners */}
          <div
            className="absolute top-0 left-0 pointer-events-none"
            style={{
              width: "28%", height: "28%",
              background: "radial-gradient(circle at 0% 0%, #050505 25%, rgba(5,5,5,0.6) 55%, transparent 75%)",
              zIndex: 3,
            }}
          />
          <div
            className="absolute top-0 right-0 pointer-events-none"
            style={{
              width: "28%", height: "28%",
              background: "radial-gradient(circle at 100% 0%, #050505 25%, rgba(5,5,5,0.6) 55%, transparent 75%)",
              zIndex: 3,
            }}
          />
          <div
            className="absolute bottom-0 left-0 pointer-events-none"
            style={{
              width: "28%", height: "28%",
              background: "radial-gradient(circle at 0% 100%, #050505 25%, rgba(5,5,5,0.6) 55%, transparent 75%)",
              zIndex: 3,
            }}
          />
          <div
            className="absolute bottom-0 right-0 pointer-events-none"
            style={{
              width: "28%", height: "28%",
              background: "radial-gradient(circle at 100% 100%, #050505 25%, rgba(5,5,5,0.6) 55%, transparent 75%)",
              zIndex: 3,
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
