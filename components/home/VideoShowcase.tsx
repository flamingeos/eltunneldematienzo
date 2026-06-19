"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <section className="relative bg-[#050505] py-24 sm:py-32 overflow-hidden">

      {/* Ambient blue floor glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 70%, rgba(0,123,255,0.09) 0%, transparent 70%)",
        }}
      />
      {/* Top bleed from hero */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #050505, transparent)",
        }}
      />
      {/* Bottom bleed into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #050505, transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#007BFF] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            Experiencia en Acción
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            El Arte del{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #007BFF, #00AFFF)" }}
            >
              Detailing
            </span>
          </h2>
        </motion.div>

        {/* Video wrapper — no borders, no container, pure cinema */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto"
          style={{ width: "100%", maxWidth: "900px" }}
        >
          {/* Blue ambient halo behind the video */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: "scale(1.05)",
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,123,255,0.18) 0%, transparent 70%)",
              filter: "blur(32px)",
              zIndex: 0,
            }}
          />

          {/* Video with CSS mask to dissolve all edges */}
          <div
            className="relative"
            style={{
              zIndex: 1,
              WebkitMaskImage:
                "radial-gradient(ellipse 88% 82% at 50% 50%, black 30%, transparent 100%)",
              maskImage:
                "radial-gradient(ellipse 88% 82% at 50% 50%, black 30%, transparent 100%)",
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              className="w-full h-auto block"
              style={{
                transform: "translateZ(0)",
                willChange: "transform",
                backfaceVisibility: "hidden",
                display: "block",
              }}
            >
              <source
                src="/loop image logo car/hf_20260619_055524_4c74f92d-3446-4548-b977-db2b3812a303.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
