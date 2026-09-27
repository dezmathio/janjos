---
title: phi-gateway
subtitle: Keeping patient identifiers out of stored notes and out of LLM calls
description: A health-tech demo that scrubs personal info twice with Presidio, once before notes are stored and again at a LiteLLM gateway before a prompt reaches a model. The patients are synthetic. It demonstrates the pattern and is not a HIPAA certification.
status: active
kind: experiment
date: 2026-09-27
updated: 2026-09-27
tags:
  - python
  - llm
  - privacy
featured: true
repo: https://github.com/dezmathio/phi-gateway
---

## Why I built it

I wanted to learn the LLM-gateway layer hands-on, LiteLLM specifically, with health-tech and forward-deployed roles in mind.

## How it works

Notes get scrubbed with Microsoft Presidio before they are stored. Prompts get scrubbed again at a LiteLLM gateway before they reach a model. Each clinic gets its own SQLite file, so one tenant's data stays out of another's.

The patients are synthetic, shaped like MITRE Synthea output and split across two fake clinics. Identifiers are planted in the notes on purpose. They double as the answer key for an eval that measures what the scrubber catches and what it misses.

A review turned up a credit card storage gap and a street address leak. Both are fixed: card checks on ingest, and a custom street-address recognizer.

Python, FastAPI, Presidio, LiteLLM, SQLite.

## Current state

Open source at [github.com/dezmathio/phi-gateway](https://github.com/dezmathio/phi-gateway), MIT licensed. It demonstrates the pattern. It is not a HIPAA certification, and the README says so. The generalized version is [llm-steward](/projects/llm-steward/).
