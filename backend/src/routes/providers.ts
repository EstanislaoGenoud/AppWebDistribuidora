import { Router } from "express";
import * as providerController from "../controllers/providerControllers";

const router = Router();

/**
 * @swagger
 * /api/providers:
 *   get:
 *     summary: Obtiene todos los proveedores
 *     tags: [Proveedores]
 *     responses:
 *       200:
 *         description: Lista de proveedores obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "PROV-001"
 *                   nombre:
 *                     type: string
 *                     example: "Distribuidora XYZ S.A.S."
 *                   contacto:
 *                     type: string
 *                     example: "Luis Martinez"
 *                   telefono:
 *                     type: string
 *                     example: "3001234567"
 *                   email:
 *                     type: string
 *                     example: "contacto@xyz.com"
 *                   direccion:
 *                     type: string
 *                     example: "Carrera 50 #25-30"
 *       500:
 *         description: Error del servidor
 */
router.get('/', providerController.getAllProviders);

/**
 * @swagger
 * /api/providers/{id}:
 *   get:
 *     summary: Obtiene un proveedor por ID
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del proveedor
 *     responses:
 *       200:
 *         description: Proveedor encontrado
 *       404:
 *         description: Proveedor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', providerController.getProvider);

/**
 * @swagger
 * /api/providers:
 *   post:
 *     summary: Crea un nuevo proveedor
 *     tags: [Proveedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - telefono
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Tecnología Avanzada Ltda."
 *               contacto:
 *                 type: string
 *                 example: "Ana Ramírez"
 *               telefono:
 *                 type: string
 *                 example: "3109876543"
 *               email:
 *                 type: string
 *                 example: "ventas@tecnologia.com"
 *               direccion:
 *                 type: string
 *                 example: "Calle 80 #15-45"
 *     responses:
 *       201:
 *         description: Proveedor creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', providerController.createProvider);

/**
 * @swagger
 * /api/providers/{id}:
 *   put:
 *     summary: Actualiza un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Tecnología Avanzada Ltda."
 *               contacto:
 *                 type: string
 *                 example: "Pedro Gómez"
 *               telefono:
 *                 type: string
 *                 example: "3109876543"
 *               email:
 *                 type: string
 *                 example: "ventas@tecnologia.com"
 *               direccion:
 *                 type: string
 *                 example: "Calle 80 #15-45"
 *     responses:
 *       200:
 *         description: Proveedor actualizado exitosamente
 *       404:
 *         description: Proveedor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', providerController.updateProvider);

/**
 * @swagger
 * /api/providers/{id}:
 *   delete:
 *     summary: Elimina un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del proveedor
 *     responses:
 *       200:
 *         description: Proveedor eliminado exitosamente
 *       404:
 *         description: Proveedor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', providerController.deleteProvider);

export default router;