import { Router } from "express";
import * as accountClientController from "../controllers/accountClientControllers";

const router=Router();

router.get('/', accountClientController.getAllAccountClient);
router.get('/:id', accountClientController.getAccountClient);
router.post('/', accountClientController.createAccountClient);
router.put('/:id', accountClientController.updateAccountClient);
router.delete('/:id', accountClientController.deleteAccountClient);

export default router;