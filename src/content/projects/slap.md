---
title: slap
subtitle: When did I last do this
description: A local board where each row is a thing I meant to keep doing. Click it and the age resets to today. Oldest floats to the top.
status: prototype
kind: tool
date: 2026-07-09
updated: 2026-07-09
tags:
  - habits
  - local
scratch: true
---

## The idea

Not a streak app. A question: how long has it been since I last did X. slap answers that without a login.

## How it works

A tiny Express server on localhost. Tasks live in a gitignored JSON file. Cadence is optional. Color is optional. The only verb that matters is slap.

## Current state

Prototype, local-only. If the process is not running, the board does not exist. That is fine.
