# Changelog

All notable changes to `@lusor/sdk` are documented here. The format
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this
package uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.1.0 — 2026-11-12

Added:

- Routines: list, create, update and delete an agent's routines
  (`routines`).
- Phones: rename a phone or move it to another workspace
  (`devices.update`), and wipe a phone (`devices.wipe`).
- Internet: change a Lusor Phone's Internet exit country
  (`devices.setInternetLocation`); put a phone on or take it off a static
  IP (`devices.enableStaticIp`, `devices.disableStaticIp`); list the
  workspace's Persistent IPs for a phone (`devices.listOwnedStaticIps`);
  and read a Persistent IP replacement's price
  (`devices.getStaticIpReplacement`). The replacement itself is made in
  the Lusor dashboard.
- Persistent IPs: quote, buy, check and release a Persistent IP
  (`persistentIps`).
- Phone numbers: browse the catalog, quote, order, read and abandon a
  number order, and cancel a number (`numberOrders`).
- Inbox: choose the username of a new address when previewing it
  (`emails.previewAddAddress({ username })`).

## 1.0.0 — 2026-11-12

Initial public release.

- Agents, sessions and turns: create an agent, start a turn, follow the run
  and read its output.
- Human-in-the-loop: answer the agent's question and resume a paused run.
- Follow-ups: send a further message to an existing session.
- Recordings: a run's video as signed segment URLs, plus a step-by-step
  screenshot replay.
- Direct device control: read screen state and drive a phone (tap, type,
  swipe and more), and manage a phone's device configuration.
- Sessions: rename a session, read a step's captured UI state, and cancel a
  queued follow-up or queued agent turn.
- Skills: create a skill.
- Agents: get or create the workspace's primary agent.
- Phones: read occupancy, Internet location, static IP status and
  wipe-and-reset progress.
- Catalog: list installable apps and fetch an app's icon.
- Workspaces: read the workspace an API key is bound to.
- Typed errors per HTTP status, and automatic retries for reads.
