"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Car, Truck, Zap, Star, Gem,
  ChevronLeft, ChevronRight,
  CheckCircle, Loader2,
  Droplets, Sparkles, Shield,
  Check, Clock,
} from "lucide-react";
import { SERVICES } from "@/lib/services-data";

// ─── Constants ────────────────────────────────────────────────────────────────

const VEHICLE_TYPES = [
  { id: "Sedan", label: "Sedan", desc: "Compacto o mediano", Icon: Car },
  { id: "SUV / Crossover", label: "SUV / Crossover", desc: "Deportivo utilitario", Icon: Car },
  { id: "Pickup Truck", label: "Pickup Truck", desc: "Camioneta", Icon: Truck },
  { id: "Coupe / Sports", label: "Coupe / Sports", desc: "Deportivo de 2 puertas", Icon: Zap },
  { id: "Van / Minivan", label: "Van / Minivan", desc: "Furgoneta o minivan", Icon: Truck },
  { id: "Luxury / Exotic", label: "Luxury / Exotic", desc: "Premium o exotico", Icon: Gem },
];

const CATEGORY_CONFIG = {
  exterior:   { label: "Exterior",    Icon: Droplets  },
  interior:   { label: "Interior",    Icon: Sparkles  },
  protection: { label: "Proteccion", Icon: Shield    },
  correction: { label: "Correccion", Icon: Zap       },
} as const;

const ALL_TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

const MONTHS_ES = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
];

const DAYS_ES = ["Dom","Lun","Mar","Mie","Jue","Vie","Sab"];

const STEP_LABELS = ["Vehiculo","Servicio","Fecha","Hora","Datos","Confirmar"];

// ─── Types ────────────────────────────────────────────────────────────────────

interface BookingState {
  vehicleType: string;
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

interface InfoErrors {
  name?: string;
  email?: string;
  phone?: string;
}

// ─── Calendar helpers ─────────────────────────────────────────────────────────

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cells: Array<{ day: number | null; date: Date | null; disabled: boolean }> = [];

  for (let i = 0; i < firstDay; i++) {
    cells.push({ day: null, date: null, disabled: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    cells.push({ day: d, date, disabled: date.getDay() === 0 || date < today });
  }
  return cells;
}

function dateToString(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDateDisplay(ds: string) {
  if (!ds) return "";
  const [y, m, d] = ds.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const names = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
  return `${names[date.getDay()]}, ${d} de ${MONTHS_ES[m - 1]} ${y}`;
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center mb-8 overflow-x-auto">
      <div className="flex items-center min-w-max">
        {STEP_LABELS.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <motion.div
                  animate={{
                    backgroundColor: done || active ? "#007BFF" : "rgba(255,255,255,0.05)",
                    borderColor: done || active ? "#007BFF" : "rgba(255,255,255,0.12)",
                    scale: active ? 1.15 : 1,
                    boxShadow: active ? "0 0 18px rgba(0,123,255,0.55)" : "none",
                  }}
                  transition={{ duration: 0.25 }}
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                  style={{ color: done || active ? "#fff" : "#555" }}
                >
                  {done ? <Check size={13} /> : <span>{i + 1}</span>}
                </motion.div>
                <span
                  className={`text-[9px] font-semibold uppercase tracking-wide hidden sm:block transition-colors ${
                    active ? "text-[#007BFF]" : done ? "text-white/40" : "text-white/20"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div
                  className="h-px mx-1 mb-4 transition-all duration-300"
                  style={{
                    width: "2rem",
                    background: i < current
                      ? "linear-gradient(90deg, #007BFF, #00AFFF)"
                      : "rgba(255,255,255,0.08)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 0: Vehicle ──────────────────────────────────────────────────────────

function StepVehicle({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <h2 className="text-white font-black text-2xl mb-1">Tipo de vehiculo</h2>
      <p className="text-gray-500 text-sm mb-6">Selecciona el vehiculo que vas a detallar.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {VEHICLE_TYPES.map(({ id, label, desc, Icon }) => {
          const sel = selected === id;
          return (
            <motion.button
              key={id}
              onClick={() => onSelect(id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all text-center ${
                sel
                  ? "border-[#007BFF] bg-[#007BFF]/10"
                  : "border-white/8 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
              style={sel ? { boxShadow: "0 0 25px rgba(0,123,255,0.22)" } : {}}
            >
              {sel && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#007BFF] flex items-center justify-center"
                >
                  <Check size={11} className="text-white" />
                </motion.div>
              )}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${sel ? "bg-[#007BFF]/20" : "bg-white/5"}`}>
                <Icon size={24} className={sel ? "text-[#007BFF]" : "text-gray-400"} />
              </div>
              <div>
                <p className={`font-bold text-sm ${sel ? "text-white" : "text-gray-300"}`}>{label}</p>
                <p className="text-gray-600 text-xs mt-0.5">{desc}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 1: Service ──────────────────────────────────────────────────────────

function StepService({ selected, onSelect }: { selected: string; onSelect: (s: string) => void }) {
  const [cat, setCat] = useState<keyof typeof CATEGORY_CONFIG>("exterior");
  const filtered = SERVICES.filter((s) => s.category === cat);

  return (
    <div>
      <h2 className="text-white font-black text-2xl mb-1">Selecciona el servicio</h2>
      <p className="text-gray-500 text-sm mb-5">Elige el servicio ideal para tu vehiculo.</p>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-none">
        {(Object.keys(CATEGORY_CONFIG) as Array<keyof typeof CATEGORY_CONFIG>).map((key) => {
          const { label, Icon } = CATEGORY_CONFIG[key];
          const active = cat === key;
          return (
            <button
              key={key}
              onClick={() => setCat(key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all ${
                active
                  ? "bg-[#007BFF] text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
              style={active ? { boxShadow: "0 0 16px rgba(0,123,255,0.45)" } : {}}
            >
              <Icon size={13} />
              {label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((svc, i) => {
          const sel = selected === svc.name;
          return (
            <motion.button
              key={svc.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => onSelect(svc.name)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                sel
                  ? "border-[#007BFF] bg-[#007BFF]/10"
                  : "border-white/8 bg-white/[0.025] hover:border-white/18 hover:bg-white/[0.04]"
              }`}
              style={sel ? { boxShadow: "0 0 20px rgba(0,123,255,0.18)" } : {}}
            >
              {sel && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#007BFF] flex items-center justify-center"
                >
                  <Check size={11} className="text-white" />
                </motion.div>
              )}
              <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-lg ${sel ? "bg-[#007BFF]/20" : "bg-white/5"}`}>
                {cat === "exterior" ? "💧" : cat === "interior" ? "✨" : cat === "protection" ? "🛡️" : "🔧"}
              </div>
              <div className="flex-1 min-w-0 pr-5">
                <p className={`font-bold text-sm ${sel ? "text-white" : "text-gray-200"}`}>{svc.name}</p>
                <p className="text-gray-500 text-xs mt-0.5 truncate">{svc.description}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[#007BFF] text-xs font-semibold">{svc.price}</span>
                  <span className="text-gray-600 text-xs flex items-center gap-1">
                    <Clock size={10} />{svc.duration}h
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 2: Date ─────────────────────────────────────────────────────────────

function StepDate({ selected, onSelect }: { selected: string; onSelect: (d: string) => void }) {
  const today = new Date();
  const [yr, setYr] = useState(today.getFullYear());
  const [mo, setMo] = useState(today.getMonth());

  const cells = getCalendarDays(yr, mo);
  const canPrev = yr > today.getFullYear() || mo > today.getMonth();

  const prevMonth = () => {
    if (mo === 0) { setMo(11); setYr((y) => y - 1); }
    else setMo((m) => m - 1);
  };
  const nextMonth = () => {
    if (mo === 11) { setMo(0); setYr((y) => y + 1); }
    else setMo((m) => m + 1);
  };

  return (
    <div>
      <h2 className="text-white font-black text-2xl mb-1">Selecciona la fecha</h2>
      <p className="text-gray-500 text-sm mb-6">Los domingos estamos cerrados.</p>

      <div className="bg-white/[0.025] border border-white/10 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={prevMonth}
            disabled={!canPrev}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>
          <motion.h3
            key={`${yr}-${mo}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white font-bold text-base"
          >
            {MONTHS_ES[mo]} {yr}
          </motion.h3>
          <button
            onClick={nextMonth}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-7 mb-2">
          {DAYS_ES.map((d) => (
            <div key={d} className="text-center text-gray-600 text-[10px] font-semibold py-1 uppercase tracking-wide">
              {d}
            </div>
          ))}
        </div>

        <motion.div
          key={`${yr}-${mo}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-7 gap-1"
        >
          {cells.map((cell, i) => {
            if (!cell.day || !cell.date) return <div key={`e${i}`} />;
            const ds = dateToString(cell.date);
            const sel = selected === ds;
            const isToday = ds === dateToString(today);
            return (
              <motion.button
                key={ds}
                disabled={cell.disabled}
                onClick={() => !cell.disabled && onSelect(ds)}
                whileHover={!cell.disabled ? { scale: 1.12 } : {}}
                whileTap={!cell.disabled ? { scale: 0.92 } : {}}
                className={`
                  aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all
                  ${cell.disabled ? "text-gray-700 cursor-not-allowed" : "cursor-pointer"}
                  ${sel
                    ? "bg-[#007BFF] text-white font-bold"
                    : isToday && !cell.disabled
                      ? "text-[#007BFF] font-bold ring-1 ring-[#007BFF]/50"
                      : !cell.disabled
                        ? "text-gray-300 hover:bg-white/10 hover:text-white"
                        : ""}
                `}
                style={sel ? { boxShadow: "0 0 20px rgba(0,123,255,0.55)" } : {}}
              >
                {cell.day}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {selected && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#00AFFF] text-sm font-medium mt-3 text-center"
        >
          {formatDateDisplay(selected)}
        </motion.p>
      )}
    </div>
  );
}

// ─── Step 3: Time ─────────────────────────────────────────────────────────────

function StepTime({
  selected, onSelect, date, serviceName,
}: {
  selected: string;
  onSelect: (t: string) => void;
  date: string;
  serviceName: string;
}) {
  const [bookedSlots, setBookedSlots] = useState<{ time: string; durationHours: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/appointments/availability?date=${date}`)
      .then((r) => r.json())
      .then((data) => { setBookedSlots(data.bookedSlots ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [date]);

  const blocked = new Set<number>();
  bookedSlots.forEach(({ time, durationHours }) => {
    const idx = ALL_TIME_SLOTS.indexOf(time);
    if (idx >= 0) {
      for (let i = idx; i < idx + Math.ceil(durationHours); i++) blocked.add(i);
    }
  });

  const svcDuration = SERVICES.find((s) => s.name === serviceName)?.duration ?? 1;

  const isAvailable = (idx: number) => {
    for (let i = idx; i < idx + svcDuration; i++) {
      if (i >= ALL_TIME_SLOTS.length || blocked.has(i)) return false;
    }
    return true;
  };

  const renderSlot = (slot: string) => {
    const idx = ALL_TIME_SLOTS.indexOf(slot);
    const avail = isAvailable(idx);
    const sel = selected === slot;
    return (
      <motion.button
        key={slot}
        disabled={!avail}
        onClick={() => avail && onSelect(slot)}
        whileHover={avail ? { scale: 1.06 } : {}}
        whileTap={avail ? { scale: 0.94 } : {}}
        className={`py-3 px-2 rounded-xl text-sm font-semibold transition-all flex flex-col items-center gap-0.5 ${
          sel
            ? "bg-[#007BFF] text-white"
            : avail
              ? "bg-white/5 border border-white/10 text-gray-300 hover:border-[#007BFF]/50 hover:bg-[#007BFF]/10 hover:text-white"
              : "bg-white/[0.02] border border-white/5 text-gray-700 cursor-not-allowed"
        }`}
        style={sel ? { boxShadow: "0 0 20px rgba(0,123,255,0.5)" } : {}}
      >
        <span>{slot}</span>
        {!avail && <span className="text-[9px] text-gray-700 font-normal">Ocupado</span>}
      </motion.button>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 size={32} className="text-[#007BFF] animate-spin" />
        <p className="text-gray-500 text-sm">Cargando disponibilidad...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-white font-black text-2xl mb-1">Hora de la cita</h2>
      <p className="text-gray-500 text-sm mb-6">
        Lunes a Sabado · 8:00 AM – 5:00 PM
      </p>

      <div className="space-y-5">
        <div>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">Manana</p>
          <div className="grid grid-cols-4 gap-2">
            {ALL_TIME_SLOTS.slice(0, 4).map(renderSlot)}
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">Tarde</p>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {ALL_TIME_SLOTS.slice(4).map(renderSlot)}
          </div>
        </div>
      </div>

      {svcDuration > 1 && (
        <p className="text-gray-700 text-xs mt-5 text-center">
          Servicio de {svcDuration}h — solo se muestran horarios con disponibilidad completa
        </p>
      )}
    </div>
  );
}

// ─── Step 4: Info ─────────────────────────────────────────────────────────────

const INPUT = "w-full bg-[#080808] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-[#007BFF] focus:shadow-[0_0_15px_rgba(0,123,255,0.15)] transition-all text-sm";

function StepInfo({
  data, onChange, errors,
}: {
  data: { name: string; email: string; phone: string; notes: string };
  onChange: (f: "name" | "email" | "phone" | "notes", v: string) => void;
  errors: InfoErrors;
}) {
  return (
    <div>
      <h2 className="text-white font-black text-2xl mb-1">Datos de contacto</h2>
      <p className="text-gray-500 text-sm mb-6">Te enviaremos la confirmacion por email.</p>

      <div className="space-y-4">
        <div>
          <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1.5">Nombre completo</label>
          <input value={data.name} onChange={(e) => onChange("name", e.target.value)} placeholder="Juan Garcia" className={INPUT} />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
            <input value={data.email} onChange={(e) => onChange("email", e.target.value)} type="email" placeholder="juan@email.com" className={INPUT} />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1.5">Telefono</label>
            <input value={data.phone} onChange={(e) => onChange("phone", e.target.value)} placeholder="(787) 555-0000" className={INPUT} />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>
        <div>
          <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1.5">
            Notas adicionales <span className="text-gray-700 normal-case">(opcional)</span>
          </label>
          <textarea value={data.notes} onChange={(e) => onChange("notes", e.target.value)} placeholder="Ej: Tengo rayones en el capo, quiero ceramic coating..." rows={3} className={INPUT} />
        </div>
      </div>
    </div>
  );
}

// ─── Step 5: Confirm ──────────────────────────────────────────────────────────

function StepConfirm({
  booking, onSubmit, submitting,
}: {
  booking: BookingState;
  onSubmit: () => void;
  submitting: boolean;
}) {
  const svc = SERVICES.find((s) => s.name === booking.service);

  const rows = [
    { label: "Vehiculo",  value: booking.vehicleType },
    { label: "Servicio",  value: booking.service },
    { label: "Duracion",  value: svc ? `${svc.duration}h aprox.` : "-" },
    { label: "Precio",    value: svc ? svc.price : "-" },
    { label: "Fecha",     value: formatDateDisplay(booking.date) },
    { label: "Hora",      value: booking.time },
    { label: "Nombre",    value: booking.name },
    { label: "Email",     value: booking.email },
    { label: "Telefono",  value: booking.phone },
  ];

  return (
    <div>
      <h2 className="text-white font-black text-2xl mb-1">Confirma tu reserva</h2>
      <p className="text-gray-500 text-sm mb-6">Revisa los detalles antes de confirmar.</p>

      <div className="bg-white/[0.025] border border-white/10 rounded-2xl overflow-hidden mb-5">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-center justify-between px-5 py-3 ${i < rows.length - 1 ? "border-b border-white/5" : ""}`}
          >
            <span className="text-gray-500 text-sm">{row.label}</span>
            <span className="text-white text-sm font-semibold text-right max-w-[58%]">{row.value}</span>
          </div>
        ))}
      </div>

      {booking.notes && (
        <div className="bg-white/[0.025] border border-white/10 rounded-2xl p-4 mb-5">
          <p className="text-gray-600 text-[10px] uppercase tracking-wider mb-1">Notas</p>
          <p className="text-gray-300 text-sm">{booking.notes}</p>
        </div>
      )}

      <motion.button
        onClick={onSubmit}
        disabled={submitting}
        whileHover={!submitting ? { scale: 1.02 } : {}}
        whileTap={!submitting ? { scale: 0.98 } : {}}
        className="w-full flex items-center justify-center gap-3 py-4 bg-[#007BFF] text-white font-black rounded-2xl text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ boxShadow: "0 0 30px rgba(0,123,255,0.4)" }}
      >
        {submitting ? (
          <><Loader2 size={20} className="animate-spin" />Confirmando...</>
        ) : (
          <><CheckCircle size={20} />Confirmar Reserva</>
        )}
      </motion.button>

      <p className="text-gray-700 text-xs text-center mt-3">
        Al confirmar recibiras un email de confirmacion
      </p>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 55 : -55, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -55 : 55, opacity: 0 }),
};

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [infoErrors, setInfoErrors] = useState<InfoErrors>({});

  const [booking, setBooking] = useState<BookingState>({
    vehicleType: "", service: "", date: "", time: "",
    name: "", email: "", phone: "", notes: "",
  });

  const set = (updates: Partial<BookingState>) =>
    setBooking((b) => ({ ...b, ...updates }));

  const canNext = () => {
    if (step === 0) return !!booking.vehicleType;
    if (step === 1) return !!booking.service;
    if (step === 2) return !!booking.date;
    if (step === 3) return !!booking.time;
    if (step === 4) return !!booking.name && !!booking.email && !!booking.phone;
    return false;
  };

  const validateInfo = () => {
    const e: InfoErrors = {};
    if (!booking.name || booking.name.trim().length < 2) e.name = "Nombre requerido (minimo 2 caracteres)";
    if (!booking.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) e.email = "Email invalido";
    if (!booking.phone || booking.phone.replace(/\D/g, "").length < 10) e.phone = "Telefono requerido (minimo 10 digitos)";
    setInfoErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (step === 4 && !validateInfo()) return;
    setDir(1);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setDir(-1);
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: booking.name,
          email: booking.email,
          phone: booking.phone,
          service: booking.service,
          vehicleType: booking.vehicleType,
          date: booking.date,
          time: booking.time,
          notes: booking.notes || undefined,
        }),
      });
      if (res.ok) setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  const resetAll = () => {
    setSuccess(false);
    setStep(0);
    setDir(1);
    setBooking({ vehicleType: "", service: "", date: "", time: "", name: "", email: "", phone: "", notes: "" });
    setInfoErrors({});
  };

  const renderStep = () => {
    switch (step) {
      case 0: return <StepVehicle selected={booking.vehicleType} onSelect={(v) => set({ vehicleType: v })} />;
      case 1: return <StepService selected={booking.service} onSelect={(s) => set({ service: s, time: "" })} />;
      case 2: return <StepDate selected={booking.date} onSelect={(d) => set({ date: d, time: "" })} />;
      case 3: return <StepTime selected={booking.time} onSelect={(t) => set({ time: t })} date={booking.date} serviceName={booking.service} />;
      case 4: return (
        <StepInfo
          data={{ name: booking.name, email: booking.email, phone: booking.phone, notes: booking.notes }}
          onChange={(f, v) => {
            set({ [f]: v });
            if (infoErrors[f as keyof InfoErrors]) setInfoErrors((e) => ({ ...e, [f]: undefined }));
          }}
          errors={infoErrors}
        />
      );
      case 5: return <StepConfirm booking={booking} onSubmit={handleSubmit} submitting={submitting} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="text-[#007BFF] text-xs font-bold uppercase tracking-widest mb-2">
            Reservaciones
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            Reserva tu <span className="text-[#007BFF]">Cita</span>
          </h1>
          <p className="text-gray-500 text-sm">Proceso rapido — solo toma 2 minutos</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 220 }}
                className="w-24 h-24 rounded-full bg-[#007BFF]/20 border-2 border-[#007BFF]/40 flex items-center justify-center mx-auto mb-6"
                style={{ boxShadow: "0 0 60px rgba(0,123,255,0.35)" }}
              >
                <CheckCircle size={48} className="text-[#007BFF]" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-white font-black text-3xl mb-2">Cita Confirmada</h2>
                <p className="text-gray-400 mb-1">{booking.service} &mdash; {booking.time}</p>
                <p className="text-gray-500 text-sm mb-2">{formatDateDisplay(booking.date)}</p>
                <p className="text-gray-600 text-sm mb-8">
                  Confirmacion enviada a <span className="text-gray-400">{booking.email}</span>
                </p>
                <button
                  onClick={resetAll}
                  className="px-8 py-3 bg-[#007BFF] text-white font-bold rounded-xl hover:bg-[#0060dd] transition-all"
                  style={{ boxShadow: "0 0 20px rgba(0,123,255,0.4)" }}
                >
                  Reservar Otra Cita
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="flow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <StepIndicator current={step} />

              <div className="glass rounded-3xl p-6 sm:p-8 overflow-hidden" style={{ minHeight: 380 }}>
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={step}
                    custom={dir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {step < 5 && (
                <div className="flex items-center justify-between mt-5">
                  <motion.button
                    onClick={goBack}
                    disabled={step === 0}
                    whileHover={step > 0 ? { x: -2 } : {}}
                    className="flex items-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:text-white hover:bg-white/5 transition-all disabled:opacity-0 disabled:pointer-events-none"
                  >
                    <ChevronLeft size={16} />
                    Atras
                  </motion.button>

                  <motion.button
                    onClick={goNext}
                    disabled={!canNext()}
                    whileHover={canNext() ? { scale: 1.04 } : {}}
                    whileTap={canNext() ? { scale: 0.96 } : {}}
                    className="flex items-center gap-2 px-8 py-3 bg-[#007BFF] text-white font-bold rounded-xl text-sm transition-all disabled:opacity-25 disabled:cursor-not-allowed"
                    style={canNext() ? { boxShadow: "0 0 22px rgba(0,123,255,0.4)" } : {}}
                  >
                    {step === 4 ? "Revisar Reserva" : "Continuar"}
                    <ChevronRight size={16} />
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
