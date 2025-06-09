import * as dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

async function testConnection(): Promise<void> {
  try{
    const connection=await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || '3306')
    });
    console.log('Conexión exitosa a la base de datos');
    const [rows] = await connection.query('SELECT NOW() AS fecha');

    const res= rows as { fecha: string }[];
    console.log('Hora actual en la DB:', res[0].fecha);
  } catch(error:any){
    console.error('Error de conexión a la base de datos:', error.message);
  }
}

testConnection();
