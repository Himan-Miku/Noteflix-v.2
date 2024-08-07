FROM node:18.14.0-alpine3.17 as builder

RUN npm install -g pnpm

WORKDIR /noteflix

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN ls

RUN pnpm build

FROM node:18.14.0-bullseye-slim

WORKDIR /noteflix

# COPY --from=builder /noteflix/package.json .
# COPY --from=builder /noteflix/pnpm-lock.yaml .
# COPY --from=builder /noteflix/next.config.js ./
COPY --from=builder /noteflix/public ./public
COPY --from=builder /noteflix/.next/standalone ./
COPY --from=builder /noteflix/.next/static ./.next/static
# COPY --from=builder /noteflix/adminSDK.json ./
COPY --from=builder /noteflix/.env ./

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "localhost"

CMD ["node", "server.js"]