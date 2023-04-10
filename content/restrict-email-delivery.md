---
title: 'Block All Incoming and Outgoing Emails Except Specific Whitelisted Domains'
date: '2020-03-07'
slug: '/block-incoming-gmail-200306'
category: 'Internet'
description: 'Learn how to block all incoming and outgoing emails in Gmail except for specific whitelisted domain and email addresses.'
tags:
  - 'Google Workspace'
  - 'Gmail'
---

The finance team in an organization would like to use Gmail for internal communication only. The corporate email policy restricts the finance team from sharing any files or email messages with external teams but the employees are allowed to exchange emails within the team.

Google makes it easy to implement such an email policy in Gmail for GSuite customers.

To get started, sign-in to [admin.google.com](https://admin.google.com/AdminHome?hf=ServiceSettings/service=email&subtab=filters) as your GSuite domain admin and go to Apps > GSuite Core Services > Gmail > Advanced Settings.

Inside the General Settings tab, navigate to Restrict Delivery and click the Configure button to restrict the domains that your employees are allowed to exchange emails with.

Under the Add addresses section, specify one or more domains and email addresses that employees are allowed to send and receive email messages from.

You can specify inputs in the following format:

1. `harvard.edu` - Allow emails from everyone in the domain
2. `*.harvard.edu` - Allow emails from all subdomains
3. `finance.harvard.edu` - Allow emails from a specific subdomain
4. `admin@harvard.edu` - Allow emails from an email address

When adding domains in the whitelist, it is recommended that you turn on sender authentication to disallow spoofed emails (where the actual sender is different from the FROM address mentioned in the email header). Gmail uses the SPF and DKIM records to verify if the sender is authenticated.

Save the settings and employees would be limited to sending emails to specific domains only.
