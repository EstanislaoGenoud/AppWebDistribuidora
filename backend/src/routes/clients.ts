import { Router } from "express";
import * as clientController from "../controllers/clientControllers";

const router=Router();

router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getClient);
router.post('/', clientController.createClient);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

export default router;