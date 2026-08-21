import express from 'express';
import {
    renderArtisansPage
} from '../controllers/artisanController.js';

const router = express.Router();

router.get('/', renderArtisansPage);

export default router;