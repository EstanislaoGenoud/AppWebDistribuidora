import { Router } from "express";
import * as salesDetailesControllers from '../controllers/salesDetailesControllers';
const router = Router();

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Obtiene todos los detalles de ventas
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de ventas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "VEN-001"
 *                   idVenta:
 *                     type: string
 *                     example: "VEN-001"
 *                   idProducto:
 *                     type: string
 *                     example: "PROD-001"
 *                   cantidad:
 *                     type: number
 *                     example: 2
 *                   precioUnitario:
 *                     type: number
 *                     example: 4500000
 *                   subtotal:
 *                     type: number
 *                     example: 9000000
 *       500:
 *         description: Error del servidor
 */
router.get('/', salesDetailesControllers.getAllSalesDetailes);

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Obtiene un detalle de venta por ID
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del detalle de venta
 *     responses:
 *       200:
 *         description: Venta encontrada
 *       404:
 *         description: Venta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', salesDetailesControllers.getSalesDetailes);

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Crea un nuevo detalle de venta
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idVenta
 *               - idProducto
 *               - cantidad
 *               - precioUnitario
 *             properties:
 *               idVenta:
 *                 type: string
 *                 example: "VEN-001"
 *               idProducto:
 *                 type: string
 *                 example: "PROD-002"
 *               cantidad:
 *                 type: number
 *                 example: 3
 *               precioUnitario:
 *                 type: number
 *                 example: 350000
 *               subtotal:
 *                 type: number
 *                 example: 1050000
 *     responses:
 *       201:
 *         description: Venta creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', salesDetailesControllers.createSalesDetailes);

/**
 * @swagger
 * /api/sales/{id}:
 *   delete:
 *     summary: Elimina un detalle de venta
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del detalle de venta
 *     responses:
 *       200:
 *         description: Venta eliminada exitosamente
 *       404:
 *         description: Venta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', salesDetailesControllers.deleteSalesDetailes);

export default router;