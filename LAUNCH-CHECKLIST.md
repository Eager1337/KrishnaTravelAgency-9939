# Krishna Travels — developer handover

## What you can demonstrate now
- Responsive homepage and working navigation; destination filters and search.
- Four destination inspiration pages and six service detail pages.
- About, contact, FAQ accordion, privacy, terms and missing-page handling.
- Trip planner feeds a three-step enquiry form. Native and server validation, consent, honeypot and per-instance rate limits.
- Enquiries persist in the provisioned database. Receipts have a private reference, downloadable summary and user-initiated WhatsApp/email actions.
- Enquiry lookup needs the reference plus email and returns no name, phone or trip details.
- Locally hosted fonts, optimised WebP images, responsive layouts, keyboard labels/focus, reduced-motion support, code-split internal routes and page metadata.
- Platform analytics is retained. Independent-preview pages intentionally use noindex/nofollow.

## What is not connected
This is a sales demonstration, not the agency’s authorised production website. It does not send automated email, notify staff, provide an owner dashboard, change request statuses, issue tickets, show live fares, accept payments or confirm travel bookings. Use fictitious data for demos. Avoid promising these integrations are included or already live.

## Owner approval before launch
1. Get written permission to use the Krishna Travels name, branding and content. Approve the redesigned wordmark; the original downloaded logo is retained in public/images/original-logo.png for reference.
2. Confirm the current address, phone, WhatsApp ownership, mailbox, opening hours and service availability. The source brochure dates to April 2024; contact details may have changed.
3. Agree whether this becomes a dedicated Sierra Leone site or a group-site replacement/landing experience. They already have a regional website.
4. Obtain an official business-controlled domain and decide domain/site ownership. Publishing, custom domains and production settings are handled in the platform UI.
5. Choose a real enquiry workflow: verified email notifications and/or authenticated staff inbox with status updates. Agree data access roles, failure handling and support responsibilities. Do not make the preview database public or add an unauthenticated admin screen.
6. Update privacy terms with the actual controller, privacy contact, processors, retention schedule and lawful basis. Remove demonstration records; implement agreed deletion/retention and database backup/recovery procedures.
7. Verify platform analytics’ storage/cookie behaviour, regional legal obligations and whether consent is required. Add appropriate controls where necessary.
8. Confirm approved imagery and commercial usage rights. Keep source credits below; approve destination ideas and copy. No prices/reviews/awards have been invented.
9. Set the actual site URL in metadata, canonical URLs and sitemap. Remove noindex only after authorisation and launch QA. Add valid contact/location data to Google Business Profile with the owner’s permission.
10. Configure production HTTPS, monitoring, abuse protection at the edge, database recovery tests and provider permissions. Current application rate limits are per instance and per email, not a production-grade bot firewall.
11. Run desktop/mobile, keyboard, screen-reader and low-bandwidth tests on the production domain. Check contact links, failed submissions, tracking, notification deliverability and backups. Build/lint success is not a full security or accessibility audit.

## Verified public information
Inspected 9 November 2026. Owner confirmation still required.
- Official Sierra Leone branch: https://krishna-travels.in/sierra-leone/
  - Phone +232 72 100 100; email deepak@krishna-travels.in.
  - Shop No. 11, Lightfoot Boston Street, opposite Standard Chartered Bank, Freetown.
- Official corporate brochure: https://krishna-travels.in/wp-content/uploads/2024/04/Profile-1_compressed.pdf
  - Explicitly lists the same branch number as Call / WhatsApp.
- Official group homepage: https://krishna-travels.in/
  - Ghana start 2018; Côte d’Ivoire 2020; Burkina Faso 2021; Sierra Leone 2023; Zambia 2024.
  - Air ticketing, car rentals, visa assistance, holidays, hotels and travel insurance listed.
- Supplied Google Maps URL was partly redacted. Site map links use address-based Google Maps search, not a guessed coordinate.

## Social research — do not confuse branches
Public indexed searches covered Facebook, Instagram, LinkedIn, TikTok, X and YouTube. This is not an exhaustive crawl: private posts, login-gated pages and unindexed accounts are inaccessible.
- Freetown Instagram candidate surfaced: https://www.instagram.com/krishnatravels.sl/ — indexed as “Krishna Travels · Freetown”, with a matching travel-experience tagline. Direct inspection returned HTTP 429, so ownership and current details remain unconfirmed. Ask the owner before linking it.
- Group LinkedIn: https://gh.linkedin.com/company/krishna-travels-limited — indexed description matches the official history.
- Ghana Instagram candidates: https://www.instagram.com/krishnatravelsghana/ and https://www.instagram.com/krishnatravels.gh/ — do not substitute these for Freetown.
- Zambia Instagram: https://www.instagram.com/krishnatravelszambia/; Facebook candidate https://www.facebook.com/61559674243120/ — regional accounts, not verified Freetown channels.
- Facebook personal profile https://www.facebook.com/mediaz.xtrim.7/ and marketplace references mention a Sierra Leone marketing role/address; not treated as official business contact sources.
- No verified Freetown TikTok, X or YouTube account found. That does not prove none exists.
- Official group site displayed social icon labels, but inspected anchor links did not expose social destinations. New site deliberately avoids dead or unconfirmed social links.

## Image/source notes
- hero.webp: Ishan @seefromthesky, Maldives tropical island. Wikimedia Commons identifies the pre-5 June 2017 Unsplash image as CC0: https://commons.wikimedia.org/wiki/File:Maldives_tropical_island_(Unsplash).jpg
- maldives.webp: Unsplash, “An aerial view of a tropical beach and lagoon”: https://unsplash.com/photos/an-aerial-view-of-a-tropical-beach-and-lagoon-Kmf8MZkk9GQ
- accra.webp: Unsplash, WyteShot, Independence Square: https://unsplash.com/photos/ghanas-independence-square-with-flags-and-a-clear-sky-9VfgaIH_mJM
- dubai.webp: selected from https://unsplash.com/s/photos/dubai-skyline; london.webp: https://unsplash.com/s/photos/tower-bridge. Exact photographer/source IDs not provided in image-search output; verify final image provenance or replace with owner-approved/licensed assets before commercial launch.
- Fonts downloaded through Google Fonts: Poppins and DM Sans. Their SIL Open Font License files are included in public/fonts/licenses; retain them with handover.

## Suggested commercial offer (your judgement, not a verified local market rate)
- Anchor: US$1,500 for the approved website scope, with the essential owner onboarding and enquiry-delivery launch setup explicitly agreed before signing.
- Negotiation range: US$1,000–1,500. A reduced brochure/WhatsApp-only version can be a separate lower-scope offer, not an undisclosed discount on full functionality.
- Suggested care plan: US$50–100/month for an agreed allowance of updates, monitoring and support. Hosting, domain, paid providers, messaging, advertising and booking API costs must be stated separately or explicitly capped in a bundled plan.
- Quote in SLE using a mutually agreed current conversion rate. Indicative November 2026 sources put US$1 around SLE23, so US$1,500 is roughly SLE34,500 (new leones), not SLL34,500.
  - Exchange context: https://www.worlddata.info/currencies/sle-sierra-leonean-leone.php (indexed SLE23.03/USD, 6 November 2026).
  - This is not a bank quote or guaranteed conversion rate.
- Payment proposal: 50% deposit after signed scope; 50% after agreed acceptance tests and before final transfer/launch. Define revisions, handover, content approval, access and maintenance responsibilities in writing.

## Demo script
“You already have a group website. This is a Freetown-focused upgrade: customers can explore services, put their trip details in one place and contact your local team with a complete enquiry. I’m proposing US$1,500 for the agreed website and launch setup, with optional ongoing support. Let’s confirm your contact details and how you want enquiries delivered.”

Show: mobile homepage → destination → planner → save fictitious enquiry → receipt → WhatsApp action (do not send without permission) → private tracking. Explain that notifications and live bookings are not yet connected. No website guarantees an immediate purchase or revenue increase.