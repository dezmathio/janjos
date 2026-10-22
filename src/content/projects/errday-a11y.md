---
title: err.day a11y
subtitle: Storefront accessibility check, reviewed by hand before it goes out
description: Shop owners send a store URL and an email. A private Playwright scanner on my own PC picks the scan up from a queue, and I read every report before it is sent. A technical snapshot, not a certificate or a legal guarantee of ADA compliance.
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

I built it first for a family member's Shopify store, when accessibility complaints became a worry. Then I opened it up to other small shops with the same worry. It shares the domain with the paused [err.day](/projects/err-day/) nutrition tracker.

## How it works

The form on err.day takes a store URL, an email, and an optional note. That goes into a queue in a Rails app backed by SQLite. A polling worker in WSL on my PC, authenticated with a token, picks up the scan and runs Playwright against the store in a real browser. ntfy pings me when something needs attention. Each report gets a read-through by hand before it goes out.

Rails, SQLite, Playwright, ntfy.

## Current state

Live at [err.day/a11y](https://err.day/a11y). The scanner code is private. An automated scan catches a lot, but not everything. It is not legal advice and not a compliance guarantee.
