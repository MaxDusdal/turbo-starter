# CampusClock Stack

A full-stack TypeScript monorepo built with Turborepo, featuring a Fastify API and Next.js web app.

## Prerequisites

- Node.js 18+ 
- pnpm 9+

## Quick Start

```bash
# Install dependencies
pnpm install

# Generate Prisma client
pnpm prisma:generate

# Start development
pnpm dev
```

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
