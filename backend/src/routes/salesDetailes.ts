import { Router } from "express";
import * as salesDetailesController from "../controllers/salesDetailesControllers";

const router = Router();

/**
 * @swagger
 * /api/salesDetailes:
 *   get:
 *     summary: Obtiene todos los detalles de ventas
 *     tags: [Detalles de Ventas]
 *     responses:
 *       200:
 *         description: Lista de detalles obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "DET-001"
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
router.get('/', salesDetailesController.getAllSalesDetailes);

/**
 * @swagger
 * /api/salesDetailes/{id}:
 *   get:
 *     summary: Obtiene un detalle de venta por ID
 *     tags: [Detalles de Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del detalle de venta
 *     responses:
 *       200:
 *         description: Detalle encontrado
 *       404:
 *         description: Detalle no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', salesDetailesController.getSalesDetailes);

/**
 * @swagger
 * /api/salesDetailes:
 *   post:
 *     summary: Crea un nuevo detalle de venta
 *     tags: [Detalles de Ventas]
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
 *                 example: "VEN-002"
 *               idProducto:
 *                 type: string
 *                 example: "PROD-003"
 *               cantidad:
 *                 type: number
 *                 example: 5
 *               precioUnitario:
 *                 type: number
 *                 example: 150000
 *               subtotal:
 *                 type: number
 *                 example: 750000
 *     responses:
 *       201:
 *         description: Detalle de venta creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', salesDetailesController.createSalesDetailes);

/**
 * @swagger
 * /api/salesDetailes/{id}:
 *   delete:
 *     summary: Elimina un detalle de venta
 *     tags: [Detalles de Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del detalle de venta
 *     responses:
 *       200:
 *         description: Detalle eliminado exitosamente
 *       404:
 *         description: Detalle no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', salesDetailesController.deleteSalesDetailes);

export default router;