import mysql from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_PORT, DB_PASSWORD, DB_DATABASE, DB_USER } = process.env;

const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,  
  port: DB_PORT,        
  password: DB_PASSWORD,          
  database: DB_DATABASE 
});

export default db;
//RESTful Four
