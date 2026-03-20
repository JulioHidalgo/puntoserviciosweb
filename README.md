# PuntoServiciosWeb (Nuxt + Firebase)

Proyecto de sitio web de noticias y servicios con panel de administración y login de usuarios.

## 🧩 Descripción

Aplicación web basada en Nuxt 3 + TypeScript que permite:
- Mostrar noticias y servicios.
- Registro e inicio de sesión de usuarios con Firebase Authentication.
- Publicación y gestión de noticias por administradores.
- Comentarios por noticia (Firestore).
- Historial de noticias vistas por usuario (Firestore).
- Almacenamiento de imágenes en Firebase Storage.

## 🚀 Características principales

- Frontend SPA con SSR estático (generated) y rutas: `/`, `/blog`, `/blog/[id]`, `/admin`, `/login`, `/register`.
- Seguridad con middleware: `middleware/auth.ts` y `middleware/admin.ts`.
- CRUD básico de noticias solo para admin.
- Comentarios en tiempo real.
- Visualización de noticias recientes y más leídas.
- Estilos con Bootstrap 5 y componentes Vue reutilizables.

## 🧱 Tecnologías

- Nuxt 3
- Vue 3
- TypeScript
- Firebase (Auth, Firestore, Storage, Hosting)
- Bootstrap
- Swiper (carrusel)

## 📁 Estructura del proyecto

- `assets/` CSS e imágenes estáticas.
- `components/` componentes UI.
- `composables/` hooks personalizadas (`useAuth`, `useNews`, etc.).
- `pages/` rutas de Nuxt.
- `plugins/` inicialización de Firebase, Bootstrap y Swiper.
- `stores/` Pinia (auth, news).
- `firebase.json`, `firestore.rules`, `storage.rules` (config Firebase).

## 🛠️ Requisitos

- Node.js >= 18
- npm / pnpm / yarn
- Firebase CLI instalado (opcional para deploy): `npm install -g firebase-tools`

## ⚙️ Configuración inicial

1. Clonar repo

```bash
git clone <url-del-repo>
cd puntoserviciosweb
```

2. Instalar dependencias

```bash
npm install
# o pnpm install
yarn install
```

3. Copiar variables de entorno (si las usas)

Crea `.env` o `.env.local` con tu configuración Firebase (o usa `nuxt.config.ts` según tu setup):

```bash
NUXT_PUBLIC_FIREBASE_API_KEY="..."
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN="..."
NUXT_PUBLIC_FIREBASE_PROJECT_ID="..."
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET="..."
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
NUXT_PUBLIC_FIREBASE_APP_ID="..."
NUXT_PUBLIC_ADMIN_EMAILS="admin1@dominio.com,admin2@dominio.com"
```

4. Iniciar servidor

```bash
npm run dev
```

Abre `http://localhost:3000`.

## 🧪 Scripts útiles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Compilar
- `npm run generate` - Generar sitio estático
- `npm run preview` - Previsualizar build de producción

## 🔐 Administración y roles

Para tener permisos de admin en tu app, configura el correo:

- PowerShell:

```powershell
$env:NUXT_PUBLIC_ADMIN_EMAILS="admin1@dominio.com,admin2@dominio.com"
```

- Linux/macOS:

```bash
export NUXT_PUBLIC_ADMIN_EMAILS="admin1@dominio.com,admin2@dominio.com"
```

Después reinicia `npm run dev`. Inicia sesión con ese correo y entra a `/admin`.

En Firestore se guarda `users/{uid}` con `role: "admin"`.

## 🗂️ Estructura recomendada en Firestore

- `users/{uid}`: datos de usuario, role (`user|admin`)
- `news/{newsId}`: doc de noticia
- `comments/{commentId}`: comentario de noticia
- `users/{uid}/viewedNews/{newsId}`: noticias vistas

## ☁️ Despliegue Firebase (Hosting)

1. Generar estático:

```bash
npm run generate
```

2. Desplegar:

```bash
firebase deploy --only firestore:rules,storage,hosting
```

Archivos incluidos:
- `firebase.json`
- `firestore.rules`
- `storage.rules`

## 🧹 FAQ rápido

- `routes` principales:
  - `/` home
  - `/blog` listado noticias
  - `/blog/[id]` detalle noticia
  - `/admin` panel admin
  - `/login`, `/register`
- `middlewares`:
  - `auth`: protege rutas con sesión
  - `admin`: restringe panel admin

## 🤝 Contribuir

1. Fork
2. Branch: `feature/nombre`
3. PR con descripción

## 📄 Licencia

MIT

