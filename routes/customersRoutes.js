import express from 'express';
import {
    renderCustomerDashboard
} from '../controllers/customerController.js';
import {authRequired} from '../middlewares/auth.js'

const router = express.Router();

router.get('/dashboard', authRequired(['CUSTOMER']), renderCustomerDashboard);

export default router;