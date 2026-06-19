"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const SRC =
  "/loop image logo car/hf_20260619_063252_c18f2f97-9d28-4120-9531-19099e7b8381.mp4";

const FADE_LEAD = 1.8;
const FADE_DUR  = 1.8;

export default function VideoShowcase() {
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
    <section className="relative bg-[#050505] overflow-hidden">

      {/* ── FULL-WIDTH VIDEO behind the title ── */}
      <div
        className="relative w-full"
        style={{
          /*
           * Single compound mask — two linear gradients intersected.
           * Where BOTH are opaque the video shows. At every edge AND corner
           * both gradients taper together, so there are zero visible rectangles.
           */
          WebkitMaskImage: `
            linear-gradient(to right,  transparent 0%, black 10%, black 90%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)
          `,
          WebkitMaskComposite: "source-in",
          maskImage: `
            linear-gradient(to right,  transparent 0%, black 10%, black 90%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)
          `,
          maskComposite: "intersect",
        }}
      >
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
      </div>

      {/* ── TITLE overlaid in the center of the video ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center px-4"
        >
          <p className="text-[#00AFFF] text-[11px] font-bold uppercase tracking-[0.32em] mb-4 drop-shadow-lg">
            Experiencia en Acción
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05]"
            style={{ textShadow: "0 2px 32px rgba(0,0,0,0.9)" }}
          >
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

    </section>
  );
}
