import * as dotenv from "dotenv-safe";

dotenv.config();

interface Secrets {
  API_PORT: number;
  API_ENV: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_DATABASE: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
}

const secrets: Secrets = {
  API_PORT: Number(process.env.API_PORT) ?? 8080,
  API_ENV: process.env.API_ENV ?? "local",
  DB_HOST: process.env.DB_HOST ?? "localhost",
  DB_PORT: Number(process.env.DB_PORT) ?? 5432,
  DB_DATABASE: process.env.DB_DATABASE ?? "simple_task_manager",
  DB_USERNAME: process.env.DB_USERNAME ?? "admin",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "admin",
};

export default secrets;
