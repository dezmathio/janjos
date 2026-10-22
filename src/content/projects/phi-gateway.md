---
title: phi-gateway
subtitle: Masks patient identifiers before storage and again before any model call
description: A health-tech demo. A FastAPI app scrubs synthetic visit notes with Presidio before it stores them. A LiteLLM proxy scrubs every prompt again before it reaches a model. It demonstrates the pattern. It is not a HIPAA certification.
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

I wanted hands-on time with the LLM gateway layer, LiteLLM in particular. I built it with health-tech and forward-deployed roles in mind.

## How it works

`scripts/make_notes.py` builds synthetic visit notes from Synthea-shaped CSVs. It splits the patients into two fake clinics, Clinic A and Clinic B. It plants identifiers in the notes and records them in `notes_truth.jsonl` as an answer key.

The FastAPI app takes each note at `POST /api/tenants/{tenant_id}/ingest`. `app/scrub.py` runs Presidio over the note before anything is stored. Custom recognizers catch MRNs, `555` phone numbers, US street addresses, and a medication list. Each clinic gets its own SQLite file. The database keeps the scrubbed text and the finding metadata. It does not keep the matched values.

Prompts go out through a LiteLLM proxy. Its `presidio-pre-call` guardrail runs a second Presidio pass before the model sees anything. Each clinic has its own virtual key with a spend cap. Clinic A's key gets a 403 on Clinic B's query endpoint.

`scripts/eval.py` compares what the scrubber found against the answer key. It reports what the scrubber caught and what it missed.

A review found two gaps. Credit card numbers could reach storage, because ingest did not check for them. Street addresses leaked through. Ingest now runs the same entity list as the gateway, and that list includes `CREDIT_CARD`. A custom `US_STREET_ADDRESS` recognizer now runs at ingest and at the gateway.

**Stack:** Python, FastAPI, Presidio, spaCy, LiteLLM, SQLite, Docker Compose.

## Current state

Open source at [github.com/dezmathio/phi-gateway](https://github.com/dezmathio/phi-gateway), MIT licensed. Every patient is synthetic. It demonstrates the pattern. It is not a HIPAA certification, and the README says so. [llm-steward](/projects/llm-steward/) turns the same idea into a reusable kit.
