const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;

async function testNotionConnection() {
  try {
    console.log("🔄 Conectando con Notion...\n");

    // Obtener estructura de la base de datos
    const database = await notion.databases.retrieve({
      database_id: databaseId,
    });

    console.log("✅ CONEXIÓN EXITOSA!\n");
    console.log("📊 Nombre de la base de datos:", database.title[0]?.plain_text || "Sin título");
    console.log("\n📋 PROPIEDADES DE LA BASE DE DATOS:\n");
    console.log("=".repeat(60));

    // Mostrar todas las propiedades
    Object.entries(database.properties).forEach(([name, prop]) => {
      console.log(`\n🔹 ${name}`);
      console.log(`   Tipo: ${prop.type}`);

      // Mostrar opciones si es un select o multi_select
      if (prop.type === "select" && prop.select?.options) {
        console.log("   Opciones:", prop.select.options.map(o => o.name).join(", "));
      }
      if (prop.type === "multi_select" && prop.multi_select?.options) {
        console.log("   Opciones:", prop.multi_select.options.map(o => o.name).join(", "));
      }
      if (prop.type === "status" && prop.status?.options) {
        console.log("   Estados:", prop.status.options.map(o => o.name).join(", "));
      }
    });

    console.log("\n" + "=".repeat(60));

    // Obtener algunos registros de ejemplo
    console.log("\n🔍 Obteniendo registros de ejemplo...\n");
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 3,
    });

    console.log(`📝 Total de registros encontrados: ${response.results.length}\n`);

    if (response.results.length > 0) {
      console.log("📄 EJEMPLO DE REGISTRO #1:\n");
      console.log("=".repeat(60));
      const firstRecord = response.results[0];

      Object.entries(firstRecord.properties).forEach(([name, prop]) => {
        let value = "N/A";

        if (prop.type === "title" && prop.title.length > 0) {
          value = prop.title[0].plain_text;
        } else if (prop.type === "rich_text" && prop.rich_text.length > 0) {
          value = prop.rich_text[0].plain_text;
        } else if (prop.type === "select" && prop.select) {
          value = prop.select.name;
        } else if (prop.type === "multi_select" && prop.multi_select) {
          value = prop.multi_select.map(s => s.name).join(", ");
        } else if (prop.type === "status" && prop.status) {
          value = prop.status.name;
        } else if (prop.type === "people" && prop.people) {
          value = prop.people.map(p => p.name || p.id).join(", ");
        } else if (prop.type === "date" && prop.date) {
          value = prop.date.start;
        } else if (prop.type === "number" && prop.number !== null) {
          value = prop.number;
        } else if (prop.type === "checkbox") {
          value = prop.checkbox ? "✓" : "✗";
        }

        console.log(`${name}: ${value}`);
      });
      console.log("=".repeat(60));
    }

    console.log("\n✨ ¡Test completado exitosamente!\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("\nDetalles del error:", error);
  }
}

testNotionConnection();
