# 🔧 Configuración de la Base de Datos de Notion

Esta guía te ayudará a verificar y ajustar tu base de datos de Notion para que funcione perfectamente con el dashboard de ViajeXMundo.

## 📊 Estructura Esperada de la Base de Datos

El dashboard espera que tu base de datos de Notion tenga las siguientes propiedades:

| Nombre de Propiedad | Tipo | Obligatorio | Descripción |
|---------------------|------|-------------|-------------|
| **Company** | Title | ✅ Sí | Nombre de la persona o empresa del lead |
| **Category** | Select | ✅ Sí | Fase del lead (Nuevo, Contactado, Cotizado, etc.) |
| **Status** | Status o Select | ✅ Sí | Estado final (Ganado, Perdido, En Proceso, etc.) |
| **Created by** | Person | ✅ Sí | Quién creó el registro |
| **Assigned to** | Person | ✅ Sí | Asesor asignado al lead |
| Email | Email | ⚪ Opcional | Email del lead |
| Phone | Phone o Text | ⚪ Opcional | Teléfono de contacto |
| Destination | Text | ⚪ Opcional | Destino deseado para el viaje |
| Budget | Number | ⚪ Opcional | Presupuesto estimado |
| Travel Date | Date | ⚪ Opcional | Fecha planeada de viaje |
| Source | Select | ⚪ Opcional | Fuente del lead (Facebook, Instagram, etc.) |
| Notes | Text | ⚪ Opcional | Notas adicionales |
| Travelers | Number | ⚪ Opcional | Número de viajeros |
| Priority | Select | ⚪ Opcional | Prioridad (Alta, Media, Baja) |

## 🔍 Nombres Alternativos Aceptados

El sistema busca automáticamente nombres en español e inglés:

- **Company**: También busca "Empresa", "Nombre"
- **Category**: También busca "Categoría", "Fase"
- **Status**: También busca "Estado"
- **Created by**: También busca "Creado por"
- **Assigned to**: También busca "Asignado a", "Asesor"
- **Phone**: También busca "Teléfono", "Telefono"
- **Destination**: También busca "Destino"
- **Budget**: También busca "Presupuesto"
- **Travel Date**: También busca "Fecha de Viaje"
- **Source**: También busca "Fuente", "Origen"
- **Notes**: También busca "Notas"
- **Travelers**: También busca "Viajeros"
- **Priority**: También busca "Prioridad"

## 📝 Valores Recomendados para Select

### Category (Categoría/Fase)
Valores sugeridos:
- Nuevo
- Contactado
- Cotizado
- Negociación
- Vendido

### Status (Estado)
Valores sugeridos:
- Ganado
- Perdido
- En Proceso
- Cancelado

### Source (Fuente)
Valores sugeridos:
- Facebook
- Instagram
- Sitio Web
- Referido
- Google
- WhatsApp
- Otro

### Priority (Prioridad)
Valores sugeridos:
- Alta
- Media
- Baja

## ✅ Verificar tu Base de Datos

1. Abre tu base de datos de Notion
2. Click en el menú "..." (arriba a la derecha)
3. Selecciona "Properties" o "Propiedades"
4. Verifica que tengas las propiedades obligatorias:
   - Company (o Nombre)
   - Category (o Categoría)
   - Status (o Estado)
   - Created by (o Creado por)
   - Assigned to (o Asignado a)

## 🔧 Ajustar tu Base de Datos

Si tu base de datos usa nombres diferentes:

### Opción 1: Renombrar Propiedades (Recomendado)
1. Click derecho en el encabezado de la columna
2. Selecciona "Rename"
3. Usa uno de los nombres esperados

### Opción 2: Modificar el Código
Si prefieres mantener tus nombres actuales, puedes modificar `lib/notion.ts`:

```typescript
// En la función notionPageToLead, actualiza las líneas:
company: extractPropertyValue(props["TU_NOMBRE_AQUI"]),
category: extractPropertyValue(props["TU_NOMBRE_AQUI"]),
// etc...
```

## 🎨 Configurar Opciones de Select

Para que los gráficos se vean mejor:

1. Ve a tu base de datos en Notion
2. Click en el encabezado de una columna Select
3. Click en "Edit property"
4. Agrega o edita las opciones según las recomendaciones arriba
5. Asigna colores a cada opción para mejor visualización

## 🧪 Probar la Conexión

Una vez que hayas configurado todo:

1. Asegúrate de tener algunos registros de ejemplo en tu base de datos
2. Despliega la aplicación en Railway
3. Abre el dashboard
4. Verifica que los datos se muestren correctamente

Si ves "N/A" o campos vacíos:
- Verifica que los nombres de las propiedades sean correctos
- Asegúrate de que los registros tengan datos en esos campos
- Revisa los logs en Railway para errores específicos

## 📊 Datos de Ejemplo

Para probar el dashboard, te recomiendo tener al menos 10-15 registros con:

- Variedad de estados (algunos ganados, algunos perdidos, algunos en proceso)
- Diferentes categorías/fases
- Múltiples asesores asignados
- Varios destinos
- Diferentes fuentes de leads

Esto te permitirá ver todas las visualizaciones y KPIs funcionando.

## 🔄 Migración de Datos Existentes

Si ya tienes datos en otro formato:

1. **Desde Excel/CSV**:
   - Importa a Notion usando "Import" → "CSV"
   - Mapea las columnas a las propiedades correctas

2. **Desde otro CRM**:
   - Exporta los datos a CSV
   - Sigue el proceso anterior

3. **Entrada Manual**:
   - Crea plantillas en Notion para agilizar
   - Usa duplicación de registros para datos similares

## 🚨 Problemas Comunes

### "No se pueden cargar las métricas"
- Verifica que la integración tenga acceso a la base de datos
- Confirma que el Database ID sea correcto
- Revisa que al menos un registro exista

### Gráficos vacíos o con errores
- Asegúrate de que los campos Select tengan opciones configuradas
- Verifica que haya datos en esos campos
- Confirma que los nombres de propiedades coincidan

### Datos faltantes
- Revisa que los tipos de datos sean correctos
- Verifica que los registros tengan valores en esos campos
- Confirma que no haya errores de permisos en Notion

## 📞 Soporte

Si sigues teniendo problemas:

1. Revisa los logs de Railway para errores específicos
2. Verifica la estructura en Notion paso a paso
3. Asegúrate de que la integración tenga los permisos correctos
4. Contacta al equipo de desarrollo con capturas de pantalla

---

**Tip**: Una buena práctica es mantener la base de datos actualizada en tiempo real para que el dashboard siempre muestre información precisa.
