---
title: llm-steward
subtitle: A self-hostable LLM gateway kit, the general version of phi-gateway
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

[phi-gateway](/projects/phi-gateway/) was the narrow proof, built around health-tech. llm-steward is the same idea pulled out into a kit I can reuse.

## How it works

LiteLLM is the gateway, with a personal-info guardrail in front of the models. An observability layer backs a dashboard in Postgres, so you can see the traffic going through. There are evals. Under `integrations/cursor-hook/` there is a Cursor pre-prompt hook that checks prompts for personal info before they leave the editor.

LiteLLM, Postgres.

## Current state

Open source at [github.com/dezmathio/llm-steward](https://github.com/dezmathio/llm-steward), MIT licensed. The data is synthetic. The README disclaims any HIPAA, GDPR, or SOC 2 guarantee.
