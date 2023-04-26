export interface ServerConfig {
  database: string;
  host: string;
  port: number;
  google: SocialLoginClients;
}

interface SocialLoginClients {
  clientId: string;
  clientSecret: string;
}

function getServerConfig(): ServerConfig {
  return {
    database: process.env.DATABASE_URI,
    host: process.env.HOST,
    port: parseInt(process.env.PORT || '8888', 10),
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  };
}

export default getServerConfig;

export type ServerConfigs = ReturnType<typeof getServerConfig>;
