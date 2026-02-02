import { NextResponse } from "next/server";
import { getAllLeads, calculateLeadMetrics } from "@/lib/notion";

export const dynamic = "force-dynamic"; // Desactivar caché para datos en tiempo real

export async function GET() {
  try {
    const leads = await getAllLeads();
    const metrics = calculateLeadMetrics(leads);

    return NextResponse.json({
      success: true,
      data: metrics,
    });
  } catch (error: any) {
    console.error("Error en /api/metrics:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al calcular las métricas",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
