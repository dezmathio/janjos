---
title: boa
subtitle: An Elixir load probe so a newsletter could actually send
description: A mothership fans work to workers that hit the site with HTTP and headless browsers. Built when a Wedding Ideas launch got blocked over blast-radius fear.
status: prototype
kind: tool
date: 2017-05-24
updated: 2017-05-24
tags:
  - elixir
  - load
  - weddingwire
featured: true
---

## Why I built it

WeddingWire was about to send a Wedding Ideas newsletter. A Director of Engineering blocked the launch. The worry was blast radius on a site with millions of members. Nobody had a clean answer for how much concurrent traffic the send would produce, so the safe move was no.

I wanted a number. How many headless sessions until the thing fell over, so we could pre-spin capacity instead of guessing.

## How it works

The repo is named boa. The Mix app calls itself Squeeze. A CLI takes a request count and a URL, then a master node connects to slave nodes and fans `Task`s through a supervisor.

Workers time HTTP with HTTPoison. The browser path uses Wallaby and Hound in front of PhantomJS. The proof of concept walks a Wedding Ideas page and checks whether it still looks like a 200, a 404, or a 500. When the run finishes you get worker counts, successes, failures, and min/avg/max times.

That is the concurrency cliff, as a printout.

## Current state

Proof of concept, private repo. PhantomJS is a fossil. The decision it unblocked is the part that still matters.
