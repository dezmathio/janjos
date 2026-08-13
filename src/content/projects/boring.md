---
title: boring
subtitle: Job posts, by keyword, that look like a SaaS wedge
description: A Ruby script that hits SerpAPI with a list of role and industry queries, caches the responses, and dumps a batch of openings to read later.
status: prototype
kind: tool
date: 2025-11-05
updated: 2025-11-05
tags:
  - jobs
  - ruby
  - scripts
scratch: true
---

## The idea

Some job posts are a cry for a small tool. "Data entry" plus "construction", "dispatcher" plus "fleet". boring runs those queries in a batch so I can skim what companies are hiring for the boring work.

## How it works

`boring.rb` takes a query or a `queries.txt` file, a location, and a result cap. SerpAPI does the search. Cache files keep me from burning the free tier while I tweak keywords.

Each hit gets a crude automation score. Manual-entry language goes up. Teacher, intern, part-time go down.

```ruby
def compute_automation_score(job)
  text = [
    job["title"],
    job["company_name"],
    job["description"]
  ].join(" ").downcase

  score = 0
  hits = []
  disqualified = []

  AUTOMATION_KEYWORDS.each do |kw, weight|
    if text.include?(kw)
      score += weight
      hits << kw
    end
  end

  DISQUALIFIERS.each do |kw, penalty|
    if text.include?(kw)
      score += penalty
      disqualified << kw
    end
  end

  { score: score, hits: hits.uniq, disqualified: disqualified.uniq }
end
```

## Current state

Prototype. It lives in a folder named boring, which is accurate. Not a product. A keyword list and a key.
