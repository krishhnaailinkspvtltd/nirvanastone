# Multi-stage build for the VPS + Cloudflare Tunnel deploy pattern.
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
# .data holds the dev/fallback order store when Supabase isn't configured
RUN mkdir -p /app/.data && chown nextjs:nodejs /app/.data
COPY --from=builder --chown=nextjs:nodejs /app/.next-prod/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next-prod/static ./.next-prod/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
