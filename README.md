# Government Job & Career Portal with AI Coach

A production-ready portal focused on Government Jobs & Schemes with AI integration.

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Zustand, React Query
- **Backend:** Node.js, Express, TypeScript, MongoDB (Prisma ORM)
- **AI:** Google Gemini Pro API
- **Payments:** Razorpay
- **Storage:** Cloudinary

## Core Features

1. **AI Coach (Gemini):** Floating widget on all pages for career guidance.
2. **Job Management:** 3 Free jobs/month for companies, ₹25/job after.
3. **Admin Dashboard:** Approval queue for all job and scheme listings.
4. **User Dashboards:** Specialized layouts for Seekers, Employers, and Admins.
5. **Eligibility Checker:** AI-powered eligibility and study plan suggestions.

## Setup Instructions

### Backend
1. `cd backend`
2. `npm install`
3. Configure `.env` with MongoDB, Gemini, Razorpay, and Cloudinary keys.
4. `npx prisma generate`
5. `npm run dev`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Deployment
- Use Docker for containerization.
- Set up CI/CD with GitHub Actions.
- Deploy backend to VPS/Heroku and frontend to Vercel/Netlify.
