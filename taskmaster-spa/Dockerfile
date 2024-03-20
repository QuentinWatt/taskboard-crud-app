FROM node:18.14.2

RUN apt-get update \
    && apt-get install -y xvfb libnss3 libatk1.0-0 libcups2 libgtk-3-0 libgbm1 libasound2 dbus-x11 \
    && npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 8081

RUN pnpm run build

CMD ["pnpm", "run", "preview"]
