import http from 'http';
import { MongoClient } from 'mongodb';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 5000;

const DATABASE_URL = process.env.DATABASE_URL;
const mongoCLient = new MongoClient(DATABASE_URL);
let db;

try {
  await mongoCLient.connect();
  db = mongoCLient.db();
} catch (error) {
  console.log('Error: ', error);
  throw new Error(error);
}

const server = http.createServer(app);

server.listen(PORT, console.log(`Listening on port ${PORT}...`));

export default db;
