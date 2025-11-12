import { Router } from "express";
import * as inventoryController from "../controllers/inventoryControllers";

const router = Router();

/**
 * @swagger
 * /api/inventories:
 *   get:
 *     summary: Obtiene todo el inventario
 *     tags: [Inventarios]
 *     responses:
 *       200:
 *         description: Lista de inventario obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "INV-001"
 *                   idProducto:
 *                     type: string
 *                     example: "PROD-001"
 *                   cantidad:
 *                     type: number
 *                     example: 150
 *                   ubicacion:
 *                     type: string
 *                     example: "Bodega A - Estante 3"
 *                   fechaActualizacion:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-01-20T10:30:00Z"
 *       500:
 *         description: Error del servidor
 */
router.get('/', inventoryController.getAllInventory);

/**
 * @swagger
 * /api/inventories/{id}:
 *   get:
 *     summary: Obtiene un registro de inventario por ID
 *     tags: [Inventarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del inventario
 *     responses:
 *       200:
 *         description: Registro de inventario encontrado
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', inventoryController.getInventory);

/**
 * @swagger
 * /api/inventories:
 *   post:
 *     summary: Crea un nuevo registro de inventario
 *     tags: [Inventarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idProducto
 *               - cantidad
 *             properties:
 *               idProducto:
 *                 type: string
 *                 example: "PROD-001"
 *               cantidad:
 *                 type: number
 *                 example: 200
 *               ubicacion:
 *                 type: string
 *                 example: "Bodega B - Estante 5"
 *               fechaActualizacion:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-20T10:30:00Z"
 *     responses:
 *       201:
 *         description: Inventario creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', inventoryController.createInventory);

/**
 * @swagger
 * /api/inventories/{id}:
 *   put:
 *     summary: Actualiza un registro de inventario
 *     tags: [Inventarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del inventario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idProducto:
 *                 type: string
 *                 example: "PROD-001"
 *               cantidad:
 *                 type: number
 *                 example: 180
 *               ubicacion:
 *                 type: string
 *                 example: "Bodega A - Estante 2"
 *               fechaActualizacion:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-21T14:20:00Z"
 *     responses:
 *       200:
 *         description: Inventario actualizado exitosamente
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', inventoryController.updateInventory);

/**
 * @swagger
 * /api/inventories/{id}:
 *   delete:
 *     summary: Elimina un registro de inventario
 *     tags: [Inventarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del inventario
 *     responses:
 *       200:
 *         description: Inventario eliminado exitosamente
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', inventoryController.deleteInventory);

export default router;