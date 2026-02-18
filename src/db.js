import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "your_user",
  password: "your_password",
  database: "your_db_name"
});

export default db;
