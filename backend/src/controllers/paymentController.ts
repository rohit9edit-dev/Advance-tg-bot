import Razorpay from 'razorpay';
import crypto from 'crypto';
import { Request, Response } from 'express';
import prisma from '../utils/prisma';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export const createOrder = async (req: any, res: Response) => {
  const { amount, purpose } = req.body; // amount in INR

  try {
    const options = {
      amount: amount * 100, // razorpay expects in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    await prisma.payment.create({
      data: {
        userId: req.user.id,
        amount: parseFloat(amount),
        status: 'PENDING',
        razorpayOrderId: order.id,
        purpose,
      }
    });

    res.json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || '')
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    await prisma.payment.update({
      where: { razorpayOrderId: razorpay_order_id },
      data: {
        status: 'SUCCESS',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      }
    });
    res.json({ status: 'ok' });
  } else {
    res.status(400).json({ status: 'verification_failed' });
  }
};
