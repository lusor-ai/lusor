# App skills

An app skill teaches an AI agent how to use one phone app: where things are,
which steps work, and the traps to avoid. Each skill is one folder with a
`SKILL.md` file, in the [Agent Skills](https://agentskills.io) format, so any
agent that reads skills can use it.

This folder holds the maintained skills. They are reviewed, and Lusor's
agent loads every skill here on every run. The app skills written for the
AndroidWorld benchmark are kept separately, in
[`../benchmarks/androidworld/skills/`](../benchmarks/androidworld/skills/). Skills from the community, recorded
skills and drafts go in [`../skills-unverified/`](../skills-unverified/), which
Lusor's agent does not load.

<!-- Keep this README free of front matter. The skill loader also reads .md
files at this folder's root, and a `description:` field here would turn this
README into a skill. -->

## Format

```
skills/<app>/
├── SKILL.md            # required
└── verification.json   # optional: evidence for the "Verified on a real phone" badge
```

`SKILL.md` starts with front matter, followed by the instructions:

```markdown
---
name: instagram              # lower-case letters, digits and hyphens; matches the folder name
description: Navigate and automate the Instagram Android app. Use when the task involves browsing profiles, liking posts, following accounts or viewing stories.
keywords: [instagram, follow, like, post, story, reel, profile]
platform: android            # android or ios
app_package: com.instagram.android  # Android package name or iOS bundle id
---

What the agent needs to know to use the app: the path to each feature,
which controls to use, what to check before finishing, and what to avoid.
```

- `description` says what the skill covers and when to use it. The agent sees
  only `name` and `description` until it opens the skill, so make it specific.
- Write instructions, not a transcript. Describe the app's controls by what
  they show (labels, titles, positions in the list), not by screen
  coordinates.
- Keep it short. Every line costs the agent time on every task that uses it.
- Don't use em dashes, en dashes or double hyphens in a skill. CI rejects
  them, because the agent copies them into its replies. If a `description`
  contains `": "`, quote it, or the YAML won't parse and the skill drops out.
- One file covers both platforms when the steps are the same: use
  `platform: [android, ios]`, keep `app_package` for the Android package and
  add `bundle_id` for the iOS bundle id. Give each platform its own section
  where the steps differ. Use a separate `<app>-ios/` folder only when the
  iOS flow is substantially different.

## Scope

Skills cover navigation and app use. Skills whose purpose is to get around an
app's security are not accepted: no CAPTCHA solving, no 2FA or SMS
interception, no account or device fingerprint workarounds. Don't put
personal data, credentials or account names in a skill.

## Verified on a real phone

A skill earns the badge when a Lusor run on a real phone completes the skill's
tasks with it. The run is recorded in `verification.json` beside the skill:

```json
{
  "runs": [
    {
      "date": "2026-11-12",
      "result": "pass",
      "task": "Search for a product and open its page",
      "platform": "android",
      "device": "Samsung Galaxy S22",
      "os_version": "Android 14",
      "app_version": "312.0.0.42.109",
      "evidence_url": "https://example.com/recording"
    }
  ]
}
```

`evidence_url` is optional. Add it only for a public recording that has been
checked for location, account and other personal data. Maps and delivery apps
show where the phone is. A run without a URL is still a valid verification:
the badge rests on the run record. Keep internal run or session ids out of
this file. A skill without `verification.json` has no badge. Apps
change, so skills are re-verified regularly, and an old run does not count
forever.

## Adding or changing a skill

New skills start in [`../skills-unverified/`](../skills-unverified/). Lusor
moves a skill here after reviewing it and verifying it on a real phone. Changes
to a skill in this folder are reviewed the same way, because they change what
Lusor's agent does. See [CONTRIBUTING.md](../CONTRIBUTING.md).
