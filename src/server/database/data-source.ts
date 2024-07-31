import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "api_typescript",
  synchronize: true,
  logging: true,
  entities: ["src/server/database/entity/*.ts"],
  subscribers: [],
  migrations: [],
})