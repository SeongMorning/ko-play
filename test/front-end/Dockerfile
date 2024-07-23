# frontend/Dockerfile

# 1. 빌드 단계
FROM node:20 AS build

WORKDIR /app

COPY jpatest/package.json ./
COPY jpatest/package-lock.json ./
RUN npm install

COPY . ./

RUN npm run build

# 2. 배포 단계
FROM nginx:alpine

COPY --from=build jpatest/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
