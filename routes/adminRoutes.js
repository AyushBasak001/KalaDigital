import express from 'express';
import {
    renderAdminDashboard
} from '../controllers/adminController.js';
import {authRequired} from '../middlewares/auth.js'

const router = express.Router();

router.get('/dashboard', authRequired(['ADMIN']), renderAdminDashboard);

export default router;