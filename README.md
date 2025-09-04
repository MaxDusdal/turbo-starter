# CampusClock Stack

A full-stack TypeScript monorepo built with Turborepo, featuring a Fastify API and Next.js web app.

## Prerequisites

- Node.js 18+ 
- pnpm 9+

## Quick Start

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your actual values

# Generate Prisma client
pnpm prisma:generate

# Start development
pnpm dev
```

## Environment Variables

This monorepo uses a single `.env` file at the root directory that is shared across all apps and packages using `dotenv-cli`. 

### Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your actual values:
   - `DATABASE_URL` - PostgreSQL connection string for Prisma
   - `CLIENT_ORIGIN` - Frontend URL for CORS (default: http://localhost:3000)
   - `API_PORT` - Port for the Fastify API server (default: 3001)
   - `NEXT_PUBLIC_API_URL` - API URL for the web app (default: http://localhost:3001)
   - `AUTH_SECRET` - Secret key for authentication

### How it works

All scripts in the monorepo are configured to use `dotenv -e ../../.env` (or appropriate path) to load the root `.env` file. This ensures consistent environment variable handling across:

- **API app** - All scripts load root .env automatically
- **Web app** - All scripts load root .env automatically  
- **Database package** - Prisma commands load root .env automatically
- **Root scripts** - Prisma commands load root .env automatically

The Turborepo configuration also includes `.env*` in the build inputs for proper caching.

## What's Inside

### Apps
- **`api`** - Fastify REST API with TypeScript
- **`web`** - Next.js app with TailwindCSS and shadcn/ui

### Packages
- **`auth`** - Better Auth shared authentication
- **`db`** - Prisma database schema and client
- **`contracts`** - Shared API contracts/types
- **`eslint-config`** - Shared ESLint configurations
- **`typescript-config`** - Shared TypeScript configurations

## Development

```bash
# Start all apps in development
pnpm dev

# Start specific app
pnpm dev --filter=web    # Web app only
pnpm dev --filter=api    # API only

# Database operations
pnpm prisma:migrate      # Run migrations
pnpm prisma:generate     # Generate Prisma client
```

## Build & Deploy

```bash
# Build all apps
pnpm build

# Build specific app
pnpm build --filter=web

# Production API start
cd apps/api && pnpm start

# Production web start  
cd apps/web && pnpm start
```

## Other Commands

```bash
pnpm lint           # Lint all packages
pnpm check-types    # Type check all packages
pnpm clean          # Clean all build outputs
pnpm fresh          # Clean, install, and build
```
