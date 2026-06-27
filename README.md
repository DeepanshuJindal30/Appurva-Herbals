# Appurva Herbals Catalogue

Doctor-ready product catalogue for Appurva Herbals — mobile-responsive, visual-first, with search, filters, and instant enquiry actions.

## Live demo

| | Link |
|---|---|
| **Website** | [https://appurvaherbals.vercel.app](https://appurvaherbals.vercel.app) |
| **Admin** | [https://appurvaherbals.vercel.app/admin](https://appurvaherbals.vercel.app/admin) |
| **GitHub** | [DeepanshuJindal30/Appurva-Herbals](https://github.com/DeepanshuJindal30/Appurva-Herbals) |

## Demo video

<video src="./docs/demo.mp4" controls width="100%"></video>

[Download demo video](./docs/demo.mp4)

## Highlights

- **15 products** with updated photos in `public/products/` and `Product_Catalogue/`
- **All-products landing collage** on the home page (`public/landing.png`)
- **Mobile-first UX** — compact header, 2-column grid, full-screen modals, less text / more visuals
- **Category search & filters** — find products by care area, name, or benefit
- **One-tap enquiry** — WhatsApp, call, and email from every product card
- **Floating product guide** — catalogue-only assistant
- **Admin portal** — add, edit, delete products; image upload; pricing control

## Recommended use

This is the **primary public catalogue** for doctors, clinics, distributors, and patients — clean, fast, and works fully offline with local product images.

## Tech stack

- **Next.js 15** (App Router)
- **Chakra UI** + **Framer Motion** + Lucide icons
- **NextAuth** (credentials) for admin
- **Vercel** hosting

## Project structure

```text
.
├── app/                  # Pages, API routes, components
├── public/
│   ├── products/         # Product images (AP-FIT.png, …)
│   └── landing.png       # All-products hero collage
├── Product_Catalogue/    # Source catalogue assets
└── docs/demo.mp4         # Site walkthrough video
```

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run lint
```

## Admin access

1. Go to `/admin`
2. Sign in with an authorized email:
   - `deepanshujindal907@gmail.com`
   - `appurvaherbals@gmail.com`
3. Enter the admin password

## Environment variables (Vercel)

```bash
ADMIN_PASSWORD=<strong_password>
NEXTAUTH_SECRET=<long_random_secret>
NEXTAUTH_URL=https://appurvaherbals.vercel.app
```

## Contact

- Email: appurvaherbals@gmail.com
- Phone / WhatsApp: +91 7500834519
- Location: Modinagar

## License

Private — Appurva Herbals.
