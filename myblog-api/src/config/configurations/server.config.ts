export interface ServerConfig {
  database: string;
  host: string;
  port: number;
}

function getServerConfig(): ServerConfig {
  return {
    database: process.env.DATABASE_URI,
    host: process.env.HOST,
    port: parseInt(process.env.PORT || '8888', 10)
  };
}

export default getServerConfig;

export type ServerConfigs = ReturnType<typeof getServerConfig>;
