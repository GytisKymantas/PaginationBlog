---
title: 'The 10 Useful Networking Commands You Should Know'
date: '2020-07-06'
slug: '/network-commands-200706'
category: 'Internet'
description: 'Learn about useful networking commands that are pre-installed on your computer and will help you know everything about a website.'
tags:
  - 'Mac'
  - 'Archives'
  - 'Linux'
---

What is my IP address? Who is the host of this website? Which mail service is this domain using? There exist [web tools](/internet/tools/best-online-tools-for-webmasters-know-everything-about-websites/2744/) that can uncover these details but this sort of research can also be done using the command line on your computer.

Let’s explore a few essential networking commands that will help you know everything about a website from the terminal itself.

### What is my IP address

```bash
curl https://checkip.amazonaws.com
```

Make a curl or [wget](/software/wget-command-examples/28750/) request to the `checkip.amazonaws.com` and it prints the public IP address of your computer. You can also connect to Akamai’s `whatismyip.akamai.com` domain get your external IP address.

### What is my Private IP address

```bash
ifconfig en0 | grep inet
```

Your computer has a private IP address that only work within the local network. For older Macs with a wired Ethernet port, use en0 for Ethernet interface or en1 for the WiFi interface. The `networksetup -listnetworkserviceorder` command will print a list all network interfaces available on your machine.

### Find the Location of IP address

```bash
curl https://ip2c.org/?ip=8.8.8.8
```

The free 'ip2c' service resolves an IP address to the country.

Or use the `ipapi` service to get more details of an IP address including the city name, timezone and even the latitude and longitude associated with an IP address.

```bash
curl https://ipapi.co/8.8.8.8/json
```

### Check DNS Records

The `dig` command will help you query for any type of DNS records for a domain from the command line.

#### 1. Find the IP address of a website

```bash
dig +short www.labnol.org
```

#### 2. Find the Mail Server of Domain

The Mail Exchange (MX) records specify the incoming mail servers that used for delivering email messages sent to your domain name.

```bash
host -t MX labnol.org
```

#### 3. Print all DNS Records of a Domain

Get a list of all DNS records of a domain including TXT records, MX records and name servers. The name servers handle queries regarding the location of the domain’s website, email and other services.

```bash
dig +nocmd amazon.com any +noall +answer
```

### Who is hosting a website?

Use the `dig` command to find the IP address of a website and then use the same dig command to perform a reverse lookup to find the host of that IP address.

For instance, this command will print the IP address of the Netflix website:

```bash
dig +short netflix.com A | tail -1
```

Use that IP address in the next command to get the hostname:

```bash
dig +nocmd -x 52.11.104.17 +noall +answer
```

### Find the owner of the website

Use the built-in `whois` command to reveal important information about any web domain including the date when it was first registered, the contact details of the website owner, the expiration date of the domain, the name of the domain registrar and so on.

```bash
whois dictation.io
```

You can also query the domain registration details on a specific registrar’s server with the `-h` flag. For instance, the next command performs a whois lookup on a website using the WHOIS server of [Google Domains](/internet/google-domains-review/30355/).

```bash
whois -h whois.google.com reverse.photos
```

### Test Network Connectivity with Ping

The ping command helps you test if a remote host is reachable and whether your machine can connect to it properly.

```bash
ping -c 5 -i 2 labnol.org
```

The above command pings the host 5 time and there’s a 2 second wait between pings.

### Where’s the fault?

If your Internet connection is working but you are unable to reach a website, there could be an issue with an intermediate router that the packets have to pass through to reach the server.

The `traceroute` commands prints the network path from your local computer to the website that the traffic must pass through and this information can be useful for diagnosing connectivity issues.

```bash
traceroute labnol.org
```

Also see: [Essential Tools for Developers](/internet/useful-tools-for-programmers/29227/)
