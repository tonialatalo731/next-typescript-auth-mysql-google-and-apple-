require("dotenv").config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 40,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Export a helper function to execute database queries
export async function query(sql: any, values: any) {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error: any, results: any) => {
      if (error) {
        return reject(error);
      }
      resolve([results]);
    });
  });
}

export default pool;