import 'reflect-metadata'
import { DataSource } from 'typeorm'
import secrets from './helpers/secrets'

export const ApiDataSource = new DataSource({
  type: 'postgres',
  host: secrets.DB_HOST ?? "localhost",
  port: secrets.DB_PORT ?? 5432,
  username: secrets.DB_USERNAME || "postgres",
  password: secrets.DB_PASSWORD || "postgres",
  database: secrets.DB_DATABASE || "simple_task_manager",
  synchronize: true,
  logging: secrets.API_ENV === 'local' ? true : false,
  entities: ["src/entities/*.ts"],
  migrations:  ["src/migrations/*.ts"],
})
