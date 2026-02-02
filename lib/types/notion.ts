// Tipos para la base de datos de Leads de Notion
// Basado en la estructura de ViajeXMundo

export interface Lead {
  id: string;
  company: string; // Nombre de la persona/empresa del lead
  category: string; // Fase del lead (Nuevo, Contactado, Cotizado, etc.)
  status: string; // Estado final (Ganado, Perdido, En Proceso, etc.)
  createdBy: string; // Quién creó el lead
  assignedTo: string; // A quién está asignado
  createdTime: string; // Fecha de creación
  lastEditedTime: string; // Última edición

  // Campos adicionales típicos de leads de agencia de viajes
  email?: string;
  phone?: string;
  destination?: string; // Destino deseado
  budget?: number; // Presupuesto estimado
  travelDate?: string; // Fecha de viaje
  source?: string; // Fuente del lead (Facebook, Instagram, Web, etc.)
  notes?: string; // Notas adicionales
  numberOfTravelers?: number; // Número de viajeros
  priority?: string; // Prioridad (Alta, Media, Baja)
}

export interface NotionProperty {
  id: string;
  type: string;
  [key: string]: any;
}

export interface NotionDatabase {
  id: string;
  title: string;
  properties: Record<string, NotionProperty>;
}

// KPIs y métricas
export interface LeadMetrics {
  totalLeads: number;
  leadsByStatus: Record<string, number>;
  leadsByCategory: Record<string, number>;
  leadsBySource: Record<string, number>;
  conversionRate: number;
  averageBudget: number;
  leadsThisMonth: number;
  leadsThisWeek: number;
  topDestinations: Array<{ destination: string; count: number }>;
  leadsByAssignee: Record<string, number>;
}

// Filtros para el dashboard
export interface LeadFilters {
  status?: string[];
  category?: string[];
  source?: string[];
  assignedTo?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  searchQuery?: string;
}

// Estados típicos de un lead
export const LEAD_STATUSES = {
  GANADO: "Ganado",
  PERDIDO: "Perdido",
  EN_PROCESO: "En Proceso",
  CANCELADO: "Cancelado",
} as const;

// Categorías/Fases típicas
export const LEAD_CATEGORIES = {
  NUEVO: "Nuevo",
  CONTACTADO: "Contactado",
  COTIZADO: "Cotizado",
  NEGOCIACION: "Negociación",
  VENDIDO: "Vendido",
} as const;

// Fuentes de leads
export const LEAD_SOURCES = {
  FACEBOOK: "Facebook",
  INSTAGRAM: "Instagram",
  WEBSITE: "Sitio Web",
  REFERIDO: "Referido",
  GOOGLE: "Google",
  WHATSAPP: "WhatsApp",
  OTRO: "Otro",
} as const;
