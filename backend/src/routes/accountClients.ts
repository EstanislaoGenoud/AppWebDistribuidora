import { Router } from "express";
import * as accountClientController from "../controllers/accountClientControllers";

const router=Router();

router.get('/', accountClientController.getAllAccountClient);
router.get('/:idCliente', accountClientController.getAccountClient);
router.post('/', accountClientController.createAccountClient);
router.put('/:idCliente', accountClientController.updateAccountClient);
router.delete('/:idCliente', accountClientController.deleteAccountClient);

export default router;