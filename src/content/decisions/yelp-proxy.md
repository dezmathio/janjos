---
title: I learned Yelp blocked Fly the morning of a demo
summary: I sent a working Chewsr overnight for feedback. In the morning the demo was 500s. Yelp had started refusing Fly. I spent that morning learning reverse proxies and standing one up in Sinatra.
date: 2025-11-20
project: chewsr
---

I had a full happy path. Swipe, match, the thing actually worked. I sent it overnight to a CEO I used to work for so they could click around in the morning and tell me what was dumb.

Morning of, 500s. My laptop still ran it. Fly did not. Yelp had not blocked me while I was building. They waited until the app was sitting on production IPs, or I had just never hit those IPs the way a real demo does. I found out with someone about to open the link.

So I spent that morning learning what a reverse proxy was, then writing one. Sinatra, because I already knew Ruby and I did not have time to become a networking person. It lives on a DigitalOcean droplet. Chewsr on Fly asks the proxy. The proxy asks Yelp. The API key stays on the droplet. Yelp sees a random VPS instead of Fly.

I did not want a second app. I wanted the cards to load before they finished coffee.
