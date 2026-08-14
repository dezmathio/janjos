---
title: Delta Force Map Tracker
subtitle: Community tool for knowing map rotation/schedule
description: Seasonal Map rotation, Daily room codes for Delta Force Operations
status: live
kind: tool
date: 2026-01-15
updated: 2026-08-11
tags:
  - games
  - maps
  - community
featured: true
repo: https://github.com/dezmathio/delta-force-map-tracker
demo: https://dezmathio.github.io/delta-force-map-tracker/
---

## The idea

The Chinese team behind Delta Force are great and produce really high quality work, but their communications for the global release are sometimes lackluster, releasing the information in cryptic timezones, with infographics in patch notes, making it super hard to know which maps will be available at what time.

## Why I built it

I wanted to make something that could take those season schedule infographics and show a little calendar view of when they will be up. That way you didnt have to go check the patch notes and scroll down super far to find info and then translate the utc timezone into your own time. I eventually managed to add daily codes, which are a huge puzzle to figure out organically.

## How it works

It is just a calendar view of the schedule they provide with timezones adjusted to the viewer's timezone. 
The daily codes portion is a newer addition, based on some clever workarounds I found on their pages unauthed frontend.

## Interesting engineering problems

I think the scheduling stuff was pretty straight forward, I made it having in mind that each season has its own schedule and maps and difficulties, so I needed to make it modular enough to be hot swappable like that.

One of the cooler eng feats came from the daily code portion. To do it normally, you need to go into the map and find these hieroglyphs on the wall, and then go into a different game mode on a specific map that you cannot single queue into, so it's rng even getting that map, to find another hieroglyph. Well, as it turns out, those things are programmatically generated.

There's an official tools page that already has the daily passwords, no login. The catch is every request is signed in their frontend JS, so you cannot just hit a URL. I spent a while in that client figuring out how they mint the signature, then wrote a python script that rebuilds the signed request, maps their internal map ids to the names people actually use, and dumps a json file. A GitHub Action runs that once a day. The public page only reads the json. The signing key stays in repo secrets.

Here's the whole implementation just to get the request to return those keys from their API, all open sourced.

```python
#!/usr/bin/env python3
"""Fetch daily Delta Force password-room codes and write room-codes.json.

Requires env:
  DF_ROOM_APPKEY  - signing appkey (store in GitHub Actions secrets)

Optional env:
  DF_ROOM_APP_ID  - defaults to 10005
  DF_ROOM_API_BASE - defaults to https://sg-act.playerinfinite.com
"""

from __future__ import annotations

import hashlib
import json
import os
import sys
import urllib.error
import urllib.request
import uuid
from datetime import datetime, timezone
from pathlib import Path

MAP_ORDER = [
    ("zero_dam", "Zero Dam"),
    ("longbow_valley", "Layali Grove"),
    ("bakshe", "Brakkesh"),
    ("spaceport", "Space City"),
    ("tide_prison", "Tide Prison"),
    ("az3", "AZ3"),
]

API_PATH = "/api/proxy_direct/logicial/DfTools/GetPrivateRoomKey"


def require_env(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        print(f"Missing required env var: {name}", file=sys.stderr)
        sys.exit(1)
    return value


def sign_url(path_with_query: str, appkey: str) -> str:
    # Matches official HQ client: md5("/" + path?query + "&appkey=" + appkey)
    payload = f"{path_with_query}&appkey={appkey}"
    return hashlib.md5(payload.encode("utf-8")).hexdigest()


def fetch_codes(appkey: str, app_id: str, api_base: str) -> dict:
    user = str(uuid.uuid4())
    ts = str(int(datetime.now(timezone.utc).timestamp()))
    path_with_query = f"{API_PATH}?u={user}&a={app_id}&ts={ts}"
    signature = sign_url(path_with_query, appkey)
    url = f"{api_base.rstrip('/')}{path_with_query}&s={signature}"

    req = urllib.request.Request(
        url,
        method="GET",
        headers={"User-Agent": "delta-force-map-tracker/1.0 (+github-actions)"},
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        body = json.loads(resp.read().decode("utf-8"))

    if body.get("code") != 0 or not isinstance(body.get("data"), dict):
        raise RuntimeError(f"Unexpected API response: {body}")
    return body["data"]


def build_document(raw: dict) -> dict:
    codes = []
    for key, label in MAP_ORDER:
        if key not in raw:
            continue
        codes.append({"map": label, "key": key, "code": str(raw[key])})

    missing = [label for key, label in MAP_ORDER if key not in raw]
    if missing:
        print(f"Warning: missing maps in API payload: {', '.join(missing)}", file=sys.stderr)

    return {
        "updated_at": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "source": "DfTools/GetPrivateRoomKey",
        "codes": codes,
    }


def main() -> None:
    appkey = require_env("DF_ROOM_APPKEY")
    app_id = os.environ.get("DF_ROOM_APP_ID", "10005").strip() or "10005"
    api_base = (
        os.environ.get("DF_ROOM_API_BASE", "https://sg-act.playerinfinite.com").strip()
        or "https://sg-act.playerinfinite.com"
    )

    root = Path(__file__).resolve().parents[1]
    out_path = root / "room-codes.json"

    try:
        raw = fetch_codes(appkey, app_id, api_base)
    except urllib.error.URLError as exc:
        print(f"Request failed: {exc}", file=sys.stderr)
        sys.exit(1)

    doc = build_document(raw)
    out_path.write_text(json.dumps(doc, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {out_path} ({len(doc['codes'])} maps)")


if __name__ == "__main__":
    main()

``` 


## What I learned

It's nice building something useful for people that can just live for free on github pages, I'm not trying to make a buck off anyone and they get to find useful answers to annoying questions they might come across.

## Current state

Live at [dezmathio.github.io/delta-force-map-tracker](https://dezmathio.github.io/delta-force-map-tracker/).
