"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Droplets, Lock, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError("Credenciales incorrectas");
      }
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-[#0a0a0a] border border-[#007BFF]/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#007BFF] focus:shadow-[0_0_15px_rgba(0,123,255,0.2)] transition-all";

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#007BFF]/20 border border-[#007BFF]/40 flex items-center justify-center mx-auto mb-4">
            <Droplets size={28} className="text-[#007BFF]" />
          </div>
          <h1 className="text-white font-black text-2xl">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">El Tunnel de Matienzo</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 border border-[#007BFF]/20 space-y-4"
        >
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Usuario</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className={inputClass}
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#007BFF] text-white font-bold rounded-xl hover:bg-[#0066dd] transition-all disabled:opacity-60"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Lock size={18} />
            )}
            Ingresar
          </button>
        </form>
      </motion.div>
    </div>
  );
}
