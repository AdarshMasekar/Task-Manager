FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

RUN addgroup -g 1001 nodeuser && \
    adduser -u 1001 -G nodeuser -s /bin/sh nodeuser

RUN chown -R nodeuser:nodeuser /app

USER nodeuser

RUN npm rebuild bcrypt

CMD ["node", "server.js"]
