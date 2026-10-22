---
title: err.day a11y
subtitle: Storefront accessibility check, reviewed by hand before it goes out
description: Shop owners send a store URL and an email. A Playwright scanner on my PC scans the store. I review every report before it goes out. The report is a technical snapshot, not a certificate.
status: live
kind: product
date: 2026-10-21
updated: 2026-10-21
tags:
  - rails
  - accessibility
featured: true
demo: https://err.day/a11y
---

Live: [err.day/a11y](https://err.day/a11y)

## Why I built it

I first built it for a family member's small Shopify store, when they got worried about accessibility complaints. Now I offer it to other small shops with the same worry. It shares the domain with the paused [err.day](/projects/err-day/) nutrition tracker.

## How it works

A shop owner fills in the form at err.day/a11y. The form asks for a store URL, an email, and an optional note. The Rails app on err.day saves the request to a queue in SQLite. A worker in WSL on my PC polls that queue with a token. The worker scans the store with Playwright in a real browser. ntfy sends me alerts. I review each report by hand before it goes out.

The report lists each issue, the page it is on, and how to fix it. It flags useless alt text, such as a filename, and not only missing alt text. It marks hosted checkout and login pages separately, because the shop owner cannot edit them. The scan also comes with an accessibility footer for the store. The footer gives customers a way to report a barrier or ask for help. It is not an overlay widget.

**Stack:** Rails, SQLite, Playwright, ntfy.

## Current state

Live at [err.day/a11y](https://err.day/a11y). The scanner code is private. An automated scan catches a lot, but not everything. The report is not legal advice. It is not a guarantee of ADA compliance.
