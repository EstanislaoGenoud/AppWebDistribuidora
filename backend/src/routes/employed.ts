import { Router } from "express";
import * as employedController from "../controllers/employedControllers";

const router = Router();

/**
 * @swagger
 * /api/employed:
 *   get:
 *     summary: Obtiene todos los empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "EMP-001"
 *                   nombre:
 *                     type: string
 *                     example: "Carlos"
 *                   apellido:
 *                     type: string
 *                     example: "Rodríguez"
 *                   puesto:
 *                     type: string
 *                     example: "Vendedor"
 *                   salario:
 *                     type: number
 *                     example: 2500000
 *                   fechaContratacion:
 *                     type: string
 *                     format: date
 *                     example: "2023-05-10"
 *       500:
 *         description: Error del servidor
 */
router.get('/', employedController.getAllEmployed);

/**
 * @swagger
 * /api/employed/{id}:
 *   get:
 *     summary: Obtiene un empleado por ID
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado encontrado
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', employedController.getEmployed);

/**
 * @swagger
 * /api/employed:
 *   post:
 *     summary: Crea un nuevo empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - apellido
 *               - puesto
 *               - salario
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Ana"
 *               apellido:
 *                 type: string
 *                 example: "Martínez"
 *               puesto:
 *                 type: string
 *                 example: "Administradora"
 *               salario:
 *                 type: number
 *                 example: 3000000
 *               fechaContratacion:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-15"
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', employedController.createEmployed);

/**
 * @swagger
 * /api/employed/{id}:
 *   put:
 *     summary: Actualiza un empleado
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Ana"
 *               apellido:
 *                 type: string
 *                 example: "Martínez"
 *               puesto:
 *                 type: string
 *                 example: "Gerente"
 *               salario:
 *                 type: number
 *                 example: 3500000
 *               fechaContratacion:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-15"
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', employedController.updateEmployed);

/**
 * @swagger
 * /api/employed/{id}:
 *   delete:
 *     summary: Elimina un empleado
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado eliminado exitosamente
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', employedController.deleteEmployed);

export default router;