import { Router } from "express";
import * as accountProviderController from "../controllers/accountProviderControllers";

const router=Router();

router.get('/', accountProviderController.getAllAccountProvider);
router.get('/:legajoProv', accountProviderController.getAccountProvider);
router.post('/', accountProviderController.createAccountProvider);
router.put('/:legajoProv', accountProviderController.updateAccountProvider);
router.delete('/:legajoProv', accountProviderController.deleteAccountProvider);

export default router;