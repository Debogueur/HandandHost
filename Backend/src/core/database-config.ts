
import dotenv from 'dotenv';
import path from 'path';
import { DataSource } from "typeorm"
// Determine which env file to load
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env.development';

dotenv.config({
    path: path.resolve(process.cwd(), envFile)
});
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
      "src/entity/*.ts"
  ],
  synchronize: true,
  logging: false
});
