import { Router } from "express";
import * as accountProviderController from "../controllers/accountProviderControllers";

const router = Router();

/**
 * @swagger
 * /api/accountProviders:
 *   get:
 *     summary: Obtiene todas las cuentas de proveedores
 *     tags: [Cuentas de Proveedores]
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
 *                   legajoProv:
 *                     type: string
 *                     example: "PROV-001"
 *                   saldoPendiente:
 *                     type: number
 *                     example: 3500.75
 *                   formaPago:
 *                     type: string
 *                     example: "Transferencia"
 *                   estado:
 *                     type: string
 *                     example: "Pendiente"
 *       500:
 *         description: Error del servidor
 */
router.get('/', accountProviderController.getAllAccountProvider);

/**
 * @swagger
 * /api/accountProviders/{legajoProv}:
 *   get:
 *     summary: Obtiene una cuenta de proveedor por legajo
 *     tags: [Cuentas de Proveedores]
 *     parameters:
 *       - in: path
 *         name: legajoProv
 *         schema:
 *           type: string
 *         required: true
 *         description: Legajo del proveedor
 *     responses:
 *       200:
 *         description: Cuenta encontrada
 *       404:
 *         description: Cuenta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/:legajoProv', accountProviderController.getAccountProvider);

/**
 * @swagger
 * /api/accountProviders:
 *   post:
 *     summary: Crea una nueva cuenta de proveedor
 *     tags: [Cuentas de Proveedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - legajoProv
 *               - saldoPendiente
 *             properties:
 *               legajoProv:
 *                 type: string
 *                 example: "PROV-001"
 *               saldoPendiente:
 *                 type: number
 *                 example: 0.0
 *               formaPago:
 *                 type: string
 *                 example: "Efectivo"
 *               estado:
 *                 type: string
 *                 example: "Pagado"
 *     responses:
 *       201:
 *         description: Cuenta creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', accountProviderController.createAccountProvider);

/**
 * @swagger
 * /api/accountProviders/{legajoProv}:
 *   put:
 *     summary: Actualiza una cuenta de proveedor
 *     tags: [Cuentas de Proveedores]
 *     parameters:
 *       - in: path
 *         name: legajoProv
 *         schema:
 *           type: string
 *         required: true
 *         description: Legajo del proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               saldoPendiente:
 *                 type: number
 *                 example: 2500.0
 *               formaPago:
 *                 type: string
 *                 example: "Cheque"
 *               estado:
 *                 type: string
 *                 example: "Pagado"
 *     responses:
 *       200:
 *         description: Cuenta actualizada exitosamente
 *       404:
 *         description: Cuenta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/:legajoProv', accountProviderController.updateAccountProvider);

/**
 * @swagger
 * /api/accountProviders/{legajoProv}:
 *   delete:
 *     summary: Elimina una cuenta de proveedor
 *     tags: [Cuentas de Proveedores]
 *     parameters:
 *       - in: path
 *         name: legajoProv
 *         schema:
 *           type: string
 *         required: true
 *         description: Legajo del proveedor
 *     responses:
 *       200:
 *         description: Cuenta eliminada exitosamente
 *       404:
 *         description: Cuenta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete('/:legajoProv', accountProviderController.deleteAccountProvider);

export default router;