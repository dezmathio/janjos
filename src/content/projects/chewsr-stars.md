---
title: Building the chewsr × 3★ atlas
subtitle: Michelin 3★ restaurants on a globe, with videos
description: A visualizer for high-end restaurants, tacked onto chewsr so people who like food can look around even if they cannot travel the world to eat there.
status: live
kind: experiment
date: 2026-09-03
updated: 2026-09-03
tags:
  - food
  - maps
  - rails
featured: true
demo: https://chewsr.com/stars
---

Live: [chewsr.com/stars](https://chewsr.com/stars)

## The idea

I was watching a [BeardMeetsFood alt channel video](https://youtu.be/7bc0DhfS5ls) and he was eating at Gordon Ramsay's new restaurant in London. It was a cool perspective on what type of food you would get, with some commentary on the taste, not necessarily coming from a "critic" angle, just what someone might experience going there. And I thought to myself, how can I make a cool little visualizer for all these high end restaurants?

## Why I built it

I built the tool because it's a different way to showcase content that's niche to people who like food, but might not be able to travel all around the world to experience it. And I tacked it onto chewsr because that's already my food decision app so it tied nicely to it.

## How it works

Basically you have a set of restaurants that currently meet the 3 star Michelin star rating throughout the world, and they are set as "stars" on a globe. Some of them are clustered to cities, so when you open a city, you will see a constellation pattern and can click or hover over them, and each one should have a small editorial piece with a video to watch of someone experiencing some part of the restaurant.

Under the hood it's a Rails page with its own layout and one Stimulus controller driving MapLibre GL. First load pulls a cheap GeoJSON of all the places. Click fetches the full detail JSON for that restaurant, including the video. Hover updates map paint properties instead of rewriting the data every time you move the mouse. If WebGL fails, it falls back to a flat map.

## Interesting engineering problems

It's my first time using MapLibre GL and I wanted to tackle some new JS framework and show something that looked interesting and different than typical UIs.

Getting 161 restaurants onto a globe without the page falling over was the main one. City mode draws a constellation with a minimum spanning tree so the pins read as a cluster. The cinematic video panel is wide enough that the map has to reframe so the pin isn't hiding behind it.

## What I learned

You don't have to display search pages as some ordinary kind of formula that 900 other companies have already done. You can just do whatever you feel like is interesting these days, and retrofit the performance learnings from those 900 companies.

## Current state

Live on [chewsr.com/stars](https://chewsr.com/stars).

Still rough around the edges. Deep links into a specific restaurant aren't wired yet even though the JSON routes exist. Social preview still uses the generic Chewsr icon. Map attribution is off on the canvas and should get a static credit in the layout.
