const configuration = () => ({
  app: {
    port: parseInt(process.env.PORT ?? '3001', 10)
  },
  database: {
    url: process.env.DATABASE_URL ?? 'postgresql://aurora:aurora@localhost:5432/aurora'
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET ?? 'change-me',
    accessTokenTtl: process.env.ACCESS_TOKEN_TTL ?? '900s',
    refreshTokenTtl: process.env.REFRESH_TOKEN_TTL ?? '7d'
  },
  services: {
    meili: {
      host: process.env.MEILISEARCH_HOST ?? 'http://localhost:7700',
      apiKey: process.env.MEILISEARCH_API_KEY ?? 'masterKey'
    }
  }
});

export default configuration;
