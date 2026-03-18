import { GoogleGenerativeAI } from "@google/generative-ai";
import { Request, Response } from "express";
import prisma from "../utils/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const chatWithAI = async (req: any, res: Response) => {
  const { message, context } = req.body;
  const userId = req.user.id;

  try {
    // 1. Check Rate Limiting (50 messages/day for FREE users)
    let aiUsage = await prisma.aIUsage.findUnique({ where: { userId } });
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!aiUsage) {
      aiUsage = await prisma.aIUsage.create({
        data: { userId, subscriptionTier: req.user.subscriptionTier || 'FREE' }
      });
    }

    if (aiUsage.lastResetDate < today) {
      aiUsage = await prisma.aIUsage.update({
        where: { userId },
        data: { messagesToday: 0, lastResetDate: today }
      });
    }

    if (aiUsage.subscriptionTier === 'FREE' && aiUsage.messagesToday >= 50) {
      return res.status(429).json({ message: "Daily message limit reached. Upgrade to PRO for unlimited access." });
    }

    // 2. Prepare Context for AI
    const userProfile = `Name: ${req.user.fullName}, Role: ${req.user.role}, Tier: ${aiUsage.subscriptionTier}`;
    const pageContext = context ? `Current Page: ${context.page}, Content: ${JSON.stringify(context.data)}` : "General website browsing";

    const systemPrompt = `You are "Career Coach", an AI assistant for a Government Job & Career Portal.
    Help users with job recommendations, eligibility checks, scheme suggestions, resume help, and career guidance.
    User Profile: ${userProfile}.
    Context: ${pageContext}.
    Support both English and Hindi (Hinglish). Be professional, helpful, and concise.`;

    // 3. Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Understood. I am your Career Coach, ready to help you with jobs and schemes." }] },
      ],
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    // 4. Save Conversation and Update Usage
    await prisma.aIConversation.create({
      data: {
        userId,
        message,
        response: responseText,
        context: context || {},
      }
    });

    await prisma.aIUsage.update({
      where: { userId },
      data: {
        messagesToday: { increment: 1 },
        totalMessages: { increment: 1 }
      }
    });

    res.json({ response: responseText });
  } catch (error: any) {
    console.error("AI Coach Error:", error);
    res.status(500).json({ message: "Failed to get response from AI Coach." });
  }
};

export const getAIConversations = async (req: any, res: Response) => {
  try {
    const conversations = await prisma.aIConversation.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: 20
    });
    res.json(conversations);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
