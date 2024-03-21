FROM ubuntu:23.10 AS base

ENV DEBIAN_FRONTEND noninteractive

# Install dependencies
RUN apt update
RUN apt install -y software-properties-common
RUN add-apt-repository -y ppa:ondrej/php
RUN apt install -y php8.2\
  php8.2-cli\
  php8.2-common\
  php8.2-fpm\
  php8.2-mysql\
  php8.2-zip\
  php8.2-gd\
  php8.2-mbstring\
  php8.2-curl\
  php8.2-xml\
  php8.2-bcmath\
  php8.2-pdo

# Install php-fpm
RUN apt install -y php8.2-fpm php8.2-cli

# Install composer
RUN apt install -y curl
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install nginx
RUN apt install -y nginx
COPY nginx.conf /etc/nginx/sites-available/default

# Install MySQL client
RUN apt-get install -y default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

COPY start.sh /start.sh
COPY .env.example .env

COPY . /var/www/html
WORKDIR /var/www/html

RUN chown -R www-data:www-data /var/www/html

RUN composer install

EXPOSE 80

CMD ["sh", "/start.sh"]