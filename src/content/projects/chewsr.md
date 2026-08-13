---
title: Chewsr
subtitle: Group restaurant decisions without the group-chat stall
description: Swipe through nearby places, invite the table, and let the overlap pick dinner.
status: live
kind: product
date: 2025-11-01
updated: 2026-02-11
tags:
  - restaurants
  - groups
  - rails
featured: true
demo: https://chewsr.com
---

## The idea

A group trying to pick a restaurant in a chat thread is a special kind of stall. Chewsr puts nearby places on cards and lets people swipe. The overlap is the answer.

## Why I built it

I kept watching groups lose twenty minutes to "I'm fine with anything." I wanted something you can start alone and invite people into, not another scheduling app.

## How it works

You set a location and a radius, then swipe through places. Friends join the session and swipe the same deck. Matches show up without anyone having to perform a preference in public.

Start alone. Invite later. That order matters.

## Interesting engineering problems

Restaurant data is the annoying part. I have gone through more than one provider. Yelp from Fly.io blew up the morning I needed a demo, which is how a Sinatra proxy ended up on a droplet. That story is under Decisions.

The swipe UI has to feel disposable. If a card takes too long to load, people bail back to the group chat.

## What I learned

The swipe is the product. Filters and data sources matter, but if the session feels like work, nobody finishes it.

This also ate err.day. The earlier habit tracker was me asking "what did I eat." Chewsr is the same appetite pointed at a group.

## Current state

Live at [chewsr.com](https://chewsr.com). I still treat it as a product under care, not a finished artifact.
