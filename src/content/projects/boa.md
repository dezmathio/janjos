---
title: boa
subtitle: An Elixir load testing tool so a newsletter could actually announce a new feature
description: A mothership fans tasks to workers that hit the site with HTTP and headless browsers. Built when a Wedding Ideas launch got blocked over blast-radius fear.
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

WeddingWire was about to send a newsletter showcasing Wedding Ideas, a new app using a rails engine mount on our monolith, kind of uncharted territory for us at the time. A Director of Engineering blocked the launch. The worry was blast radius on a site with millions of members. Nobody had a clean answer for how much concurrent traffic the send would produce, so the safe move was no.

I wanted a number. How many headless sessions until the thing fell over, so we could pre-spin capacity instead of guessing.

## How it works

The repo is named boa. Built with Elixir at the time because I had just been to ElixirConf and was feeling inspired. A CLI takes a request count and a URL, then a master node connects to slave nodes and fans `Task`s through a supervisor.

Workers time HTTP with HTTPoison. The browser path uses Wallaby and Hound in front of PhantomJS, spawned using Porcelain. The proof of concept walks a Wedding Ideas page and checks whether it still looks like a 200, a 404, or a 500. When the run finishes you get worker counts, successes, failures, and min/avg/max times.

That is the concurrency cliff, on a neat little dashboard frontend.

## Current state

Built for that use case, private repo. PhantomJS is a fossil these days. Sitting in my github repo cemetery.
