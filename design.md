# Krishna Travels — Freetown

Premium editorial travel website; web only. Modern Cocodly-inspired polish, not a replica of a particular site.

## Visual identity
- Forest #123d32, lime #d7ed8b, cream #faf9f6, ink #192d25, muted #64726a.
- Display: Poppins medium/semibold, tight negative tracking; body DM Sans. Self-host fonts.
- White navigation with small brand symbol; full-width cinematic Maldives lagoon hero, dark left gradient for readable copy; enormous three-line headline, lime italic accent.
- Floating white planner panel overlaps hero base. Wide cream editorial sections, rounded image tiles with gradient captions. Asymmetric about section, dark green closing CTA.
- 1200px content max width, 64px desktop gutters / 22px mobile; 90px section gaps; radius 16px images and 28px hero. Buttons pills. Icons lucide.
- No fake reviews, metrics, fares, certifications or urgency. Travel ideas are inspiration subject to agency confirmation.

## Screens / UX
- Home: hero, interactive flight/holiday/business planner, trust strip, filterable destinations, six services, about, process, FAQs and CTA.
- Destinations: filter/search cards and editorial detail pages with planning checklist.
- Services: six service detail pages, enquiry CTAs.
- About, contact, quote wizard, enquiry tracking, privacy, terms, 404.
- Quote: trip → contact → review → persisted receipt. Server and native validation, honeypot and rate limit, explicit consent; no passports/payment data. Receipt includes downloadable text, unguessable reference, contact actions. Preview not connected to agency inbox, explained before submission.
- Tracking: email plus unguessable reference; does not reveal personal fields. No public inbox/admin panel.
- Real phone/email/WhatsApp from branch official page/company brochure. Maps opens address-based search, not a guessed pin.
- Mobile menu, touch targets, accessible focus/labels, reduced motion, skeletons/errors, breadcrumbs and back navigation.

## Architecture
- Only packages/web changed. Wouter routing, React Query hooks under queries, typed oRPC endpoints under api/routes/enquiries.ts.
- Drizzle enquiries table in provisioned Turso. Reference and email lookup; no personal data returned by tracking.
- SEO metadata and TravelAgency structured data. Canonical and sitemap require owner's domain before launch. Analytics remains platform default.