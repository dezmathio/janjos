---
title: jtrack
subtitle: What showed up on the careers boards since yesterday
description: A CLI that pulls jobs from Greenhouse and Ashby, diffs against the last run, and prints what was added or removed.
status: active
kind: tool
date: 2026-07-28
updated: 2026-07-28
tags:
  - jobs
  - cli
  - typescript
scratch: true
---

## The idea

I got tired of opening the same careers pages to see if anything new dropped. jtrack fetches the public ATS feeds, compares them to yesterday's snapshot, and prints the delta.

## How it works

API-first. Greenhouse and Ashby adapters, one company at a time or all of them. Each run writes `data/latest.json` plus a dated snapshot. `--list` reads the snapshot and stays offline.

The useful part is the diff. Same job id in both snapshots is noise. Everything else is what I actually wanted to see.

```ts
export function diffJobs(previous: Job[], current: Job[]): DiffResult {
  const prevById = new Map(previous.map((job) => [job.id, job]));
  const currById = new Map(current.map((job) => [job.id, job]));

  const added: Job[] = [];
  const removed: Job[] = [];
  const unchanged: Job[] = [];

  for (const [id, job] of currById) {
    if (prevById.has(id)) unchanged.push(job);
    else added.push(job);
  }

  for (const [id, job] of prevById) {
    if (!currById.has(id)) removed.push(job);
  }

  const byTitle = (a: Job, b: Job) => a.title.localeCompare(b.title);
  added.sort(byTitle);
  removed.sort(byTitle);
  unchanged.sort(byTitle);

  return { added, removed, unchanged };
}
```

Playwright for boards with no public feed is still a later idea, not a promise.

## Current state

Active on this machine. No public repo yet. Add a company by wrapping the existing fetch helpers and registering the adapter.
