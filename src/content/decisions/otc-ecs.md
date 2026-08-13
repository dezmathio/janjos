---
title: The Lambda path was a dead end for three weeks
summary: OTC affiliate feed needed fresh Amazon images and links every 24 hours. Company docs pointed at Lambda. The PA-API SDK would not run there. I moved the job to ECS and shipped it in about a week.
date: 2024-06-01
---

U.S. News had a pharmacist-curated OTC catalog, CVS and Amazon. Amazon's terms wanted the image and the link refreshed inside 24 hours. Nobody on product had really spelled that out before I was in the middle of building it.

The house way to run jobs was Lambda. I followed that for about three weeks. Then it was obvious the Product Advertising API SDK just did not work in Lambda. Later someone who knew the docs told me that path was never going to work for this pipeline. Would have been nice to know first.

ECS could run the SDK. I rewrote the job onto that and got it out in about a week. The feed still had to keep updating either way.

We were supposed to do a postmortem. It never happened. What I kept: spike the weird Amazon path before burning weeks on the "standard" setup.
