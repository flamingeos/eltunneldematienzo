import { prisma } from "@/lib/prisma";
import PromotionsClient from "./PromotionsClient";

async function getActivePromotions() {
  try {
    const now = new Date();
    return await prisma.promotion.findMany({
      where: {
        active: true,
        OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
      },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function PromotionsPage() {
  const promotions = await getActivePromotions();
  return <PromotionsClient promotions={promotions} />;
}
