##########
# API Service Dockerfile (no prebuild, tsx runtime)
# Build: docker build -f apps/api/Dockerfile -t my-api .
# Run:  docker run --env-file .env -p 3001:3001 my-api
##########

FROM node:20-slim AS base
WORKDIR /app
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable

# Install only manifest files for dependency resolution
FROM base AS deps
ENV PRISMA_SKIP_POSTINSTALL_GENERATE=1
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/auth/package.json packages/auth/
COPY packages/db/package.json packages/db/
COPY packages/contracts/package.json packages/contracts/
COPY apps/api/package.json apps/api/

# Install all deps without running postinstall scripts (prisma generate will run later)
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy full source (after deps for better caching)
FROM base AS source
COPY . .

# Re-use node_modules from deps stage
FROM base AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /root/.local/share/pnpm /root/.local/share/pnpm
COPY --from=source /app .

# Generate Prisma client (schema lives in packages/db/prisma)
RUN pnpm --filter @repo/db exec prisma generate || echo "Prisma generate skipped"

EXPOSE 3001

# Healthcheck (optional fast fail)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e 'fetch(`http://localhost:${process.env.API_PORT||process.env.PORT||3001}/health`).then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))' || exit 1

# Start API via tsx directly on source
WORKDIR /app/apps/api
CMD ["pnpm","exec","tsx","src/server.ts"]
