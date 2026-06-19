"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const SRC =
  "/loop image logo car/hf_20260619_063252_c18f2f97-9d28-4120-9531-19099e7b8381.mp4";

const FADE_LEAD = 1.8;
const FADE_DUR  = 1.8;

// Exact background color used on every edge gradient — must match the section bg
// Sampled from the video's outer edges: deep blue-black tunnel wall tone
const BG = "#040810";

export default function VideoShowcase() {
  const refA = useRef<HTMLVideoElement>(null);
  const refB = useRef<HTMLVideoElement>(null);
  const activeRef   = useRef<"a" | "b">("a");
  const fadingRef   = useRef(false);

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

      const remaining = active.duration - active.currentTime;
      if (remaining > FADE_LEAD) return;

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
        active.currentTime  = 0;
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
    <section
      className="relative overflow-hidden"
      style={{ background: BG, paddingTop: "3rem", paddingBottom: "3rem" }}
    >
      {/* ═══════════════════════════════════════════════════════════
          TUNNEL ENVIRONMENT — matches outer-edge colors of the video
          The left/right glows mirror the blue brush lighting in the
          car wash tunnel. The floor and ceiling match the dark walls.
      ════════════════════════════════════════════════════════════ */}

      {/* Deep blue tunnel atmosphere behind everything */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 110% 80% at 50% 50%, rgba(0,30,90,0.55) 0%, rgba(4,8,16,0) 65%)",
        }}
      />

      {/* LEFT brush bloom — bright royal-blue radial, left side of tunnel */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "0%", left: "-8%",
          width: "55%", height: "100%",
          background:
            "radial-gradient(ellipse 60% 70% at 15% 52%, rgba(0,90,220,0.55) 0%, rgba(0,55,160,0.25) 38%, rgba(0,30,90,0.08) 65%, transparent 85%)",
          filter: "blur(52px)",
        }}
      />

      {/* RIGHT brush bloom — mirror */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "0%", right: "-8%",
          width: "55%", height: "100%",
          background:
            "radial-gradient(ellipse 60% 70% at 85% 52%, rgba(0,90,220,0.55) 0%, rgba(0,55,160,0.25) 38%, rgba(0,30,90,0.08) 65%, transparent 85%)",
          filter: "blur(52px)",
        }}
      />

      {/* Vehicle center light bloom — soft blue halo around car position */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%", left: "25%",
          width: "50%", height: "80%",
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,110,255,0.18) 0%, rgba(0,70,200,0.07) 50%, transparent 80%)",
          filter: "blur(28px)",
        }}
      />

      {/* Mist / water-vapor layer 1 — horizontal streaks at upper-mid */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "18%", left: 0, right: 0, height: "30%",
          background:
            "linear-gradient(to right, transparent 0%, rgba(80,150,255,0.04) 20%, rgba(120,180,255,0.07) 50%, rgba(80,150,255,0.04) 80%, transparent 100%)",
          filter: "blur(12px)",
        }}
      />

      {/* Mist / water-vapor layer 2 — slightly lower, different density */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "42%", left: 0, right: 0, height: "25%",
          background:
            "linear-gradient(to right, transparent 0%, rgba(60,120,220,0.03) 15%, rgba(100,160,255,0.06) 50%, rgba(60,120,220,0.03) 85%, transparent 100%)",
          filter: "blur(18px)",
        }}
      />

      {/* Floor reflection — tunnel floor wet blue tint */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "35%",
          background:
            "linear-gradient(to top, rgba(0,40,130,0.22) 0%, rgba(0,25,80,0.08) 50%, transparent 100%)",
        }}
      />

      {/* Ceiling dark falloff */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "25%",
          background:
            "linear-gradient(to bottom, rgba(2,4,14,0.7) 0%, transparent 100%)",
        }}
      />

      {/* Section bleed into hero */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "120px",
          background: `linear-gradient(to bottom, #050505 0%, ${BG} 100%)`,
          zIndex: 20,
        }}
      />
      {/* Section bleed into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "120px",
          background: `linear-gradient(to top, #050505 0%, ${BG} 100%)`,
          zIndex: 20,
        }}
      />

      {/* ═══════════════════════════
          HEADER
      ═══════════════════════════ */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[#007BFF] text-[11px] font-bold uppercase tracking-[0.32em] mb-3">
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

      {/* ═══════════════════════════
          VIDEO STAGE
      ═══════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="relative z-10"
        style={{ width: "96%", maxWidth: "1900px", margin: "0 auto" }}
      >
        {/* Video container */}
        <div className="relative">
          <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
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

          {/* ── EDGE DISSOLVE — all using BG const so they perfectly match ── */}

          {/* LEFT */}
          <div
            className="absolute inset-y-0 left-0 pointer-events-none"
            style={{
              width: "20%",
              background: `linear-gradient(to right, ${BG} 0%, rgba(4,8,16,0.88) 28%, rgba(4,8,16,0.45) 62%, transparent 100%)`,
              zIndex: 2,
            }}
          />
          {/* RIGHT */}
          <div
            className="absolute inset-y-0 right-0 pointer-events-none"
            style={{
              width: "20%",
              background: `linear-gradient(to left, ${BG} 0%, rgba(4,8,16,0.88) 28%, rgba(4,8,16,0.45) 62%, transparent 100%)`,
              zIndex: 2,
            }}
          />
          {/* TOP */}
          <div
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{
              height: "22%",
              background: `linear-gradient(to bottom, ${BG} 0%, rgba(4,8,16,0.8) 38%, rgba(4,8,16,0.3) 72%, transparent 100%)`,
              zIndex: 2,
            }}
          />
          {/* BOTTOM */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{
              height: "22%",
              background: `linear-gradient(to top, ${BG} 0%, rgba(4,8,16,0.8) 38%, rgba(4,8,16,0.3) 72%, transparent 100%)`,
              zIndex: 2,
            }}
          />

          {/* CORNER KILLERS */}
          {[
            { top: 0,    left: 0,     pos: "0% 0%"     },
            { top: 0,    right: 0,    pos: "100% 0%"   },
            { bottom: 0, left: 0,     pos: "0% 100%"   },
            { bottom: 0, right: 0,    pos: "100% 100%" },
          ].map((s, i) => (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                width: "26%", height: "26%",
                background: `radial-gradient(circle at ${s.pos}, ${BG} 20%, rgba(4,8,16,0.55) 52%, transparent 72%)`,
                zIndex: 3,
                ...s,
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
