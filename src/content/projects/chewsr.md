---
title: Chewsr
subtitle: Group restaurant decisions without the group-chat stall
description: Swipe through nearby food spots. Results are shown at the end, ranked by most commonly liked
status: live
kind: product
date: 2025-11-01
updated: 2026-02-11
tags:
  - restaurants
  - groups
  - rails
featured: true
pin: true
demo: https://chewsr.com
---

## The idea

It always feels like a chore deciding where to eat with other people.

## Why I built it

People like different things. It's hard to keep track of how many people are gluten free or dairy free or don't like sushi, so I wanted to build a tool that would let people swipe on restaurants in their area that they like, and come to a consensus without having to wrangle an answer out of each other. 

## How it works

You hit the landing page, enter a location. If you'd like, you can check off numerous filters, like gluten free, coffee, etc. Then a session is created. You then can easily share it either in person with a QR code, or tap to share natively on your device to send a text w/ the link to someone. Once you get to the next page, you're basically swiping left/right on restaurants, and at the end, you get to see if there were any overlaps that multiple people liked, or at least get some kind of ranking from most liked.

## Interesting engineering problems

Restaurant data blows. I've tried virtually every different provider out there, Yelp, Google Places, TripAdvisor, Foursquare (yes they still exist). I tried just using LLMs to shape a json response with restaurants in a given zip code, and it actually returned good text data. However, the images it returned were consistently incorrect or hallucinated. I wanted to try out some of the delivery platforms for restaurant data, but they have those locked away and their devrel teams never even got back to me *cough* doordash. 

When I was looking for providers I heard through my friend Chance that fly.io was pretty solid for hosting at a low cost, so I went with that option since they had good reviews, well, when using Yelp, they ended up blocking the entire fly.io ip range, so I had a pretty gnarly hiccup there, which I only discovered the morning after emailing my old CEO about the project for the first time, for him to demo it. A classic footgun moment. I ended up having to learn about reverse proxies and basically wrote a small sinatra server that would take my request from chewsr saying "Hey I wanna start a session at this location with these params", and then that sinatra server on digitalocean would send the actual request to Yelp, and then return the response back to chewsr. Kind of a cool abstraction that will probably come in handy in the future when hardening applications to prevent people from ddosing certain endpoints. 

From a data perspective, Yelp without a doubt has the best images for an app like this, but it's a double-edged sword because Chewsr isn't something millions of people are using, so it's hard to justify their exorbitant API key monthly cost. So I ended up pivoting over to Google Places, which like, per request is actually more expensive than Yelp, but they allow you to be free if you are under a certain amount of traffic, so I took a bit of a hit on image quality there, for cost savings. I think there's a place down the road where LLMs will probably have the best information about restaurants for informing people's decisions, so I'll have to make a future pivot once they reach that threshold.

## What I learned

People will swipe if it lands in front of them, but they tend to bail if it's too hard to get to that point, or they don't understand how to.
It's hard to get returning customers in rural areas when their restaurant options are limited.

## Current state

Live at [chewsr.com](https://chewsr.com). I still treat it as a product under care, not a finished artifact.
