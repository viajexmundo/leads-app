# ⚡ Guía Rápida - ViajeXMundo Dashboard

## 🎯 Próximos Pasos

Ya tienes todo el código listo y subido a GitHub. Ahora sigue estos pasos para tener tu dashboard en producción:

### 1️⃣ Verificar Notion (5 minutos)

✅ Ya tienes:
- Token de integración de Notion
- Database ID de tu base de datos
- Integración conectada a tu base de datos

📝 Verifica que tu base de datos tenga:
- Al menos las columnas: **Company**, **Category**, **Status**
- Algunos registros de ejemplo para testear

👉 **Ver detalles**: `NOTION_SETUP.md`

---

### 2️⃣ Deploy en Railway (10 minutos)

1. Ve a [railway.app](https://railway.app) e inicia sesión
2. Click en **"New Project"** → **"Deploy from GitHub repo"**
3. Selecciona el repositorio `leads-app`
4. Agrega las variables de entorno:
   ```
   NOTION_API_KEY=tu_token_de_notion_aqui
   NOTION_DATABASE_ID=tu_database_id_aqui
   ```
   (Usa tus credenciales reales de Notion)
5. Railway detectará Next.js automáticamente y hará el build
6. Espera 2-3 minutos y ¡listo! 🎉

👉 **Ver detalles**: `DEPLOYMENT.md`

---

### 3️⃣ Probar el Dashboard (2 minutos)

1. Abre la URL que te dio Railway (ej: `https://leads-app-production.up.railway.app`)
2. Deberías ver:
   - ✅ KPIs principales (total leads, conversión, presupuesto, etc.)
   - ✅ Gráficos de distribución por estado y categoría
   - ✅ Top destinos solicitados
   - ✅ Leads por asesor y fuente

Si algo no funciona:
- Revisa los logs en Railway
- Verifica que las variables de entorno estén bien
- Confirma que la integración de Notion tenga acceso

---

## 📊 ¿Qué incluye el Dashboard?

### KPIs Principales
- 📈 Total de Leads
- 💹 Tasa de Conversión (% ganados)
- 💰 Presupuesto Promedio
- 📅 Leads Esta Semana

### Visualizaciones
- 🥧 Gráfico de distribución por estado (pie chart)
- 📊 Gráfico de leads por categoría (bar chart)
- 🌍 Top 10 destinos más solicitados
- 👥 Leads por asesor
- 📱 Leads por fuente de marketing

### Funcionalidades
- 🔄 Actualización en tiempo real desde Notion
- 📱 Diseño responsivo (mobile, tablet, desktop)
- 🎨 UI moderna con Tailwind CSS
- ⚡ Rápido y optimizado

---

## 🛠️ Stack Tecnológico

```
Frontend:
├── Next.js 15 (App Router)
├── TypeScript
├── Tailwind CSS
└── Recharts

Backend:
├── Next.js API Routes
└── @notionhq/client

Deployment:
└── Railway
```

---

## 📁 Estructura del Proyecto

```
leads-app/
├── app/                      # Páginas y API routes
│   ├── api/
│   │   ├── leads/           # GET /api/leads
│   │   ├── metrics/         # GET /api/metrics
│   │   └── notion-test/     # GET /api/notion-test
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página principal
│   └── globals.css          # Estilos globales
│
├── components/              # Componentes React
│   ├── Dashboard.tsx        # Dashboard principal
│   ├── MetricsGrid.tsx      # Grid de KPIs
│   ├── StatsCard.tsx        # Tarjeta de estadística
│   ├── LeadsByStatusChart.tsx
│   ├── LeadsByCategoryChart.tsx
│   └── TopDestinationsTable.tsx
│
├── lib/                     # Lógica de negocio
│   ├── notion.ts           # Cliente y funciones de Notion
│   └── types/
│       └── notion.ts       # Tipos TypeScript
│
├── .env.local              # Variables de entorno (no en git)
├── .env.example            # Template de variables
├── README.md               # Documentación principal
├── DEPLOYMENT.md           # Guía de deployment
├── NOTION_SETUP.md         # Configuración de Notion
└── railway.json            # Config de Railway
```

---

## 🎨 Personalización Futura

Ideas para mejorar el dashboard:

1. **Filtros Avanzados**
   - Filtrar por rango de fechas
   - Filtrar por estado/categoría
   - Búsqueda por nombre/email

2. **Más Visualizaciones**
   - Gráfico de tendencia temporal
   - Embudo de conversión animado
   - Mapa de leads por ubicación

3. **Exportación**
   - Exportar a PDF
   - Exportar a Excel
   - Enviar reportes por email

4. **Tiempo Real**
   - Webhooks de Notion
   - Updates automáticos cada X minutos
   - Notificaciones de nuevos leads

5. **Autenticación**
   - Login para proteger el dashboard
   - Roles (admin, asesor, viewer)
   - Logs de actividad

---

## 🚀 Comandos Útiles

```bash
# Desarrollo local
npm run dev              # Servidor de desarrollo (localhost:3000)

# Testing
node test-notion.js      # Probar conexión con Notion

# Producción
npm run build           # Construir para producción
npm run start           # Servidor de producción

# Git
git status              # Ver cambios
git add .               # Agregar cambios
git commit -m "msg"     # Crear commit
git push                # Subir a GitHub
```

---

## 📞 Soporte

**Documentación**:
- `README.md` - Guía general
- `DEPLOYMENT.md` - Deploy en Railway
- `NOTION_SETUP.md` - Configurar Notion

**APIs**:
- Notion API Docs: https://developers.notion.com
- Next.js Docs: https://nextjs.org/docs
- Railway Docs: https://docs.railway.app

---

## ✅ Checklist Final

Antes de considerar el proyecto completado:

- [ ] La app está desplegada en Railway
- [ ] Los datos de Notion se cargan correctamente
- [ ] Todos los KPIs funcionan
- [ ] Los gráficos se muestran bien
- [ ] Probado en mobile y desktop
- [ ] El dominio está configurado (opcional)
- [ ] El equipo sabe cómo usar el dashboard
- [ ] Los asesores pueden ver sus leads

---

## 🎉 ¡Listo!

Tu dashboard de ViajeXMundo está completo y listo para usar.

**Lo que tienes ahora**:
- ✅ Código completo en GitHub
- ✅ Integración con Notion funcionando
- ✅ Dashboard con KPIs y gráficos
- ✅ Documentación completa
- ✅ Listo para deploy en Railway

**Siguiente paso**: Despliega en Railway y comparte el link con tu equipo 🚀

---

**Desarrollado con ❤️ para ViajeXMundo**
