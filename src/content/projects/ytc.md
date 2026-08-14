---
title: YTC
subtitle: YouTube transcript converter, sunsetted
description: A Chrome extension and Rails backend that pulled a transcript off a video with one click. I turned it off instead of keeping a server warm for a tool I was not using.
status: archived
kind: tool
date: 2025-10-24
updated: 2025-10-30
tags:
  - youtube
  - chrome-extension
  - rails
featured: true
pin: true
demo: https://chromewebstore.google.com/detail/ytc-copy-youtube-transcri/bodkfiaicfaoblnefjfmkdcbaijfeike?hl=en
---

## The idea

Click once on a YouTube video, get a transcript you can actually use. No caption hunting, no copy-paste from a panel that was not built for reading nor scrolling.

## Why I built it

I wanted a way to grab the transcript text quickly, so that i didn't have to watch another freaking 45 minute video and then have viewers remorse. 

## How it works

The extension talked to a Rails app. Profiles, config, the usual amount of machinery for something that started as one button. Fly.io held the backend for a while.
I tried a few different LLMs for the summarization and ended up implementing it with Gemini Flash 2.5 at the time, it was the cheapest for the task and was relatively quick.

## How we summarized

The model never saw YouTube's transcript panel. The extension pulled timed text, dropped timestamps and cue junk, and preferred English. Short videos went in one shot. Long ones were split on sentence boundaries with a one-sentence overlap, summarized in pieces, then merged with the repetition squeezed out. Cache keys included the prompt version, so changing the recipe actually changed the output.

The prompts themselves stayed tiny on purpose. "Be concise. Fast." was a cost choice, not a taste choice. Once I stopped using the tool weekly, even that was too much server to keep warm. Paste into whatever model you like now. Ask it for the takeaways yourself.

## What I learned

A tool with a server has a heartbeat. If I am not using it weekly, I am paying for a ghost. Sunsetting is a status, not a failure.

## Current state

Sunsetted, the client side copy button still exists, but i got rid of the backend summarization components, you can just paste it into your favorite LLM now and ask for a nice summary with interesting takeaways. The extension is still on the [Chrome Web Store](https://chromewebstore.google.com/detail/ytc-copy-youtube-transcri/bodkfiaicfaoblnefjfmkdcbaijfeike?hl=en).

