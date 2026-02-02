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

    // Obtener estructura de la base de datos
    const database = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    // Obtener algunos registros para ver valores de ejemplo
    const queryResponse = await fetch(
      `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page_size: 3 }),
      }
    );

    const queryData = await queryResponse.json();
    const properties = (database as any).properties || {};

    // Formatear información de propiedades
    const schema = Object.entries(properties).map(([name, prop]: [string, any]) => {
      const propertyInfo: any = {
        nombre: name,
        tipo: prop.type,
        id: prop.id,
      };

      // Agregar información específica según el tipo
      if (prop.type === "select" && prop.select?.options) {
        propertyInfo.opciones = prop.select.options.map((o: any) => o.name);
      }

      if (prop.type === "multi_select" && prop.multi_select?.options) {
        propertyInfo.opciones = prop.multi_select.options.map((o: any) => o.name);
      }

      if (prop.type === "status" && prop.status?.options) {
        propertyInfo.opciones = prop.status.options.map((o: any) => ({
          nombre: o.name,
          color: o.color,
        }));
      }

      // Agregar valores de ejemplo del primer registro
      if (queryData.results && queryData.results.length > 0) {
        const firstRecord = queryData.results[0];
        const propertyValue = firstRecord.properties[name];

        if (propertyValue) {
          switch (propertyValue.type) {
            case "title":
              propertyInfo.ejemploValor = propertyValue.title?.[0]?.plain_text || "";
              break;
            case "rich_text":
              propertyInfo.ejemploValor = propertyValue.rich_text?.[0]?.plain_text || "";
              break;
            case "select":
              propertyInfo.ejemploValor = propertyValue.select?.name || "";
              break;
            case "multi_select":
              propertyInfo.ejemploValor = propertyValue.multi_select?.map((s: any) => s.name).join(", ") || "";
              break;
            case "status":
              propertyInfo.ejemploValor = propertyValue.status?.name || "";
              break;
            case "people":
              propertyInfo.ejemploValor = propertyValue.people?.map((p: any) => p.name || p.id).join(", ") || "";
              break;
            case "date":
              propertyInfo.ejemploValor = propertyValue.date?.start || "";
              break;
            case "number":
              propertyInfo.ejemploValor = propertyValue.number ?? "";
              break;
            case "checkbox":
              propertyInfo.ejemploValor = propertyValue.checkbox ? "✓" : "✗";
              break;
            case "email":
              propertyInfo.ejemploValor = propertyValue.email || "";
              break;
            case "phone_number":
              propertyInfo.ejemploValor = propertyValue.phone_number || "";
              break;
            case "url":
              propertyInfo.ejemploValor = propertyValue.url || "";
              break;
            case "created_time":
              propertyInfo.ejemploValor = propertyValue.created_time || "";
              break;
            case "last_edited_time":
              propertyInfo.ejemploValor = propertyValue.last_edited_time || "";
              break;
            default:
              propertyInfo.ejemploValor = "N/A";
          }
        }
      }

      return propertyInfo;
    });

    return NextResponse.json({
      nombreBaseDatos: (database as any).title?.[0]?.plain_text || "Sin título",
      totalPropiedades: schema.length,
      totalRegistros: queryData.results?.length || 0,
      propiedades: schema,
    });
  } catch (error: any) {
    console.error("Error obteniendo schema:", error);
    return NextResponse.json(
      {
        error: "Error al obtener el schema",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
