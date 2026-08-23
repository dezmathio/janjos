---
title: Film Props
subtitle: Fictional User Interfaces meant to be in the background of a scene in a film
description: Local Vite scenes for movie GUI. Cylon uplink, a cop-show database search, a password crack, a decryption console, a license plate reader. Not real tools, just meant to look like it.
status: prototype
kind: experiment
date: 2026-03-04
updated: 2026-03-12
tags:
  - film
  - typescript
  - gui
scratch: true
---

## Why I built it

Movie computer screens are pretty fun to look at if you know anything about what they're doing, sql queries, running stuff in the terminal, etc. So I wanted to kind of just prototype a bunch of different ideas and see what I could come up with. It's all very rudimentary for now, but was a fun little day project to mess around with.

## How it works

Vite, TypeScript, one HTML file per scene so you can fullscreen a single shot. The first Cylon scene is a config object. Palette, glyph pool, a table of phases. A shared loop dumps fake packets until the session drops.

## Some examples

They all have the same kind of vibe coded feel to them, but I wasn't exactly going for the perfect look, just trying out different configurations and seeing if anything felt immersive. I was heavily inspired after watching battlestar galactica and watching [this scene in particular](https://youtu.be/6CkDyc1TLrQ).

<div class="video">
  <iframe
    src="https://www.youtube-nocookie.com/embed/6CkDyc1TLrQ"
    title="Cylon Virus Attack, Battlestar Galactica"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

![Film Props picker with six scene cards](/projects/film-props/picker.png)

![Cylon Uplink v1, a red Colonial Network Defense terminal](/projects/film-props/cylon-v1.png)

![Cylon Uplink v2, Battlestar CIC cascade](/projects/film-props/cylon-v2.png)

![LEO API federated database search](/projects/film-props/database-search.png)

![Password crack attempt feed and metrics](/projects/film-props/password-crack.png)

![Decryption console cipher matrix](/projects/film-props/decryption.png)

![License plate reader camera and readout](/projects/film-props/license-plate.png)

## Current state

Prototype / for fun.
