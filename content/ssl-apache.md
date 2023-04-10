---
title: 'How to Install Let’s Encrypt SSL Certificate with Apache on Ubuntu'
date: '2020-02-08'
slug: '/install-ssl-apache-ubuntu-200210'
category: 'Code'
description: 'This tutorial covers installing SSL certificate from scratch on an Apache server running on Ubuntu.'
tags:
  - 'Linux'
---

This step-by-step tutorial will show you how to install Let’s Encrypt SSL certificate for an Apache server running on Ubuntu 18.04. I’ve created a droplet on [DigitalOcean](https://m.do.co/c/2f3074212a93) for this example but the steps should be similar AWS and other environments.

## Install Apache 2

Login to your droplet with root (or use `sudo` with all the following commands).

Check if any Ubuntu packages are outdated.

```
apt update
```

Upgrade the outdated packages to the latest version.

```
apt upgrade
```

Install Apache2

```
apt install apache2
```

Start the Apache Server

```
systemctl start apache2
```

Check if the Apache server is running

```
systemctl status apache2
```

Enable the mod_rewrite package for Apache

```
sudo a2enmod rewrite
```

Restart Apache

```
systemctl restart apache2
```

### Install PHP

Install PHP and restart the Apache server.

```
apt install php libapache2-mod-php
systemctl restart apache2
php —version
```

### Install the CURL package

Install Curl and restart Apache server

```
apt install curl
apt install php7.2-curl
systemctl restart apache2
```

## Install Let’s Encrypt on Apache

Install the certbot client that will help us automatically manage (install, renew or revoke) the SSL certificates on the Apache server.

### Install Certbot

Install the certbot client and the plugin.

```
sudo apt update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot python-certbot-apache
```

### Install Certbot DNS Plugin

Install the certbot DNS plugin for DigitalOcean. This will automatically add the \_acme-challenge TXT DNS records to your domain that are required for authentication. The records are also removed after the certificates are installed.

```
sudo apt-get install python3-certbot-dns-digitalocean
```

This will only work if you are using the DigitalOcean Name Servers with your domain.

### Create DigitalOcean Credentials File

Go to your DigitalOcean account’s dashboard, choose API and choose “Generate New Token”. Copy the token to your clipboard. Inside the terminal, create a new directory ~/.ssh and create a new file to save the credentials.

```
vi ~/.ssh/digitalocean.ini
```

Paste the following line in the credentials file. Replace 1234 with your actual token value.

```
dns_digitalocean_token = 1234
```

Save the file and then run `chmod` to restrict access to the file.

```
chmod 600 ~/.ssh/digitalocean.ini
```

### Install SSL Certificates

Replace `labnol.org` with your domain name. This command will install the wildcard SSL certificate for all subdomains and the main domain.

```
certbot certonly --dns-digitalocean
    --dns-digitalocean-credentials ~/.ssh/digitalocean.ini
    --dns-digitalocean-propagation-seconds 60
    -d "*.labnol.org" -d labnol.org
```

If the certificate is successfully installed, it will add the certificate and chain in the following directory

```
/etc/letsencrypt/live/labnol.org/
```

### Test the SSL Certificate

Go to [ssllabs.com](https://www.ssllabs.com/ssltest/index.html) to test if your new SSL certificate is correctly installed on your domain.

## Configure Apache to Use SSL Certificate

Now that the SSL Certificate is installed, we need to enable SSL for the Apache server on Ubuntu.

### Enable the SSL module for Apache

OpenSSL is installed with Ubuntu but it is disabled by default. Enable the SSL module and restart Apache to apply the changes.

```
sudo a2enmod ssl
sudo service apache2 restart
```

### Update Apache Configuration File

Open the default virtual host configuration file `/etc/apache2/sites-enabled/000-default.conf`and paste the following lines. Replace `labnol` with your domain name.

```
<VirtualHost *:80>
	RewriteEngine On
	RewriteRule ^(.*)$ https://%{HTTP_HOST}$1 [R=301,L]
</VirtualHost>
<VirtualHost _default_:443>
	ServerAdmin amit@labnol.org
	ServerName labnol.org
	DocumentRoot /var/www/html

	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined

	SSLEngine on
	SSLCertificateFile /etc/letsencrypt/live/labnol.org/fullchain.pem
	SSLCertificateKeyFile /etc/letsencrypt/live/labnol.org/privkey.pem
</VirtualHost>
```

Save the file and restart Apache. The `SSLCertificateFile` and `SSLCertificateKeyFile` files were saved by certbot in the `/etc/letsencrypt/live` directory.

### Adjust the Firewall

In some cases, you may have to enable Apache on SSL port 443 manually with the following command.

```
sudo ufw allow "Apache Secure"
```

Restart Apache. All your HTTP traffic will automatically redirect to the HTTPS version with a 301 permanent redirect.

```
sudo service apache2 restart
```

### Verify Auto-Renewal Process

Your Let's Encrypt SSL certificate will auto-expire every 90 days. Go to the `/etc/cron.d/` folder and you should see a certbot file. This cron job will automatically renew your SSL certificate if the expiration is within 30 days.

You can also run the following command to verify if the renewal process is correctly setup.

```
sudo certbot renew --dry-run
```
