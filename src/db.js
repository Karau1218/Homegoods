import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",          
  password: "Passion1218!",          
  database: "Homegoods" 
});

export default db;
// RESTful Four