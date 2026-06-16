# Gurukul School of Music — PRD

## Original Problem Statement
Marketing website for Gurukul School of Music, Bangalore. Single-page editorial site with hero, about, courses (Hindustani / Rabindra / Folk / Bollywood), gurus (Rupali Sen Mukherjee, Nilanjan Sen), Annual Day galleries (2024/25/26), testimonials, FAQ, contact + demo booking form. 13+ years, 200+ students, ages 3–70+, online & offline.

## User Choices
- Demo booking → Form + WhatsApp redirect
- Galleries → curated stock + real 2026 photos
- No admin panel (static site)
- Design vibe → warm traditional + editorial (design agent picked palette)
- Contact form fields → all of (course dropdown, age, mode)

## Architecture
- Backend: FastAPI + MongoDB (`/api/demo-bookings` POST/GET, `/api/health`)
- Frontend: React 19 + Tailwind + shadcn/ui + framer-motion. Sections under `src/components/site/`.
- Static assets in `/app/frontend/public/assets/` (logo, teacher photos, gallery2026/*).

## Implemented (Dec 2025 / Jun 2026 session)
- Full single-page marketing site with all 10 sections
- Demo booking persists to Mongo + opens prefilled WhatsApp chat to 9880080535
- Annual Day 2026 gallery uses 5 real photos (women choir, kids choir, hosts, trophies, finale)
- 2024/2025 galleries use curated stock images
- All sections have data-testids; tested 100% pass (iteration_1)

## Backlog
- P1: Upload real 2024 & 2025 photos (currently stock)
- P2: Admin panel to manage testimonials/bookings/gallery
- P2: Email notification on new booking (Resend/SendGrid)
- P3: Add Google Maps embed for Kaggadasapura location
- P3: Add audio samples / student performance clips
- P3: SEO: og:image, sitemap, structured data (LocalBusiness/School)
