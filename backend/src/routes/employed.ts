import { Router } from "express";
import * as employedController from "../controllers/employedControllers";

const router = Router();
router.get('/', employedController.getAllEmployed);
router.get('/:id', employedController.getEmployed);
router.post('/', employedController.createEmployed);
router.put('/:id', employedController.updateEmployed);
router.delete('/:id', employedController.deleteEmployed);
export default router;