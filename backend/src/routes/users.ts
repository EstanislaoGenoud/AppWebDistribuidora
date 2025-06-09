import { Router } from "express";
import * as userController from "../controllers/usersControllers";

const router=Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
export default router;