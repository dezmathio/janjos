---
title: Cut list
subtitle: Timestamps for yesterday's matches, so I do not have to remember the loot
description: A local OpenCV and Tesseract pass over the last day's Delta Force recordings. It writes a text file of what happened and when, so editing is not a memory test.
status: active
kind: tool
date: 2026-08-10
updated: 2026-08-12
tags:
  - games
  - ocr
  - python
scratch: true
---

## Why I built it

I record a lot of Delta Force. I am not always sure what loot I actually found, or which bits were worth keeping. After a session the tape is a few hours of fog. Scribbled notes during the match are worse.

I wanted a script I could run against yesterday's recordings that spat out a text file with timestamps. Kill here. Red item there. Something I can scrub to while editing, without relying on memory.

## How it works

OpenCV and Tesseract, on this machine. No cloud vision. `scan` walks a video and writes a timeline. JSON for machines, a `.srt` if I want it on the cut, and a text file I can actually read.

It is looking at the HUD, not "understanding" the match. Combat banners. Red rarity on the ground or in a search grid. The laptop decode modal. Grey loot silhouettes before they flip.

## Current state

Active. Game capture works. Desktop captures that include a browser will false-trigger on random red pixels.
