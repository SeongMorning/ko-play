# # frontend/Dockerfile

# # 1. 빌드 단계
# FROM node:20-alpine AS builder

# # 2. 종속성 설치 단계
# RUN mkdir -p /app
# WORKDIR /app

# COPY jpatest/ ./

# RUN npm install

# RUN npm run build

# # 3. 배포 단계

# FROM node:20-alpine AS runner

# WORKDIR /app

# ENV NODE_ENV production

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next

# RUN mkdir -p .next
# RUN chown -R nextjs:nodejs .next


# # COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# # COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

# EXPOSE 3000
# ENV PORT 3000

# CMD ["npx", "next", "start", "-p", "3000"]

# 1. 빌드 단계
FROM node:20-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 종속성 설치
COPY package*.json ./
RUN npm install

# 애플리케이션 코드 복사 및 빌드
COPY . .
RUN npm run build

# 2. 실행 단계
FROM node:20-alpine AS runner

WORKDIR /app

# 종속성 설치
COPY --from=builder /app/node_modules /app/node_modules

# 빌드 아티팩트 복사
COPY --from=builder /app/public /app/public
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/package*.json /app/

# 사용자 설정
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

# 애플리케이션 시작
CMD ["npm", "start"]