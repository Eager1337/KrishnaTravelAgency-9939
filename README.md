# Krishna Travels — Freetown

A responsive travel agency website concept for Krishna Travels in Freetown, Sierra Leone.

**Live website:** https://krishna-travel-agency-9939.vercel.app/

## Project

The site presents travel services, destination inspiration, agency contact details, a trip enquiry flow, and a Freetown office map.

## Tech stack

- React and TypeScript
- Vite
- Bun workspaces and Turborepo
- Hono API
- Drizzle ORM and LibSQL
- Wouter routing

## Development

Install dependencies from the repository root:

```bash
bun install
bun run dev
```

Build the web app:

```bash
bun run build:web
```

Run the full workspace build:

```bash
bun run build
```

## Deployment

The production website is hosted on Vercel and connected to this GitHub repository. Push changes to the `main` branch to trigger a deployment when the Vercel Git integration is enabled.

## Contact form behavior

The contact page prepares a message and opens WhatsApp for the visitor to review and send. It does not claim to deliver messages to an agency inbox automatically.

## Important

This is an independent website concept. Travel availability, prices, office hours and booking arrangements must be confirmed directly with Krishna Travels.
