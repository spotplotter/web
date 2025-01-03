#!/bin/sh

CERT_PATH="/etc/letsencrypt/live/spotplotter.com/fullchain.pem"
KEY_PATH="/etc/letsencrypt/live/spotplotter.com/privkey.pem"

# Check if SSL certificates exist
if [ ! -f "$CERT_PATH" ] || [ ! -f "$KEY_PATH" ]; then
    echo "No SSL certificate found. Starting Nginx temporarily without SSL..."
    nginx -g "daemon off;" &

    # Wait for Nginx to start
    sleep 5

    echo "Obtaining SSL certificate with Certbot..."
    certbot certonly --nginx --non-interactive --agree-tos --email rob@spotplotter.com -d yourdomain.com

    echo "Certificate obtained. Reloading Nginx with SSL..."
    nginx -s reload
fi

# Run Certbot renewal loop every 12 hours
while true; do
    sleep 12h
    certbot renew --quiet
    nginx -s reload
done
