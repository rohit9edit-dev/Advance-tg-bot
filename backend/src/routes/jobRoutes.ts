import express from 'express';
import { createGovtJob, getGovtJobs, getGovtJobById, createJob, getJobs } from '../controllers/jobController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.post('/govt', protect, authorize('ADMIN'), createGovtJob);
router.get('/govt', getGovtJobs);
router.get('/govt/:id', getGovtJobById);

router.post('/private', protect, authorize('COMPANY'), createJob);
router.get('/private', getJobs);

export default router;
