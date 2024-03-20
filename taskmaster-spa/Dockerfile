FROM node:18.14.2

WORKDIR /app

RUN npm install -g pnpm
RUN sudo apt-get update && apt-get install xvfb

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 8081

RUN pnpm run build

CMD ["pnpm", "run", "preview"]
