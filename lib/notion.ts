import { Client } from "@notionhq/client";
import { Lead, LeadMetrics } from "./types/notion";

// Inicializar cliente de Notion
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID!;

// Extraer valor de una propiedad de Notion
export function extractPropertyValue(property: any): any {
  if (!property) return null;

  switch (property.type) {
    case "title":
      return property.title?.[0]?.plain_text || "";
    case "rich_text":
      return property.rich_text?.[0]?.plain_text || "";
    case "select":
      return property.select?.name || "";
    case "multi_select":
      return property.multi_select?.map((s: any) => s.name).join(", ") || "";
    case "status":
      return property.status?.name || "";
    case "people":
      return property.people?.map((p: any) => p.name || p.id).join(", ") || "";
    case "date":
      return property.date?.start || null;
    case "number":
      return property.number ?? null;
    case "checkbox":
      return property.checkbox || false;
    case "email":
      return property.email || "";
    case "phone_number":
      return property.phone_number || "";
    case "url":
      return property.url || "";
    default:
      return null;
  }
}

// Convertir página de Notion a objeto Lead
export function notionPageToLead(page: any): Lead {
  const props = page.properties;

  return {
    id: page.id,
    company: extractPropertyValue(props.Company || props.Empresa || props.Nombre),
    category: extractPropertyValue(props.Category || props.Categoría || props.Fase),
    status: extractPropertyValue(props.Status || props.Estado),
    createdBy: extractPropertyValue(props["Created by"] || props["Creado por"]),
    assignedTo: extractPropertyValue(props["Assigned to"] || props["Asignado a"] || props.Asesor),
    createdTime: page.created_time,
    lastEditedTime: page.last_edited_time,
    email: extractPropertyValue(props.Email),
    phone: extractPropertyValue(props.Phone || props.Teléfono || props.Telefono),
    destination: extractPropertyValue(props.Destination || props.Destino),
    budget: extractPropertyValue(props.Budget || props.Presupuesto),
    travelDate: extractPropertyValue(props["Travel Date"] || props["Fecha de Viaje"]),
    source: extractPropertyValue(props.Source || props.Fuente || props.Origen),
    notes: extractPropertyValue(props.Notes || props.Notas),
    numberOfTravelers: extractPropertyValue(props["Travelers"] || props.Viajeros),
    priority: extractPropertyValue(props.Priority || props.Prioridad),
  };
}

// Obtener todos los leads
export async function getAllLeads(): Promise<Lead[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 100,
    });

    return response.results.map(notionPageToLead);
  } catch (error) {
    console.error("Error obteniendo leads:", error);
    throw error;
  }
}

// Obtener leads con filtros
export async function getFilteredLeads(filters?: any): Promise<Lead[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: filters,
      page_size: 100,
    });

    return response.results.map(notionPageToLead);
  } catch (error) {
    console.error("Error obteniendo leads filtrados:", error);
    throw error;
  }
}

// Calcular métricas de leads
export function calculateLeadMetrics(leads: Lead[]): LeadMetrics {
  const totalLeads = leads.length;

  // Leads por estado
  const leadsByStatus: Record<string, number> = {};
  leads.forEach((lead) => {
    leadsByStatus[lead.status] = (leadsByStatus[lead.status] || 0) + 1;
  });

  // Leads por categoría
  const leadsByCategory: Record<string, number> = {};
  leads.forEach((lead) => {
    leadsByCategory[lead.category] = (leadsByCategory[lead.category] || 0) + 1;
  });

  // Leads por fuente
  const leadsBySource: Record<string, number> = {};
  leads.forEach((lead) => {
    if (lead.source) {
      leadsBySource[lead.source] = (leadsBySource[lead.source] || 0) + 1;
    }
  });

  // Leads por asignado
  const leadsByAssignee: Record<string, number> = {};
  leads.forEach((lead) => {
    if (lead.assignedTo) {
      leadsByAssignee[lead.assignedTo] = (leadsByAssignee[lead.assignedTo] || 0) + 1;
    }
  });

  // Tasa de conversión (ganados / total)
  const wonLeads = leadsByStatus["Ganado"] || 0;
  const conversionRate = totalLeads > 0 ? (wonLeads / totalLeads) * 100 : 0;

  // Presupuesto promedio
  const budgets = leads.filter((l) => l.budget).map((l) => l.budget!);
  const averageBudget = budgets.length > 0
    ? budgets.reduce((sum, b) => sum + b, 0) / budgets.length
    : 0;

  // Leads de este mes
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const leadsThisMonth = leads.filter(
    (l) => new Date(l.createdTime) >= startOfMonth
  ).length;

  // Leads de esta semana
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  const leadsThisWeek = leads.filter(
    (l) => new Date(l.createdTime) >= startOfWeek
  ).length;

  // Top destinos
  const destinationCounts: Record<string, number> = {};
  leads.forEach((lead) => {
    if (lead.destination) {
      destinationCounts[lead.destination] =
        (destinationCounts[lead.destination] || 0) + 1;
    }
  });

  const topDestinations = Object.entries(destinationCounts)
    .map(([destination, count]) => ({ destination, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    totalLeads,
    leadsByStatus,
    leadsByCategory,
    leadsBySource,
    conversionRate,
    averageBudget,
    leadsThisMonth,
    leadsThisWeek,
    topDestinations,
    leadsByAssignee,
  };
}

// Obtener información de la base de datos
export async function getDatabaseInfo() {
  try {
    const database = await notion.databases.retrieve({
      database_id: databaseId,
    });
    return database;
  } catch (error) {
    console.error("Error obteniendo info de base de datos:", error);
    throw error;
  }
}
