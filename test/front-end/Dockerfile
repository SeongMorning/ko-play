# frontend/Dockerfile

# 1. 빌드 단계
FROM node:20-alpine AS builder

# 2. 종속성 설치 단계
RUN mkdir -p /app
WORKDIR /app

COPY jpatest/ ./

RUN npm install

RUN npm run build

# 3. 배포 단계

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/server.js ./

RUN mkdir -p .next
RUN chown -R nextjs:nodejs .next


# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node server.js