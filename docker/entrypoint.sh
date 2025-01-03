#!/bin/sh

# Start Nginx in the background
nginx -g 'daemon off;' &

# Wait for Nginx to start
sleep 5

# Obtain SSL certificate if not already obtained
certbot certonly --nginx --non-interactive --agree-tos --email rob@spotplotter.com -d yourdomain.com

# Set up a loop to renew the certificate every 12 hours
while true; do
    sleep 12h
    certbot renew
done
