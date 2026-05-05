# Appurva Herbals Catalogue

Doctor-ready, offline-first product catalogue for Appurva Herbals. Features 15 trusted herbal products with local photos, search-first workflows, and direct enquiry actions.

## Features

- **15 Trusted Products** — AP-Fit, AP-Min, AP-Liv D.S., AP-Zyme, AP-More, AP-Lax, AP-Kof, AP-Lizer, AP-Rub, AP-Vit Forte, AP-Tone, AP-Pure, AP-Glow, AP-Dent, AP-Fit Energy Drink
- **Search & Filter** — Find products by name, benefit, care area, or use case instantly
- **Product Details** — Pack size, form, positioning, and clinical use in polished modals
- **Direct Enquiry** — WhatsApp, phone call, and email actions on every product
- **Floating Guide Bot** — AI-powered product guide for quick recommendations
- **Offline Ready** — No database dependency; all data is local and fast
- **Admin Portal** — OTP-based secure access for product management
- **3x5 Grid Layout** — Optimized card layout for desktop and mobile viewing
- **Brand Assets** — Clean logo, landing hero image, and consistent visual identity

## Live Demo

- **Production:** https://appurvaherbals.vercel.app
- **Admin Portal:** https://appurvaherbals.vercel.app/admin

## Quick Start

### Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Production Build

```bash
npm run build
npm run lint
```

## Admin Access

- Navigate to `/admin`
- Enter an authorized email (default: `deepanshujindal907@gmail.com` or `appurvaherbals@gmail.com`)
- Receive OTP via email or use the preview code if SMTP is not configured
- Manage product details post-login

## Configuration

Product data lives in `app/data/products.ts`.

### Email Configuration (Optional)

For OTP email delivery, set these Vercel environment variables:

```
SMTP_SERVICE=gmail
SMTP_USER=<your-gmail>
SMTP_PASS=<app-password>
EMAIL_FROM=<your-gmail>
```

Or use custom SMTP:

```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=<username>
SMTP_PASS=<password>
SMTP_SECURE=false
```

## Contact

- **Email:** appurvaherbals@gmail.com
- **Phone/WhatsApp:** +91 7500834519
- **Location:** Modinagar

## Tech Stack

- **Framework:** Next.js 15.5 (App Router)
- **UI:** Chakra UI with Lucide icons
- **Styling:** Tailwind CSS
- **Authentication:** OTP-based JWT
- **Hosting:** Vercel
- **Email:** Nodemailer (optional)

## License

Private product for Appurva Herbals.
