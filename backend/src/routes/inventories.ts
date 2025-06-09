import { Router } from "express";
import * as inventoryController from "../controllers/inventoryControllers";

const router=Router();

router.get('/', inventoryController.getAllInventory);
router.get('/:id', inventoryController.getInventory);
router.post('/', inventoryController.createInventory);
router.put('/:id', inventoryController.updateInventory);
router.delete('/:id', inventoryController.deleteInventory);

export default router;