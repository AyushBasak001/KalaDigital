import express from 'express';
import {
    renderWorkingPage
} from '../controllers/workController.js';

const router = express.Router();

router.get('/', renderWorkingPage);

export default router;