# Appurva Herbals Catalogue

Offline-first product catalogue for Appurva Herbals.

## What This App Does

- Shows 16 Appurva Herbals products using local product photos.
- Lets doctors, clinics, and distributors search/filter by product, category, benefit, or use case.
- Provides product detail modals with pack size, form, positioning, and enquiry actions.
- Includes a floating catalogue-only product guide bot.
- Uses local data only. There is no Supabase/database dependency.

## Contact Defaults

- Email: `appurvaherbals@gmail.com`
- Phone/WhatsApp: `+91 7500834519`
- Location: `Modinagar`

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run build
npm run lint
```

Product data lives in `app/data/products.ts`.
