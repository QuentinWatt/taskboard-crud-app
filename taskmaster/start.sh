#!/bin/sh

echo "Starting services..."
service php8.2-fpm start
nginx -g "daemon off;" &
echo "Ready."
tail -s 1 /var/log/nginx/*.log -f