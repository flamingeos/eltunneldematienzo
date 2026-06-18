import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import AppointmentsClient from "./AppointmentsClient";

export default async function AppointmentsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <AppointmentsClient appointments={appointments} />;
}
