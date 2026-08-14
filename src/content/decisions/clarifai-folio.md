---
title: Keyword Search + Showing relevant images
summary: WeddingWire vendors had good photos, but search showed a logo or a random profile shot. We used ClarifAI so a beachfront filter actually came back with a beachfront picture that the vendor had.
date: 2016-06-01
---

WeddingWire vendors had really great photos, but our product always just showed their profile pictures or spotlight pictures they selected. When a bride would search for venues and filter by something like beachfront, the results would still just show that same profile pic.

The Product team came up w/ the idea to build something like this, and the data science team integrated ClarifAI and made a pass on all images to give them confidence scores.

With that info, working with Bernabas, we built a product that essentially took our filters, hooked a list of synonyms to each filter type, then checked against ClarifAI to see what the confidence levels were for each synonym on those images, creating a mapping index using Elasticsearch.

It was my first time using Elasticsearch & the learning curve was real, but we got a really nice working product that raised the bar for what a good feature could look like.