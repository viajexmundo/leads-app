# 🌍 ViajeXMundo - Dashboard de Leads

Dashboard de análisis y KPIs para leads de la agencia de viajes ViajeXMundo, integrado con Notion como base de datos.

## 🚀 Características

- **Integración con Notion**: Conexión en tiempo real con base de datos de Notion
- **KPIs Principales**:
  - Total de leads
  - Tasa de conversión
  - Presupuesto promedio
  - Leads semanales/mensuales
- **Visualizaciones**:
  - Gráficos de distribución por estado
  - Gráficos de leads por categoría/fase
  - Top destinos más solicitados
  - Distribución por asesor
  - Análisis por fuente de leads
- **Actualización en tiempo real**: Los datos se sincronizan directamente desde Notion
- **Diseño responsivo**: Optimizado para desktop, tablet y móvil

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Gráficos**: Recharts
- **Base de datos**: Notion API
- **Deployment**: Railway

## 📋 Prerequisitos

1. Una cuenta de Notion con acceso a la base de datos de leads
2. Node.js 18+ instalado
3. Una integración de Notion creada (ver instrucciones abajo)

## 🔧 Configuración de Notion

### 1. Crear Integración en Notion

1. Ve a https://www.notion.so/my-integrations
2. Click en "+ New integration"
3. Dale un nombre (ej: "ViajeXMundo Dashboard")
4. Selecciona tu workspace
5. En **Capabilities**, marca **Read content**
6. Guarda el **Internal Integration Token**

### 2. Conectar Base de Datos

1. Abre tu base de datos de leads en Notion
2. Click en "..." (menú superior derecho)
3. Ve a "Connections" → "+ Add connections"
4. Selecciona tu integración
5. Copia el ID de la base de datos desde la URL

### 3. Estructura de la Base de Datos

Tu base de datos de Notion debe tener las siguientes propiedades:

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| Company | Title/Text | Nombre de la persona/empresa |
| Category | Select | Fase del lead (Nuevo, Contactado, etc.) |
| Status | Status/Select | Estado (Ganado, Perdido, En Proceso) |
| Created by | Person | Quién creó el lead |
| Assigned to | Person | Asesor asignado |
| Email | Email | Email del lead |
| Phone | Phone/Text | Teléfono |
| Destination | Text | Destino deseado |
| Budget | Number | Presupuesto estimado |
| Source | Select | Fuente (Facebook, Instagram, etc.) |

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone <repo-url>
cd leads-app
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env.local
```

4. Edita `.env.local` con tus credenciales:
```env
NOTION_API_KEY=tu_token_de_notion
NOTION_DATABASE_ID=tu_database_id
```

5. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

6. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## 📦 Deploy en Railway

1. Conecta tu repositorio de GitHub con Railway
2. Agrega las variables de entorno:
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`
3. Railway detectará automáticamente Next.js y lo desplegará
4. Tu aplicación estará disponible en el dominio generado

## 📊 KPIs Disponibles

### Métricas Principales
- **Total de Leads**: Cantidad total de leads en la base de datos
- **Tasa de Conversión**: Porcentaje de leads ganados
- **Presupuesto Promedio**: Valor promedio de los presupuestos
- **Leads Esta Semana**: Leads generados en los últimos 7 días

### Análisis
- **Por Estado**: Distribución de leads según su estado (ganado, perdido, etc.)
- **Por Categoría**: Distribución según la fase del embudo
- **Top Destinos**: Destinos más solicitados
- **Por Asesor**: Distribución de leads entre asesores
- **Por Fuente**: Rendimiento de cada canal de marketing

## 🔄 Actualización de Datos

Los datos se actualizan cada vez que:
- Se carga la página
- Se hace click en el botón "Actualizar"

Para implementar actualización automática, considera agregar:
- Webhooks de Notion
- Polling cada X minutos
- WebSockets para updates en tiempo real

## 📝 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción
npm run start    # Servidor de producción
npm run lint     # Linter de código
```

## 🎨 Personalización

### Modificar Colores
Edita `tailwind.config.ts` para personalizar la paleta de colores.

### Agregar Nuevos KPIs
1. Actualiza `lib/notion.ts` → función `calculateLeadMetrics`
2. Actualiza `lib/types/notion.ts` → interface `LeadMetrics`
3. Agrega el componente visual en `components/`
4. Actualiza `components/Dashboard.tsx`

### Agregar Filtros
Implementa filtros en las API routes `/api/leads` y `/api/metrics`.

## 🐛 Troubleshooting

### Error: "fetch failed" o "EAI_AGAIN"
- Verifica tu conexión a internet
- Confirma que el token de Notion es válido
- Asegúrate de que la integración tiene acceso a la base de datos

### No se muestran datos
- Verifica que el Database ID es correcto
- Confirma que la base de datos tiene registros
- Revisa que los nombres de las propiedades coincidan

### Error de tipos TypeScript
- Ejecuta `npm install` para asegurar que todas las dependencias estén instaladas
- Verifica que `tsconfig.json` esté configurado correctamente

## 📄 Licencia

Este proyecto es privado y pertenece a ViajeXMundo.

## 🤝 Contribuir

Para contribuir al proyecto, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ para ViajeXMundo**
