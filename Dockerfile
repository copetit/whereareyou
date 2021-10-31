FROM node:16-alpine

WORKDIR /app
COPY ./backend/package.json ./
RUN npm install
COPY ./backend ./
CMD ["npm", "run", "start:dev"]
