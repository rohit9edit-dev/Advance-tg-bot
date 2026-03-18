import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { z } from 'zod';

const schemeSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  state: z.string().optional(),
  department: z.string().optional(),
  eligibility: z.string(),
  benefits: z.string(),
  requiredDocs: z.array(z.string()),
  applyLink: z.string().optional(),
});

export const createScheme = async (req: Request, res: Response) => {
  try {
    const validatedData = schemeSchema.parse(req.body);
    const scheme = await prisma.scheme.create({
      data: {
        ...validatedData,
        status: 'PENDING_APPROVAL',
      },
    });
    res.status(201).json(scheme);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getSchemes = async (req: Request, res: Response) => {
  const { category, state, department } = req.query;
  let filters: any = { status: 'LIVE' };

  if (category) filters.category = category;
  if (state) filters.state = state;
  if (department) filters.department = department;

  try {
    const schemes = await prisma.scheme.findMany({
      where: filters,
      orderBy: { createdAt: 'desc' },
    });
    res.json(schemes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getSchemeById = async (req: Request, res: Response) => {
  try {
    const scheme = await prisma.scheme.findUnique({
      where: { id: req.params.id },
    });
    if (scheme) {
      res.json(scheme);
    } else {
      res.status(404).json({ message: 'Scheme not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
