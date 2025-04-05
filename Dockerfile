FROM node:20.18.1-alpine3.20 AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run compile

FROM node:20.18.1-alpine3.20 AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/config/ ./config/
COPY --from=builder /app/lib/ ./lib/
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/public/ ./public/
COPY --from=builder /app/package.json ./
EXPOSE 3031
CMD node lib