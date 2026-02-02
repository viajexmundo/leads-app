# 🚀 Guía de Deployment en Railway

Esta guía te llevará paso a paso para desplegar el dashboard de ViajeXMundo en Railway.

## 📋 Pre-requisitos

Antes de comenzar, asegúrate de tener:

- ✅ Cuenta en [Railway.app](https://railway.app)
- ✅ Repositorio de GitHub con el código
- ✅ Token de integración de Notion
- ✅ Database ID de Notion

## 🎯 Paso 1: Preparar Railway

1. Ve a [railway.app](https://railway.app) e inicia sesión
2. Click en **"New Project"**
3. Selecciona **"Deploy from GitHub repo"**
4. Autoriza a Railway para acceder a tus repositorios de GitHub
5. Selecciona el repositorio `leads-app`

## ⚙️ Paso 2: Configurar Variables de Entorno

Una vez que el proyecto esté creado en Railway:

1. Click en tu proyecto
2. Ve a la pestaña **"Variables"**
3. Agrega las siguientes variables de entorno:

```
NOTION_API_KEY=tu_token_de_notion_aqui
NOTION_DATABASE_ID=tu_database_id_aqui
```

**⚠️ Importante**: Reemplaza estos valores con tus credenciales reales de Notion. Railway las mantendrá seguras.

## 🔨 Paso 3: Configurar el Build

Railway detectará automáticamente que es un proyecto Next.js. No necesitas configurar nada adicional, pero verifica que:

1. **Build Command**: `npm run build` (automático)
2. **Start Command**: `npm run start` (automático)
3. **Install Command**: `npm install` (automático)

Si necesitas cambiar algo:
- Ve a **Settings** → **Build & Deploy**
- Ajusta los comandos según sea necesario

## 🌐 Paso 4: Deploy

1. Railway comenzará el deployment automáticamente
2. Espera a que termine (puede tomar 2-3 minutos)
3. Verás un log en tiempo real del proceso
4. Cuando termine, verás **"Success"**

## 🔗 Paso 5: Obtener la URL

1. Ve a la pestaña **"Settings"**
2. En la sección **"Domains"**, verás tu URL de Railway
3. Si quieres un dominio personalizado:
   - Click en **"Generate Domain"**
   - O agrega un dominio personalizado

Tu aplicación estará disponible en algo como:
```
https://leads-app-production.up.railway.app
```

## ✅ Paso 6: Verificar el Deployment

1. Abre la URL de tu aplicación
2. Deberías ver el dashboard de ViajeXMundo
3. Verifica que los datos de Notion se carguen correctamente
4. Si hay errores, revisa los logs en Railway

## 📊 Monitoreo y Logs

Para ver los logs de tu aplicación:

1. Click en tu proyecto en Railway
2. Ve a la pestaña **"Deployments"**
3. Click en el deployment activo
4. Verás los logs en tiempo real

## 🔄 Deployments Automáticos

Railway está configurado para hacer deploy automático cuando:

- Haces push a la rama principal (main/master)
- O cualquier rama que hayas configurado

Para cambiar esto:
1. Ve a **Settings** → **Build & Deploy**
2. En **"Deploy Triggers"**, configura las ramas

## 🐛 Troubleshooting

### Error: "Application failed to respond"
- Verifica que las variables de entorno estén correctas
- Revisa los logs para ver errores específicos
- Asegúrate de que el token de Notion sea válido

### Error: "Build failed"
- Verifica que `package.json` esté completo
- Revisa que todas las dependencias estén instaladas
- Comprueba los logs de build para errores de TypeScript

### Los datos no se cargan
- Verifica que `NOTION_DATABASE_ID` sea correcto
- Confirma que la integración de Notion tenga acceso a la base de datos
- Revisa los logs de API en Railway

### Error 500 en las APIs
- Verifica que las variables de entorno estén configuradas
- Revisa los logs del servidor
- Confirma que la base de datos de Notion existe y es accesible

## 🔐 Seguridad

- ✅ Nunca compartas tu `NOTION_API_KEY` públicamente
- ✅ Las variables de entorno en Railway están encriptadas
- ✅ Railway usa HTTPS automáticamente
- ✅ Considera agregar autenticación si es necesario

## 🎨 Personalización

### Cambiar el nombre del servicio
1. Ve a **Settings**
2. En **"Service Name"**, cambia el nombre
3. El nuevo nombre se reflejará en la URL

### Agregar dominio personalizado
1. Ve a **Settings** → **"Domains"**
2. Click en **"Custom Domain"**
3. Sigue las instrucciones para configurar DNS

## 📈 Escalabilidad

Railway escala automáticamente según el uso. Para monitorear:

1. Ve a **"Metrics"** en tu proyecto
2. Verás CPU, memoria y uso de red
3. Railway ajustará recursos automáticamente

## 💰 Costos

- Railway ofrece un plan gratuito con $5 de crédito mensual
- El dashboard consumirá recursos mínimos
- Monitorea tu uso en **"Usage"**

## 🔄 Actualizaciones

Para actualizar tu aplicación:

1. Haz cambios en tu código local
2. Commit y push a GitHub:
   ```bash
   git add .
   git commit -m "Tu mensaje"
   git push
   ```
3. Railway detectará el cambio y desplegará automáticamente

## 📞 Soporte

Si necesitas ayuda:
- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Issues: Crea un issue en tu repositorio

---

## ✨ Checklist Final

Antes de considerar el deployment completo:

- [ ] La aplicación carga sin errores
- [ ] Los datos de Notion se muestran correctamente
- [ ] Todos los KPIs funcionan
- [ ] Los gráficos se renderizan bien
- [ ] La aplicación es responsiva en mobile
- [ ] Los logs no muestran errores críticos
- [ ] Las variables de entorno están configuradas
- [ ] El dominio está configurado (opcional)

## 🎉 ¡Listo!

Tu dashboard de ViajeXMundo ahora está en producción y accesible desde cualquier lugar. Los datos se sincronizarán automáticamente desde Notion cada vez que se cargue la página.

**URL del Dashboard**: [Tu URL de Railway]

---

**Desarrollado con ❤️ para ViajeXMundo**
