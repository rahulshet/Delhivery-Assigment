FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production || npm install --legacy-peer-deps --production
COPY . .
EXPOSE 3026
CMD ["node","src/server.js"]