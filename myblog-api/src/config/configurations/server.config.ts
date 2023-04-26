export interface ServerConfig {
  database: string;
  host: string;
  port: number;
  frontEndCallbackUrl: string;
  google: SocialLoginClient;
  jwtSecretKey: string;
}

interface SocialLoginClient {
  clientId: string;
  clientSecret: string;
}

function getServerConfig(): ServerConfig {
  return {
    database: process.env.DATABASE_URI,
    host: process.env.HOST,
    port: parseInt(process.env.PORT || '8888', 10),
    frontEndCallbackUrl: process.env.FRONT_END_CALLBACK_URL,
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    jwtSecretKey: process.env.JWT_SECRET_KEY
  };
}

export default getServerConfig;

export type ServerConfigs = ReturnType<typeof getServerConfig>;
