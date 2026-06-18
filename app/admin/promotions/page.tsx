import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import PromotionsAdminClient from "./PromotionsAdminClient";

export default async function AdminPromotionsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const promotions = await prisma.promotion.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <PromotionsAdminClient promotions={promotions} />;
}
