import express from 'express';
import {
    renderMarketplace
} from '../controllers/userController.js';
import {authRequired} from '../middlewares/auth.js'

const router = express.Router();

router.get('/marketplace', authRequired(['USER']), renderMarketplace);

export default router;