---
title: Delta Force map tracker
subtitle: Community intel for people who already play
description: Map rotation, room codes, and gameplay events, kept in one place for the people who need them today.
status: active
kind: tool
date: 2026-01-15
updated: 2026-08-11
tags:
  - games
  - maps
  - community
featured: true
repo: https://github.com/dezmathio/delta-force-map-tracker
---

## The idea

Delta Force players already share map intel in the usual messy channels. This tracker is a single place for rotation, room codes, and the events people actually care about during a session.

## Why I built it

I was already collecting this for myself and a few people I play with. A spreadsheet in a Discord channel goes stale in a day. A small tool can stay current if the input is cheap.

## How it works

The public piece is the intel. Room codes change often enough that the page has to be easy to update. What stays private is how some of that data gets fetched.

## Interesting engineering problems

The next itch is reading the game instead of typing. I have been experimenting with fully local OCR on gameplay footage so the tracker can pick map and event text off the screen. No cloud vision API. The footage stays on the machine.

## What I learned

Fan tools die when updating them feels like a second job. The useful version is the one I will still touch after a match.

## Current state

Active. The tracker is in use. The OCR path is still an experiment sitting next to it, not a ship promise.
