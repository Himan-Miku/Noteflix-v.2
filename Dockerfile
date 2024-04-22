FROM node:18.14.0-alpine3.17

RUN npm install -g pnpm

WORKDIR /noteflix

COPY package*.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]