import { NextResponse } from "next/server";
import { getAllLeads } from "@/lib/notion";

export const dynamic = "force-dynamic"; // Desactivar caché para datos en tiempo real

export async function GET() {
  try {
    const leads = await getAllLeads();

    return NextResponse.json({
      success: true,
      data: leads,
      count: leads.length,
    });
  } catch (error: any) {
    console.error("Error en /api/leads:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener los leads",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
