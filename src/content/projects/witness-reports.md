---
title: Crime Reports in FiveM
subtitle: Making GTARP more immersive by requiring crimes to be witnessed by NPCs
description: I was playing on a server called Los Angeles Roleplay and noticed a lot of the crime reports that would happen could occur without anyone necessarily witnessing it, think, middle of a empty parking lot and someone sees you breaking into a car. So I picked up Lua and chatted with the main developer and asked to revamp that section, so that these things would rely on "Pedestrians" witnessing them.
status: prototype
kind: experiment
date: 2019-06-01
updated: 2019-06-01
tags:
  - games
  - lua
  - fivem
---

## Why I built it

I had been playing a bunch of GTARP and having fun with it, but the way crimes were reported didn't feel immersive enough, both from the criminal side and the law enforcement side... having to justify why someone committed a crime based on a little dot on a minimap made no sense. So I learned about the game natives, how to see if a pedestrian was in range, had vision of your player at that given moment, and took off from there.

## How it works

If you were doing something that would warrant a npc tattling on you, the script would check nearby pedestrians who have you in their line of sight, within a certain range, and would cause them to emote making a phone call or text, then walking away. On the backend there was a % chance of success, and it fed into a larger crime report system I built to keep things more vague and allow the people roleplaying as cops to actually have to investigate to see what was going on, not just "Billy Bob has stolen the car", more like, burgundy sultan is being lockpicked on this street corner between Strawberry and Vespucci.


## Current state

Done. I parted ways with the project and they iterated on it, but it was nice leap forward for immersion and the playerbase.
