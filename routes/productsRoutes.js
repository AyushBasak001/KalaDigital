import express from 'express';
import {
    renderProductsPage
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', renderProductsPage);

export default router;