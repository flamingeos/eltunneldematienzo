"use client";

const ITEMS = [
  { emoji: "🚗", text: "Detailing Premium" },
  { emoji: "✨", text: "Recubrimientos Cerámicos" },
  { emoji: "🧼", text: "Lavado Profesional" },
  { emoji: "💎", text: "Protección de Pintura" },
  { emoji: "🚘", text: "Corrección de Pintura" },
  { emoji: "⭐", text: "Membresías Exclusivas" },
  { emoji: "🇵🇷", text: "Servicio #1 en Puerto Rico" },
];

function Track() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden>
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center">
          {/* Item */}
          <span className="flex items-center gap-2.5 whitespace-nowrap px-6">
            <span className="text-base">{item.emoji}</span>
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: "#c8d8f0", letterSpacing: "0.12em" }}
            >
              {item.text}
            </span>
          </span>
          {/* Separator diamond */}
          <span
            style={{
              display: "inline-block",
              width: "5px",
              height: "5px",
              background: "#007BFF",
              transform: "rotate(45deg)",
              boxShadow: "0 0 8px rgba(0,123,255,0.8), 0 0 18px rgba(0,123,255,0.4)",
              flexShrink: 0,
            }}
          />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#050505",
        borderTop: "1px solid rgba(0,123,255,0.12)",
        borderBottom: "1px solid rgba(0,123,255,0.12)",
        paddingTop: "1px",
        paddingBottom: "1px",
      }}
    >
      {/* Keyframe defined inline — no globals.css edit needed */}
      <style>{`
        @keyframes marquee-ltr {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      {/* Blue ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 200% at 50% 50%, rgba(0,123,255,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Left / right fade masks so it vanishes at the edges */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to right, #050505 0%, transparent 7%, transparent 93%, #050505 100%)",
        }}
      />

      {/* Scrolling track — duplicated to make a seamless loop */}
      <div className="py-4">
        <div
          className="flex"
          style={{ animation: "marquee-ltr 38s linear infinite" }}
        >
          {/* Render the track TWICE — at -50% the second copy starts exactly where the first ends */}
          <Track />
          <Track />
        </div>
      </div>
    </section>
  );
}
