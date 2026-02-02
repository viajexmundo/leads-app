import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export const dynamic = "force-dynamic";

export async function GET() {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      hasNotionApiKey: !!process.env.NOTION_API_KEY,
      notionApiKeyLength: process.env.NOTION_API_KEY?.length || 0,
      notionApiKeyPrefix: process.env.NOTION_API_KEY?.substring(0, 10) + "...",
      hasNotionDatabaseId: !!process.env.NOTION_DATABASE_ID,
      notionDatabaseId: process.env.NOTION_DATABASE_ID,
    },
    tests: {},
  };

  // Test 1: Verificar variables de entorno
  if (!process.env.NOTION_API_KEY) {
    diagnostics.tests.envCheck = {
      status: "FAILED",
      error: "NOTION_API_KEY no está configurada",
    };
    return NextResponse.json(diagnostics);
  }

  if (!process.env.NOTION_DATABASE_ID) {
    diagnostics.tests.envCheck = {
      status: "FAILED",
      error: "NOTION_DATABASE_ID no está configurada",
    };
    return NextResponse.json(diagnostics);
  }

  diagnostics.tests.envCheck = { status: "PASSED" };

  // Test 2: Inicializar cliente de Notion
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
    diagnostics.tests.notionClient = { status: "PASSED" };

    // Test 3: Obtener información de la base de datos
    try {
      const database = await notion.databases.retrieve({
        database_id: process.env.NOTION_DATABASE_ID,
      });

      diagnostics.tests.databaseRetrieve = {
        status: "PASSED",
        databaseTitle: (database as any).title?.[0]?.plain_text || "Sin título",
        propertiesCount: Object.keys((database as any).properties || {}).length,
        properties: Object.keys((database as any).properties || {}),
      };

      // Test 4: Consultar registros
      try {
        const response = await (notion.databases as any).query({
          database_id: process.env.NOTION_DATABASE_ID,
          page_size: 5,
        });

        diagnostics.tests.databaseQuery = {
          status: "PASSED",
          recordsFound: response.results.length,
        };

        if (response.results.length > 0) {
          const firstRecord = response.results[0];
          diagnostics.tests.sampleRecord = {
            id: firstRecord.id,
            properties: Object.keys(firstRecord.properties),
          };
        }
      } catch (error: any) {
        diagnostics.tests.databaseQuery = {
          status: "FAILED",
          error: error.message,
          code: error.code,
        };
      }
    } catch (error: any) {
      diagnostics.tests.databaseRetrieve = {
        status: "FAILED",
        error: error.message,
        code: error.code,
        body: error.body,
      };
    }
  } catch (error: any) {
    diagnostics.tests.notionClient = {
      status: "FAILED",
      error: error.message,
    };
  }

  return NextResponse.json(diagnostics);
}
