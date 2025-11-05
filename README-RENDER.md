# Guía de despliegue en Render

## 1. Estructura del repositorio
```
/
├─ .gitignore
├─ .nvmrc
├─ README-RENDER.md
├─ backend/
│  ├─ .env.example
│  ├─ index.js
│  ├─ package.json
│  └─ src/
│     └─ index.js
└─ frontend/
   ├─ .env.example
   ├─ package.json
   ├─ lib/
   │  └─ api.js
   └─ (resto del código Next.js)
```

## 2. Comandos para pruebas locales
- **Backend (JavaScript)**
  ```bash
  cd backend
  npm install
  npm start
  ```
- **Frontend (Next.js SSR)**
  ```bash
  cd frontend
  npm install
  npm run build
  npm start
  ```

## 3. Variables de entorno
- **Backend**
  - `PORT` (opcional, Render lo inyecta)
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `FRONTEND_ORIGIN` (URL pública del frontend en Render)
- **Frontend**
  - `NEXT_PUBLIC_API_URL` (URL pública del backend en Render)

## 4. Configuración en Render
### Backend (Web Service)
- Root Directory: `backend`
- Environment: Node
- Build Command: `npm install`
- Start Command: `npm start`
- Auto Deploy: Yes
- Variables: `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_ORIGIN` (y las adicionales que necesites)

### Frontend (Next.js SSR como Web Service)
- Root Directory: `frontend`
- Environment: Node
- Build Command: `npm install && npm run build`
- Start Command: `next start -p $PORT`
- Auto Deploy: Yes
- Variables: `NEXT_PUBLIC_API_URL`

## 5. Prueba rápida tras el despliegue
1. Abrir `https://TU_BACKEND.onrender.com/health` → debe responder `ok`.
2. Abrir el frontend publicado → confirmar que carga y consume el backend usando `NEXT_PUBLIC_API_URL`.

## 6. Solución de problemas
- **Error 502 o timeout**: asegúrate de que el backend utiliza `process.env.PORT` (ya configurado en `src/index.js`).
- **Errores CORS**: actualiza `FRONTEND_ORIGIN` con la URL real del frontend y vuelve a desplegar.
- **Errores 404 al recargar**: no aplica al SSR; si convirtieras a SPA, recuerda las reglas de rewrite.
- **Versión de Node incorrecta**: Render seguirá `.nvmrc` (`18`).
- **Variables faltantes**: añade las claves anteriores en Render y fuerza un deploy.

> Nota: La aplicación de frontend usa Next.js con componentes que dependen de `next/image`, por lo que se configuró el despliegue como servicio SSR estándar.
