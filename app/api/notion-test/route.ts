import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    const databaseId = process.env.NOTION_DATABASE_ID!;

    // Obtener información de la base de datos (estructura)
    const database = await notion.databases.retrieve({
      database_id: databaseId,
    });

    // Obtener algunos registros de ejemplo
    const response = await (notion.databases as any).query({
      database_id: databaseId,
      page_size: 5, // Solo 5 registros para ver la estructura
    });

    return NextResponse.json({
      success: true,
      message: "✅ Conexión exitosa con Notion!",
      database: {
        title: (database as any).title,
        properties: (database as any).properties,
      },
      sampleRecords: response.results.length,
      records: response.results.map((page: any) => ({
        id: page.id,
        properties: page.properties,
        created_time: page.created_time,
        last_edited_time: page.last_edited_time,
      })),
    });
  } catch (error: any) {
    console.error("Error conectando con Notion:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: error,
      },
      { status: 500 }
    );
  }
}
