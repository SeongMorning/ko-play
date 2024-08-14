FROM node:20-alpine
RUN mkdir -p /app
WORKDIR /app

COPY . .

RUN npm install
RUN npm i
RUN npm run build

EXPOSE 3000
ENV PORT 3000
CMD ["npm","start"]
