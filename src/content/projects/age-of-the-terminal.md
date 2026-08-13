---
title: Age of the Terminal
subtitle: A Conan-themed text RPG that pretends to be a shell
description: Type go north, take torch, wield sword. Unofficial fan game with a complete loop in the browser.
status: prototype
kind: experiment
date: 2026-02-13
updated: 2026-02-13
tags:
  - games
  - terminal
  - conan
featured: true
repo: https://github.com/dezmathio/age_of_the_terminal
demo: https://dezmathio.github.io/age_of_the_terminal/
---

## The idea

A small text RPG that looks like a terminal. Hyborian Age dressing, parser commands, one ruined tower, one jewel of the serpent. The pun in the title did more work than it had any right to.

## Why I built it

I wanted a complete loop I could finish, not an engine. Parser games are a good constraint. If the verbs are few and the map is small, it either plays or it doesn't.

## How it works

Commands like `go north`, `take torch`, `inventory`, `wield sword`, `open door`. Inventory is a bag plus equipped slots. Light matters. The brass key is not optional.

TypeScript and Vite. No framework. That was the point.

## Interesting engineering problems

A parser that feels fair is harder than a parser that exists. Unknown verbs need a response that teaches, not a shrug. The map is tiny on purpose so the verbs can stay honest.

## What I learned

Shipping a tiny game is a different muscle from shipping a tool. The loop has to close. "I will add combat later" is how these stay in a folder.

## Current state

Prototype, and playable. Unofficial fan game. Conan and the Hyborian Age belong to their rights holders. Non-commercial.
