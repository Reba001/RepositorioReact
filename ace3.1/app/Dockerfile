# Stage 0 - Build Frontend Assets
FROM node:12.16.3-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
ENV PORT=3000
COPY . .
# start app
CMD ["npm", "start"]
