# Changelog

Full release notes are on [GitHub Releases](https://github.com/lusor-ai/lusor/releases).
The SDK keeps its own changelog in [`packages/sdk/CHANGELOG.md`](packages/sdk/CHANGELOG.md),
with the same versions as [`@lusor/sdk`](https://www.npmjs.com/package/@lusor/sdk) on npm.

## 0.3.0 — 2026-11-15

- [`@lusor/sdk`](packages/sdk) 1.3.0: read your plan and remaining credits, see where each run came from and list runs started from other AI apps, read a phone's activity, and preview a deploy with your own proxy. See the [SDK changelog](packages/sdk/CHANGELOG.md).
- The [Amazon shopping skill](skills/amazon-shopping) uses "Buy Now" when you ask to buy now, and otherwise adds to cart.

## 0.2.0 — 2026-11-13

- [`@lusor/sdk`](packages/sdk) 1.2.0: routines can be given a name. See the [SDK changelog](packages/sdk/CHANGELOG.md).

## 0.1.0 — 2026-11-12

The first open-source release.

- [`@lusor/sdk`](packages/sdk) 1.1.0, the TypeScript client for the Lusor API.
- Three app skills in [`skills`](skills): Instagram, Amazon shopping and Google account sign-in.
- Runnable TypeScript [`examples`](examples): run an agent, get structured output, and drive a phone directly.
- The six skills from the 9 November 2026 AndroidWorld run, in [`benchmarks/androidworld/skills`](benchmarks/androidworld/skills).
