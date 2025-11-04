# Guía de Contribución

## Requisitos previos

- Node.js v20 (usa `.nvmrc` para alinear versiones).
- pnpm v8.
- Docker y Docker Compose.

## Flujo de trabajo

1. Crea un fork del repositorio y clona tu copia.
2. Instala dependencias con `pnpm install`.
3. Lanza los servicios de desarrollo con `pnpm dev`.
4. Ejecuta las pruebas y linters (`pnpm test`, `pnpm lint`).
5. Asegúrate de que tus cambios sigan las guías de estilo y que la documentación esté actualizada.
6. Crea un Pull Request describiendo claramente la motivación del cambio y cómo probarlo.

## Estilo de código

- Sigue las reglas de ESLint y Prettier incluidas en el paquete `@aurora/config`.
- Usa TypeScript en todo el código nuevo.
- Incluye tests unitarios/integración cuando corresponda.

## Commits

- Usa commits descriptivos respetando Conventional Commits.
- Evita mezclar cambios no relacionados en el mismo PR.

## Código de conducta

Al contribuir aceptas cumplir el [Código de Conducta](./CODE_OF_CONDUCT.md).

