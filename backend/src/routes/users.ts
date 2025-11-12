import { Router } from "express";
import * as userController from "../controllers/usersControllers";

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "USR-001"
 *                   username:
 *                     type: string
 *                     example: "admin"
 *                   email:
 *                     type: string
 *                     example: "admin@distribuidora.com"
 *                   rol:
 *                     type: string
 *                     example: "Administrador"
 *                   activo:
 *                     type: boolean
 *                     example: true
 *       500:
 *         description: Error del servidor
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', userController.getUser);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - rol
 *             properties:
 *               username:
 *                 type: string
 *                 example: "vendedor1"
 *               email:
 *                 type: string
 *                 example: "vendedor1@distribuidora.com"
 *               password:
 *                 type: string
 *                 example: "SecurePass123!"
 *                 format: password
 *               rol:
 *                 type: string
 *                 example: "Vendedor"
 *               activo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualiza un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "vendedor1"
 *               email:
 *                 type: string
 *                 example: "vendedor1@distribuidora.com"
 *               password:
 *                 type: string
 *                 example: "NewSecurePass456!"
 *                 format: password
 *               rol:
 *                 type: string
 *                 example: "Supervisor"
 *               activo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', userController.deleteUser);

export default router;