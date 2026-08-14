---
title: Managing crazy deadlines and rewrites
summary: Medicare rankings at U.S. News ran off an annual CMS.gov file dump. The spec was in a Google Doc that kept changing. I built the loaders against a guessed October schema so the real file could ship in the two or three day window.
date: 2024-10-01
---

Every year in October, CMS.gov releases medicare rankings data, so all kinds of scores on different plans for all the providers, sometimes they will release new columns and data shapes as well. When I was working at USNews I was tasked with handling a new methodology implementation, which was complex and unknown, but also with making the current ETL flow work with previous year's data shapes. 

The difficult part was knowing whether or not our loader was going to work with the new shape that was to come from CMS.gov, so I made the columns match what they had communicated would be potentially added to future proof ourselves.
But at the same time one thing that proved difficult was not having a clear picture of whether or not the methodology was good until a prototype pass was done, so I would do some work, get some results, and have to wait for feedback on it, and then as that happened, product and business would rewrite the rules to account for it, which led to a lot of back and forth and rewrites. 

Thankfully, when the files were finally released, it didn't require a lot of adjusting column name wise, nor have any unexpected shapes, so our loader worked successfully and we were able to run the methodology and provide the right metrics for editorial and the team.