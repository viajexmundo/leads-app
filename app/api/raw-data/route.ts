import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
      return NextResponse.json(
        { error: "Variables de entorno no configuradas" },
        { status: 500 }
      );
    }

    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    // Obtener estructura completa de la base de datos
    const database = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    // Obtener algunos registros
    const queryResponse = await fetch(
      `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page_size: 2 }),
      }
    );

    const queryData = await queryResponse.json();

    // Devolver TODO el objeto completo sin filtrar
    return NextResponse.json({
      info: "Este endpoint muestra TODA la data cruda de Notion",
      database: database, // Objeto completo sin castear
      registros: queryData.results || [], // Registros completos
      totalRegistros: queryData.results?.length || 0,
    }, { status: 200 });
  } catch (error: any) {
    console.error("Error obteniendo raw data:", error);
    return NextResponse.json(
      {
        error: "Error al obtener datos crudos",
        details: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
