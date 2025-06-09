import {Router} from 'express';
import * as productController from '../controllers/productControllers';

const router = Router();

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProduct);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

export default router;