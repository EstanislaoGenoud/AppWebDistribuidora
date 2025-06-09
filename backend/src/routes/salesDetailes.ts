import { Router } from "express";
import * as salesDetailesController from "../controllers/salesDetailesControllers";

const router=Router();

router.get('/', salesDetailesController.getAllSalesDetailes);
router.get('/:id', salesDetailesController.getSalesDetailes);
router.post('/', salesDetailesController.createSalesDetailes);
router.put('/:id', salesDetailesController.updateSalesDetailes);
router.delete('/:id', salesDetailesController.deleteSalesDetailes);

export default router;