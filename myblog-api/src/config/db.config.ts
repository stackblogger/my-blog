export interface DbConfig {
  database: string;
}

export const dbConfig: DbConfig = {
  database: process.env.DATABASE
};
