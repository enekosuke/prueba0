# Aurora Shop

Plataforma ecommerce full-stack moderna con monorepo pnpm. Incluye frontend Next.js 14 (App Router), backend NestJS + Prisma, infraestructura Docker y paquetes compartidos.

## Requisitos

- Node.js 20 (usa `.nvmrc`).
- pnpm 8.15.
- Docker + Docker Compose.

## Instalación

```bash
pnpm install
```

## Entorno

Copia los ejemplos de variables:

```bash
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
```

## Desarrollo local

1. Levanta servicios base (PostgreSQL, Redis, Meilisearch, MinIO, Maildev):
   ```bash
   pnpm dev:services
   ```
2. Aplica migraciones Prisma y seed:
   ```bash
   cd apps/api
   pnpm prisma migrate deploy
   pnpm seed
   cd ../..
   ```
3. Ejecuta frontend y backend en paralelo:
   ```bash
   pnpm dev
   ```
   - API NestJS: http://localhost:3001/api
   - Swagger: http://localhost:3001/api/docs
   - GraphQL playground: http://localhost:3001/graphql
   - Frontend Next.js: http://localhost:3000

Para detener servicios auxiliares:
```bash
pnpm dev:down
```

## Scripts principales

- `pnpm build`: compila todos los paquetes.
- `pnpm lint`: ejecuta ESLint en workspaces.
- `pnpm test`: ejecuta tests (Jest + Vitest).
- `pnpm format`: comprueba formato con Prettier.
- `pnpm seed`: ejecuta seeding Prisma (desde `/apps/api`).

## Infraestructura

`infrastructure/docker-compose.yml` incluye PostgreSQL, Redis, Meilisearch, Maildev y MinIO listos para desarrollo.

## Documentación adicional

- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [docs/adr](./docs/adr) para decisiones arquitectónicas (pendientes de expansión).

## Estado actual

El repositorio proporciona base funcional: catálogo consultable vía REST/GraphQL, seed realista con productos y categorías, frontend con hero, carrusel, PDP y vistas de carrito/checkout. El carrito soporta ahora persistencia local, cupones, actualización de cantidades y API unificada REST/GraphQL. Faltan integraciones reales de pago y envíos, listas para conectar mediante variables de entorno.
