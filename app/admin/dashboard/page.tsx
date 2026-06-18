import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CalendarCheck, Users, Tag, TrendingUp } from "lucide-react";
import Link from "next/link";

async function getStats() {
  try {
    const [appointments, memberships, promotions, todayAppointments] = await Promise.all([
      prisma.appointment.count(),
      prisma.membership.count({ where: { status: "active" } }),
      prisma.promotion.count({ where: { active: true } }),
      prisma.appointment.findMany({
        where: { date: new Date().toISOString().split("T")[0] },
        orderBy: { time: "asc" },
        take: 5,
      }),
    ]);
    return { appointments, memberships, promotions, todayAppointments };
  } catch {
    return { appointments: 0, memberships: 0, promotions: 0, todayAppointments: [] };
  }
}

export default async function DashboardPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { appointments, memberships, promotions, todayAppointments } = await getStats();

  const stats = [
    { label: "Total Citas", value: appointments, icon: <CalendarCheck size={20} />, color: "text-blue-400" },
    { label: "Membresías Activas", value: memberships, icon: <Users size={20} />, color: "text-cyan-400" },
    { label: "Promociones Activas", value: promotions, icon: <Tag size={20} />, color: "text-purple-400" },
    { label: "Citas Hoy", value: todayAppointments.length, icon: <TrendingUp size={20} />, color: "text-green-400" },
  ];

  return (
    <div className="p-6 lg:p-8 pt-16 lg:pt-8">
      <div className="mb-8">
        <h1 className="text-white font-black text-2xl">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          {new Date().toLocaleDateString("es-PR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-5 border border-[#007BFF]/15">
            <div className={`mb-3 ${s.color}`}>{s.icon}</div>
            <div className="text-white font-black text-3xl mb-1">{s.value}</div>
            <div className="text-gray-500 text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Today's appointments */}
      <div className="glass rounded-2xl border border-[#007BFF]/15 overflow-hidden">
        <div className="px-6 py-4 border-b border-[#007BFF]/10 flex items-center justify-between">
          <h2 className="text-white font-bold">Citas de Hoy</h2>
          <Link href="/admin/appointments" className="text-[#007BFF] text-sm hover:text-[#00AFFF] transition-colors">
            Ver todas →
          </Link>
        </div>
        {todayAppointments.length === 0 ? (
          <div className="px-6 py-10 text-center text-gray-600 text-sm">
            No hay citas para hoy
          </div>
        ) : (
          <div className="divide-y divide-[#007BFF]/10">
            {todayAppointments.map((apt) => (
              <div key={apt.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{apt.name}</p>
                  <p className="text-gray-500 text-xs">{apt.service} · {apt.vehicleType}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#007BFF] text-sm font-semibold">{apt.time}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    apt.status === "pending"
                      ? "bg-yellow-400/10 text-yellow-400"
                      : "bg-green-400/10 text-green-400"
                  }`}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
