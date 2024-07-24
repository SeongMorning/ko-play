# frontend/Dockerfile

# 1. 빌드 단계
FROM node:20-alpine AS builder

# 2. 종속성 설치 단계
RUN mkdir -p /app
WORKDIR /app

COPY jpatest/package*.json ./

RUN npm install

# 애플리케이션 코드 복사 및 빌드
COPY jpatest/ ./
RUN npm run build

# 3. 배포 단계

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public /app/public
COPY --from=builder /app/.next /app/.next

RUN chown -R nextjs:nodejs /app


# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["npx", "next", "start", "-p", "3000"]

