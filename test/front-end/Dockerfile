# frontend/Dockerfile

# 1. 빌드 단계
FROM node:20-alpine AS base

# 2. 종속성 설치 단계
FROM base AS deps
RUN apk add --no-cache libc6-compat
RUN mkdir -p /app
WORKDIR /app

# 애플리케이션 코드 복사 및 빌드
COPY jpatest/package.json ./
COPY jpatest/package-lock.json* ./
RUN npm ci

# COPY jpatest/ ./
# RUN npm install
# RUN npm run build

# 3. 배포 단계

FROM node:20-alpine AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS runner

WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public /app/public

RUN mkdir .next
RUN chown nextjs:nodejs .next


COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["npx", "next", "start", "-p", "3000"]
# CMD ["npm","start"]
