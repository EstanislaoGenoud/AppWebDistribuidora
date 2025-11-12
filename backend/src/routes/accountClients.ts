import { Router } from "express";
import * as accountClientController from "../controllers/accountClientControllers";

const router = Router();

/**
 * @swagger
 * /api/accountClients:
 *   get:
 *     summary: Obtiene todas las cuentas de clientes
 *     tags: [Cuentas de Clientes]
 *     responses:
 *       200:
 *         description: Lista de cuentas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idCliente:
 *                     type: string
 *                     example: "CLI-001"
 *                   saldo:
 *                     type: number
 *                     example: 1500.50
 *                   fechaUltimoPago:
 *                     type: string
 *                     format: date
 *                     example: "2024-01-15"
 *                   estado:
 *                     type: string
 *                     example: "Activo"
 *       500:
 *         description: Error del servidor
 */
router.get('/', accountClientController.getAllAccountClient);

/**
 * @swagger
 * /api/accountClients/{idCliente}:
 *   get:
 *     summary: Obtiene una cuenta de cliente por ID
 *     tags: [Cuentas de Clientes]
 *     parameters:
 *       - in: path
 *         name: idCliente
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cuenta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idCliente:
 *                   type: string
 *                 saldo:
 *                   type: number
 *                 fechaUltimoPago:
 *                   type: string
 *                   format: date
 *                 estado:
 *                   type: string
 *       404:
 *         description: Cuenta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/:idCliente', accountClientController.getAccountClient);

/**
 * @swagger
 * /api/accountClients:
 *   post:
 *     summary: Crea una nueva cuenta de cliente
 *     tags: [Cuentas de Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idCliente
 *               - saldo
 *             properties:
 *               idCliente:
 *                 type: string
 *                 example: "CLI-001"
 *               saldo:
 *                 type: number
 *                 example: 0.0
 *               estado:
 *                 type: string
 *                 example: "Activo"
 *     responses:
 *       201:
 *         description: Cuenta creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', accountClientController.createAccountClient);

/**
 * @swagger
 * /api/accountClients/{idCliente}:
 *   put:
 *     summary: Actualiza una cuenta de cliente
 *     tags: [Cuentas de Clientes]
 *     parameters:
 *       - in: path
 *         name: idCliente
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               saldo:
 *                 type: number
 *                 example: 2000.0
 *               estado:
 *                 type: string
 *                 example: "Inactivo"
 *               fechaUltimoPago:
 *                 type: string
 *                 format: date
 *                 example: "2024-02-01"
 *     responses:
 *       200:
 *         description: Cuenta actualizada exitosamente
 *       404:
 *         description: Cuenta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/:idCliente', accountClientController.updateAccountClient);

/**
 * @swagger
 * /api/accountClients/{idCliente}:
 *   delete:
 *     summary: Elimina una cuenta de cliente
 *     tags: [Cuentas de Clientes]
 *     parameters:
 *       - in: path
 *         name: idCliente
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cuenta eliminada exitosamente
 *       404:
 *         description: Cuenta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete('/:idCliente', accountClientController.deleteAccountClient);

export default router;