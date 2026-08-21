import express from 'express';
import {
    renderArtisansPage,
    renderArtisanDashboard
} from '../controllers/artisanController.js';
import {authRequired} from '../middlewares/auth.js'

const router = express.Router();

router.get('/', renderArtisansPage);

router.get('/dashboard', authRequired(['ARTISAN']), renderArtisanDashboard);

export default router;