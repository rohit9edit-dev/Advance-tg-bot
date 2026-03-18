import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { z } from 'zod';

const govtJobSchema = z.object({
  title: z.string(),
  organization: z.string(),
  description: z.string(),
  eligibility: z.string(),
  qualification: z.string(),
  state: z.string().optional(),
  category: z.string().optional(),
  salary: z.string().optional(),
  vacancies: z.number(),
  lastDate: z.string().transform((str) => new Date(str)),
  officialPdfUrl: z.string().optional(),
  applyLink: z.string().optional(),
});

export const createGovtJob = async (req: Request, res: Response) => {
  try {
    const validatedData = govtJobSchema.parse(req.body);
    const govtJob = await prisma.govtJob.create({
      data: {
        ...validatedData,
        status: 'PENDING_APPROVAL',
      },
    });
    res.status(201).json(govtJob);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getGovtJobs = async (req: Request, res: Response) => {
  const { organization, state, qualification, category } = req.query;
  let filters: any = { status: 'LIVE' };

  if (organization) filters.organization = organization;
  if (state) filters.state = state;
  if (qualification) filters.qualification = qualification;
  if (category) filters.category = category;

  try {
    const jobs = await prisma.govtJob.findMany({
      where: filters,
      orderBy: { createdAt: 'desc' },
    });
    res.json(jobs);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getGovtJobById = async (req: Request, res: Response) => {
  try {
    const job = await prisma.govtJob.findUnique({
      where: { id: req.params.id },
    });
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Private Jobs
const jobSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  salary: z.string().optional(),
  experience: z.string().optional(),
  type: z.string().optional(),
});

export const createJob = async (req: any, res: Response) => {
  try {
    const validatedData = jobSchema.parse(req.body);
    const companyId = req.user.companyId;

    if (!companyId) {
      return res.status(400).json({ message: 'User is not associated with a company' });
    }

    // Pricing Logic: First 3 Jobs FREE per month. 4th Job onwards = ₹25/job.
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const jobCount = await prisma.job.count({
      where: {
        companyId,
        createdAt: { gte: startOfMonth },
      },
    });

    if (jobCount >= 3) {
      // Check for payment
      if (!req.body.paymentId) {
        return res.status(402).json({
          message: 'Free job limit reached. Please pay ₹25 to post this job.',
          requiresPayment: true,
        });
      }
      // Logic for verifying payment would go here
    }

    const job = await prisma.job.create({
      data: {
        ...validatedData,
        companyId,
        status: 'PENDING_APPROVAL',
      },
    });
    res.status(201).json(job);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { status: 'LIVE' },
      include: { company: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(jobs);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
