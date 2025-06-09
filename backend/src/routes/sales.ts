import { Router } from "express";
import * as salesController from "../controllers/salesControllers";

const router=Router();

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSale);
router.post('/', salesController.createSale);
router.put('/:id', salesController.updateSale);
router.delete('/:id', salesController.deleteSale);

export default router;