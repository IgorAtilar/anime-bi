import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Anime, Genre, Theme, Review, Season } from '../entity';

dotenv.config();

const port = Number(process.env.DW_PORT);
const password = process.env.DW_PASSWORD;

export const ETLDataSource = new DataSource({
  port,
  password,
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [Anime, Genre, Theme, Season, Review],
  migrations: [],
  subscribers: [],
});
