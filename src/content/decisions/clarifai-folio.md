---
title: Search kept showing the logo
summary: WeddingWire vendors had good photos, but search showed a logo or a random profile shot. We used ClarifAI so a beachfront filter actually came back with a beachfront picture.
date: 2016-06-01
---

WeddingWire vendors had really good photos, but search didn't use them. You'd hit a filter like beachfront and get the company logo, or some random picture off the profile.

This was product's idea. I built it with Bernabas. I did the Elasticsearch mapping and the search UI, and I knew how the ClarifAI tagging worked. Each filter had a synonym list. ClarifAI looked at a photo and gave you a label and a confidence score. If it was high enough, that photo is what showed up in the results instead of the logo.
