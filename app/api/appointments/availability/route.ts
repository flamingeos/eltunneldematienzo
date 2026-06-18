import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SERVICE_DURATIONS } from "@/lib/services-data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "date required" }, { status: 400 });
  }

  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        date,
        status: { not: "cancelled" },
      },
      select: { time: true, service: true },
    });

    const bookedSlots = appointments.map((apt) => ({
      time: apt.time,
      durationHours: SERVICE_DURATIONS[apt.service] ?? 1,
    }));

    return NextResponse.json({ bookedSlots });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
