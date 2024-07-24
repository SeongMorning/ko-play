# frontend/Dockerfile

# 1. 빌드 단계
FROM node:20 AS build

RUN mkdir -p /app

WORKDIR /app

COPY jpatest/ ./

RUN npm install

RUN npm run build

# 2. 배포 단계
FROM nginx:alpine

COPY --from=build /app/.next /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

