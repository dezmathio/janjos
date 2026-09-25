---
title: erate-explorer
subtitle: Public E-Rate prices that look odd vs peers, so a person can explain them
description: It pulls USAC Open Data into DuckDB, scores line items against a stated cohort, then Jev decides whether a human should look. It is not a fraud model. The viewer is local, and there is no LLM.
status: active
kind: tool
date: 2026-09-25
updated: 2026-09-25
tags:
  - erate
  - python
  - duckdb
  - jev
featured: true
repo: https://github.com/dezmathio/erate-explorer
---

## Why I built it

I watched a video about people finding discrepancies in contracts using public government data, and I wanted to try that on E-Rate. I also wanted a real use case for Jev, and this felt like a decent one to start with.

The question is whether a price still makes sense next to its peers, not who cheated.

## How it works

Ingest hits USAC Open Data. Build scores Category 1 line items in DuckDB by purpose, product, speed bin, applicant type, urban or rural, then state, then region. Odd rows go to Jev as a typed packet. Jev returns look, mapping, or leftover-puzzle. That is still not a verdict. The local viewer is the queue.

## Current state

Open source at [github.com/dezmathio/erate-explorer](https://github.com/dezmathio/erate-explorer). Virginia plus neighbors, FY2023 to 2025. You need a TypeSafe key. There is no hosted instance.
