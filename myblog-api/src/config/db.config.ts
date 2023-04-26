export interface ServerConfig {
  database: string;
}

const getServerConfig = (): ServerConfig => {
  return {
    database: process.env.DATABASE_URI
  };
};

export default getServerConfig;

export type ServerConfigs = ReturnType<typeof getServerConfig>;
