import { NextResponse } from "next/server";
import { getAllLeads, calculateLeadMetrics } from "@/lib/notion";

export const dynamic = "force-dynamic"; // Desactivar caché para datos en tiempo real

export async function GET() {
  try {
    // Verificar variables de entorno
    if (!process.env.NOTION_API_KEY) {
      throw new Error("NOTION_API_KEY no está configurada");
    }
    if (!process.env.NOTION_DATABASE_ID) {
      throw new Error("NOTION_DATABASE_ID no está configurada");
    }

    console.log("Obteniendo leads desde Notion...");
    const leads = await getAllLeads();
    console.log(`✓ ${leads.length} leads obtenidos exitosamente`);

    const metrics = calculateLeadMetrics(leads);
    console.log("✓ Métricas calculadas exitosamente");

    return NextResponse.json({
      success: true,
      data: metrics,
    });
  } catch (error: any) {
    console.error("❌ Error en /api/metrics:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al calcular las métricas",
        details: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }
}
