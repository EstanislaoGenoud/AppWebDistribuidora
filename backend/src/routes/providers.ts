// src/routes/providers.ts
import { Router } from "express";
import * as providerController from "../controllers/providerControllers";

const router = Router();

router.get('/', providerController.getAllProviders);
router.get('/:id', providerController.getProvider);
router.post('/', providerController.createProvider);
router.put('/:id', providerController.updateProvider);
router.delete('/:id', providerController.deleteProvider);

export default router;