export interface ServerConfig {
  database: string;
}

function getServerConfig(): ServerConfig {
  return {
    database: process.env.DATABASE_URI
  };
}

export default getServerConfig;

export type ServerConfigs = ReturnType<typeof getServerConfig>;
