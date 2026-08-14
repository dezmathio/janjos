---
name: qa-dev
description: Before claiming janjos local/dev work is done, open the running Astro dev or preview server in a real browser and exercise the UI. Use when wrapping up UI or content work, saying a Lab filter or page works, or marking a local task done. Do not use after a production deploy (use qa-prod).
---

# QA on dev

You cannot claim a local janjos task is done from the build log, the diff, or a curl of the HTML.

This site has no test suite. Lab filters (`TagFilter.astro`) are client-side. The empty state starts `hidden` and only toggles after a click. First-paint HTML is not a receipt for filter or empty-state claims.

## Receipt

1. Use the local Astro dev server. Default port 4321. Preview is fine after a build.
2. Open that URL in a real browser. Do not skip this. Do not use curl or View Source as the check.
3. Exercise the UI for the claim. Click the Lab filter. Load the project or decision page. Reload and watch first paint vs after click.
4. Capture a screenshot or a concrete observation. That is the receipt.
5. If you cannot open a browser, say so and stop. Do not invent that you checked.

## Fail the claim if

- You only ran a build or only read the source
- You only fetched the HTML
- The local page still shows the old behavior

## Human in the loop

If first paint vs client JS is ambiguous, ask what you should see instead of declaring done.
