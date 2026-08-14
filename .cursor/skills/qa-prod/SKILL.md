---
name: qa-prod
description: After a janjos deploy, verify the change on the live site in a real browser. Use when the task is production, live, janjos.lol, GitHub Pages, or post-deploy. Do not use this as a substitute for the local dev check (use qa-dev first).
---

# QA on prod

You cannot claim the live site is updated from a green GitHub Action, a push to `master`, or a curl of the HTML.

Lab filters are client-side. Check the real page.

## Receipt

1. Open the live site plus the path for the change in a real browser. Do not skip this.
2. If you just pushed, wait until the GitHub Pages deploy has finished. Source on disk is not the live site.
3. Exercise the UI for the claim. Click the Lab filter. Load the project or decision page. Hard-refresh if a cached old page would hide the change.
4. Capture a screenshot or a concrete observation. That is the receipt.
5. If you cannot open a browser, say so and stop. Do not invent that you checked.

## Fail the claim if

- You only watched CI
- You only fetched the HTML
- Live still shows the old behavior

## Human in the loop

If cache vs a real miss is ambiguous, ask instead of declaring done.
