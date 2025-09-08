import { Router } from "express";
import * as salesDetailesControllers from '../controllers/salesDetailesControllers';
const router=Router();

router.get('/', salesDetailesControllers.getAllSalesDetailes);
router.get('/:id', salesDetailesControllers.getSalesDetailes);
router.post('/', salesDetailesControllers.createSalesDetailes);
router.delete('/:id', salesDetailesControllers.deleteSalesDetailes);

export default router;