"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, CalendarCheck, Users, Tag, Image as ImageIcon, BarChart2,
  Droplets, LogOut, Menu, X
} from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/admin/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { href: "/admin/appointments", icon: <CalendarCheck size={18} />, label: "Citas" },
  { href: "/admin/memberships", icon: <Users size={18} />, label: "Membresías" },
  { href: "/admin/promotions", icon: <Tag size={18} />, label: "Promociones" },
  { href: "/admin/gallery", icon: <ImageIcon size={18} />, label: "Galería" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  const nav = (
    <nav className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-[#007BFF]/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#007BFF] flex items-center justify-center">
            <Droplets size={15} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-xs">El Túnel de Matienzo</p>
            <p className="text-gray-600 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="flex-1 px-3 py-4 space-y-1">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              pathname === l.href
                ? "bg-[#007BFF] text-white"
                : "text-gray-400 hover:text-white hover:bg-[#007BFF]/10"
            }`}
          >
            {l.icon}
            {l.label}
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-[#007BFF]/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
        >
          <LogOut size={18} />
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-9 h-9 rounded-lg bg-[#007BFF]/20 border border-[#007BFF]/40 flex items-center justify-center text-white"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#080808] border-r border-[#007BFF]/10 z-40 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {nav}
      </aside>
    </>
  );
}
