---
title: Docs are not enough
summary: I was working on USNews's OTC pages, and adding amazon affiliate links and images required some 24 hour constraint to pull new images and not cache them over that, so I built that out, following the companys previously made confluence page for amazon paapi sdk + aws lambda, well it turns out whoever had written that documentation had forgotten to mention that that sdk was incompatible with lambda, so i had to pivot after I thought work was nearly done to move it all to an ecs task. 
date: 2024-06-01
---

I was working on US News's OTC pages, pharmacist-curated catalog, CVS and Amazon. Adding Amazon affiliate links and images had this 24 hour constraint where you had to pull new images and not cache them past that, which I found out in the middle of building it, not before.

The company already had a Confluence page for the Amazon PA-API SDK plus AWS Lambda, so I followed that. I spent about three weeks on it and thought the work was nearly done.

Well, it turns out whoever wrote that documentation forgot to mention that the SDK was incompatible with Lambda. Later someone who actually knew those docs told me that path was never going to work for this pipeline.

I had to pivot and move it all to an ECS task, which took about a week, but we got the images and links refreshing the way Amazon actually required.

TL;DR: don't blindly trust documentation, verify the dependencies and workflows before building everything out and spinning your wheels.