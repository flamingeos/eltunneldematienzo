import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminMembershipsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const memberships = await prisma.membership.findMany({
    orderBy: { createdAt: "desc" },
  });

  const active = memberships.filter((m) => m.status === "active").length;

  return (
    <div className="p-6 lg:p-8 pt-16 lg:pt-8">
      <div className="mb-6">
        <h1 className="text-white font-black text-2xl">Membresías</h1>
        <p className="text-gray-500 text-sm">{active} activas · {memberships.length} total</p>
      </div>

      <div className="glass rounded-2xl border border-[#007BFF]/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#007BFF]/10">
                <th className="text-left px-5 py-3.5 text-gray-500 font-medium">Miembro</th>
                <th className="text-left px-5 py-3.5 text-gray-500 font-medium">Plan</th>
                <th className="text-left px-5 py-3.5 text-gray-500 font-medium hidden md:table-cell">Teléfono</th>
                <th className="text-left px-5 py-3.5 text-gray-500 font-medium">Estado</th>
                <th className="text-left px-5 py-3.5 text-gray-500 font-medium hidden lg:table-cell">Desde</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#007BFF]/05">
              {memberships.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-600">
                    No hay membresías aún
                  </td>
                </tr>
              ) : (
                memberships.map((m) => (
                  <tr key={m.id} className="hover:bg-[#007BFF]/03 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-white font-medium">{m.name}</p>
                      <p className="text-gray-500 text-xs">{m.email}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-[#007BFF] font-semibold">{m.plan}</span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell text-gray-400">{m.phone}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        m.status === "active"
                          ? "bg-green-400/10 text-green-400"
                          : "bg-red-400/10 text-red-400"
                      }`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell text-gray-500 text-xs">
                      {new Date(m.startDate).toLocaleDateString("es-PR")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
