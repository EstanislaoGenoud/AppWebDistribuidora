import { Router } from "express";
import * as accountProviderController from "../controllers/accountProviderControllers";

const router=Router();

router.get('/', accountProviderController.getAllAccountProvider);
router.get('/:id', accountProviderController.getAccountProvider);
router.post('/', accountProviderController.createAccountProvider);
router.put('/:id', accountProviderController.updateAccountProvider);
router.delete('/:id', accountProviderController.deleteAccountProvider);

export default router;