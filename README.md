# MG-Template

This is a template for kickstarting full stack development projects, particularly for SaaS and other applications.

## Technologies Used

- **Frontend:**
  - TypeScript
  - React
  - Next.js
  - React Query
  - ShadCui (UI Library)
  - Zustand (State Management)
  
- **Backend:**
  - TypeScript
  - TRPC
  - NextAuth for authentication
  - Postgresql (Database)  on render
  
- **Deployment:**
  - Frontend: Vercel
  - Database: [Not decided yet]
  
- **Additional Tools:**
  - Upstash Redis (for rate limiting)
  - Zod (for validation)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.


env variavles
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
NEXTAUTH_SECRET="" 
NEXTAUTH_URL=""
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""
ADMIN_EMAIL=""
ADMIN_USERNAME=""
ADMIN_PASSWORD=""
```