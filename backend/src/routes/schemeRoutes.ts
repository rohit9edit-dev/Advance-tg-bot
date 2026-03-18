import express from 'express';
import { createScheme, getSchemes, getSchemeById } from '../controllers/schemeController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.post('/', protect, authorize('ADMIN'), createScheme);
router.get('/', getSchemes);
router.get('/:id', getSchemeById);

export default router;
