import db from '../config/db';
import { RowDataPacket } from 'mysql2';
interface Inventario extends RowDataPacket{
  idProduct:string;
  stockActual:number;
}