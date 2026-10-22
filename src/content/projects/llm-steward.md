---
title: llm-steward
subtitle: A self-hosted LLM gateway kit, built from phi-gateway
description: LiteLLM with a personal-info guardrail, a Postgres-backed dashboard of what goes through the gateway, evals, and a Cursor hook that checks prompts before they leave the editor. No HIPAA, GDPR, or SOC 2 guarantee.
status: active
kind: tool
date: 2026-09-27
updated: 2026-09-27
tags:
  - llm
  - privacy
featured: true
repo: https://github.com/dezmathio/llm-steward
---

## Why I built it

[phi-gateway](/projects/phi-gateway/) proved the idea for health-tech. llm-steward turns the same idea into a kit I can reuse.

## How it works

LiteLLM is the gateway. A Presidio guardrail checks prompts for personal info before they reach a model. Each team can turn it on. `guardrails/custom_recognizers.py` adds recognizers for employee IDs, project codes, and internal IP addresses. `guardrails/custom_callback_handler.py` logs each request to Postgres. A FastAPI dashboard in `dashboard/` shows that traffic. Evals in `evals/` run test prompts through the gateway and score the answers against the per-category thresholds in `evals/thresholds.yaml`. A Cursor hook in `integrations/cursor-hook/` checks each prompt for personal info before it leaves the editor. The hook uses the same Presidio rules as the gateway.

**Stack:** LiteLLM, Presidio, Python, FastAPI, Postgres, Docker Compose.

## Current state

Open source at [github.com/dezmathio/llm-steward](https://github.com/dezmathio/llm-steward), MIT licensed. All data is synthetic. llm-steward makes no HIPAA, GDPR, or SOC 2 guarantee, and the README says so.
