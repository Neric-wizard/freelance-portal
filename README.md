# Freelance Client Portal

A full-stack platform for freelancers to manage clients and invoices.

**Live Demo:** [https://freelance-portal-v5w5.vercel.app](https://freelance-portal-v5w5.vercel.app)

## Features

### Client Management
- Add clients with real-time validation
- Live initials preview (John Doe → JD)
- Client list with instant updates

### Invoice Management
- Create invoices with auto-numbering
- Real-time duplicate check
- Due date quick picks (+7, +14, +30 days)
- Live invoice preview while typing

### Authentication
- Email/password login
- Protected dashboard routes
- RLS policies with (select auth.uid()) optimization

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 15 | Framework |
| TypeScript | Language |
| Supabase | Database + Auth |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Vercel | Deployment |

## Run Locally

```bash
git clone https://github.com/Neric-wizard/freelance-portal.git
cd freelance-portal
npm install
npm run dev
