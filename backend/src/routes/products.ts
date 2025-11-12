import { Router } from 'express';
import * as productController from '../controllers/productControllers';

const router = Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "PROD-001"
 *                   nombre:
 *                     type: string
 *                     example: "Laptop Dell XPS 15"
 *                   descripcion:
 *                     type: string
 *                     example: "Laptop de alta gama para gaming"
 *                   precio:
 *                     type: number
 *                     example: 4500000
 *                   categoria:
 *                     type: string
 *                     example: "Electrónicos"
 *                   stock:
 *                     type: number
 *                     example: 25
 *       500:
 *         description: Error del servidor
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', productController.getProduct);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - precio
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Mouse Logitech G502"
 *               descripcion:
 *                 type: string
 *                 example: "Mouse gamer con sensor de alta precisión"
 *               precio:
 *                 type: number
 *                 example: 350000
 *               categoria:
 *                 type: string
 *                 example: "Periféricos"
 *               stock:
 *                 type: number
 *                 example: 50
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualiza un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Mouse Logitech G502"
 *               descripcion:
 *                 type: string
 *                 example: "Mouse gamer actualizado"
 *               precio:
 *                 type: number
 *                 example: 380000
 *               categoria:
 *                 type: string
 *                 example: "Periféricos"
 *               stock:
 *                 type: number
 *                 example: 45
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Elimina un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', productController.deleteProduct);

export default router;