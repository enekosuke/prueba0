# ADR 0001: Arquitectura base de Aurora Shop

## Contexto

El proyecto requiere una plataforma ecommerce modular con frontend moderno, backend escalable y servicios de soporte (cache, búsqueda, colas).

## Decisión

- Monorepo con pnpm workspaces.
- Frontend Next.js 14 App Router con Tailwind y shadcn/ui.
- Backend NestJS con Prisma y PostgreSQL.
- Servicios auxiliares: Redis (colas/cache), Meilisearch (búsqueda), MinIO (media), Maildev (emails de prueba).

## Consecuencias

- Desarrollo coordinado con paquetes compartidos (`@aurora/ui`, `@aurora/utils`, `@aurora/schemas`).
- Despliegue desacoplado (Vercel para web, Fly.io/Render para API).
- Aumenta la complejidad inicial pero ofrece consistencia y escalabilidad a largo plazo.
