---
title: CMS dropped the file and we had a couple of days
summary: Medicare rankings at U.S. News ran off an annual CMS dump. The spec was a Google Doc that kept moving. I built the loaders against a guessed October schema so the real file could ship in the two or three day window.
date: 2024-10-01
---

U.S. News publishes Medicare plan rankings from CMS.gov data that shows up once a year. After that dump the industry window is two or three days. Miss it and you are late to every other site in the vertical. The product was a methodology layer on those rankings, a read on whether plans were as good as they looked.

The spec was a BA Google Doc. It changed while I was writing the ETL. The PM often had no answers and sent me to the BAs. They were who I actually had to chase. Prior years still had to load. I wrote most of the Python and Postgres. A team lead helped some. I could not wait for the real file to exist before I wrote the loaders.

So I built them against a hypothetical October schema. When CMS published, the work was swapping in the real columns and running. Launch was quiet. The guessing was already done.
