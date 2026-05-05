# Appurva Herbals Catalogue

Deployed at: `https://appurvaherbals.vercel.app`

Doctor-ready product catalogue for Appurva Herbals with a public product experience and an authenticated admin portal for catalogue operations.

## Features

- 15 trusted products with detailed cards and modal view
- Search and filter by product name, category, and benefits
- Direct enquiry actions (WhatsApp, phone, email)
- Floating product guide assistant
- Admin login restricted to authorized emails
- Admin product CRUD: add, edit, delete
- Admin image support: image path or image upload
- Admin pricing control: toggle between `MRP on request` and fixed price

## Live Demo

- Production: `https://appurvaherbals.vercel.app`
- Admin Portal: `https://appurvaherbals.vercel.app/admin`

## Quick Start

### Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Production Build

```bash
npm run build
npm run lint
```

## Admin Access

- Navigate to `/admin`
- Sign in with an authorized email:
  - `deepanshujindal907@gmail.com`
  - `appurvaherbals@gmail.com`
- Enter admin password
- Manage products after login

## Admin Product Fields

- Name
- Category
- Form
- Pack
- Price or `MRP on request`
- Audience
- Image path or uploaded image
- Accent color
- Short description
- Benefits (comma-separated)

## Data and API

Default catalogue source:

- `app/data/products.ts`

Runtime product APIs:

- `app/api/products/route.ts`
- `app/api/products/[id]/route.ts`

## Environment Variables (Recommended)

Set these in Vercel for secure production auth:

```bash
ADMIN_PASSWORD=<strong_password>
NEXTAUTH_SECRET=<long_random_secret>
NEXTAUTH_URL=https://appurvaherbals.vercel.app
```

Note: without an external database and object storage, serverless file-based updates may not persist reliably across all instances/deployments.

## Tech Stack

- Framework: Next.js 15.5 (App Router)
- UI: Chakra UI + Lucide
- Authentication: NextAuth (Credentials)
- Hosting: Vercel

## Suggested Next Improvements

1. Move product data to a managed database (Supabase/Firebase/Vercel Postgres) for durable persistence.
2. Move image uploads to cloud storage (Vercel Blob/Cloudinary) instead of base64/local file path.
3. Add product availability status (`In stock`, `Out of stock`, `Upcoming`).
4. Add admin-side search/filter/pagination for faster product operations.
5. Add audit log (`updated by`, `updated at`) for tracking edits.
6. Add role-based access (`owner`, `editor`, `viewer`) for team workflows.
7. Add CSV import/export for bulk catalogue updates.

## Contact

- Email: `appurvaherbals@gmail.com`
- Phone/WhatsApp: `+91 7500834519`
- Location: `Modinagar`

## License

Private product for Appurva Herbals.
