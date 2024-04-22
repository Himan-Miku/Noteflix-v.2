FROM node:18.14.0-alpine3.17 as builder

RUN npm install -g pnpm

WORKDIR /noteflix

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:18.14.0-bullseye-slim

WORKDIR /noteflix

COPY --from=builder /noteflix .

EXPOSE 3000

CMD ["pnpm", "start"]