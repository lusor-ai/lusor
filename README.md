<p align="center">
  <a href="https://lusor.ai">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset=".github/assets/lusor-logo-dark.png">
      <img src=".github/assets/lusor-logo-light.png" alt="Lusor" width="200">
    </picture>
  </a>
</p>

<h3 align="center">Put AI agents to work on your phone.</h3>

<p align="center">
  <a href="https://docs.lusor.ai"><img src="https://img.shields.io/badge/docs-docs.lusor.ai-111111" alt="Docs"></a>
  <a href="https://discord.gg/9tET4gQPV4"><img src="https://img.shields.io/badge/Discord-join-111111?logo=discord&logoColor=white" alt="Discord"></a>
  <a href="https://x.com/lusor_ai"><img src="https://img.shields.io/badge/X-@lusor__ai-111111?logo=x&logoColor=white" alt="X"></a>
  <a href="https://github.com/lusor-ai/lusor/stargazers"><img src="https://img.shields.io/github/stars/lusor-ai/lusor?style=flat&color=111111" alt="GitHub stars"></a>
</p>

Lusor agents use real apps on a real phone: your own iPhone or Android, or a Lusor Phone in the cloud. Give an agent a task in plain language. It opens the apps, taps, types and swipes, asks you when it needs you, and reports back with a recording of every step.

<!-- Demo slot: a recorded task on a real phone goes here (GIF or video, under 10 MB). -->

## Which Lusor do I need?

| You want to | Use | Start here |
| --- | --- | --- |
| Hand tasks to an agent on your own **iPhone** | Lusor for Mac (Apple silicon), which connects the iPhone | [Connect your iPhone](https://docs.lusor.ai/help/connect-your-iphone) |
| Hand tasks to an agent on your own **Android** phone | Lusor Launcher on the phone. No cable; you approve its sign-in once from a computer | [Connect your Android phone](https://docs.lusor.ai/help/connect-your-android) |
| Give the agent **its own phone** | A Lusor Phone in the cloud, from [app.lusor.ai](https://app.lusor.ai) | [Lusor Phones](https://docs.lusor.ai/help/lusor-phones) |
| Run agents **from your own code** | The Lusor API | [Quickstart](https://docs.lusor.ai/quickstart) |
| Use your phones from **Claude, ChatGPT, Cursor, Codex** and other AI apps | The Lusor MCP server | [Connect an AI app](https://docs.lusor.ai/connect) |

## Quickstart

**In the app**

1. Sign in at [app.lusor.ai](https://app.lusor.ai).
2. Open **Phones** → **Add phone** and pick **Personal iPhone**, **Personal Android** or **Lusor Android** (a Lusor Phone).
3. Create an agent, give it the phone, and send it a task.

**From the API**

Create a key in the app under **Settings → API Keys**, then:

```bash
export LUSOR_API_KEY="lusor_..."

# 1. Find a connected phone
curl https://api.lusor.ai/v1/devices -H "X-Api-Key: $LUSOR_API_KEY"

# 2. Create an agent on it
curl https://api.lusor.ai/v1/agents \
  -H "X-Api-Key: $LUSOR_API_KEY" -H "Content-Type: application/json" \
  -d '{ "name": "My agent", "devices": [{ "device_id": "<device id>" }] }'

# 3. Send it a task
curl https://api.lusor.ai/v1/agents/<agent id>/turns \
  -H "X-Api-Key: $LUSOR_API_KEY" -H "Content-Type: application/json" \
  -H "Idempotency-Key: first-task" \
  -d '{ "prompt": "Open Settings and tell me which software version this phone runs." }'
```

The full walkthrough, including how to follow the session and read the result, is in the [Quickstart](https://docs.lusor.ai/quickstart).

## What you get

- **Recordings and replay.** Every task you send an agent is recorded. Watch it back as video, or step through it action by action.
- **The agent asks when it needs you.** When it reaches a sign-in or a decision, it pauses, asks you a question and waits for your answer.
- **Structured output.** Get the result back as JSON in a shape you define.
- **Direct control.** Read the screen, tap, type, swipe and launch apps yourself, up to 20 actions per request.
- **Live view.** Stream a phone's screen into your own app over WebRTC.
- **Lusor Phones.** Set a phone's location, timezone and language. Read the SMS and email that arrive at your workspace's phone numbers and Agent Mail inboxes.

## For AI agents

Point your coding agent at [docs.lusor.ai/llms.txt](https://docs.lusor.ai/llms.txt), the index of every docs page in a form it can read. [Docs for AI agents](https://docs.lusor.ai/connect/for-agents) covers the API spec too.

## Open source

Lusor's open-source code will be published in this repository. Star or watch it to follow along.

---

[Website](https://lusor.ai) · [Docs](https://docs.lusor.ai) · [Discord](https://discord.gg/9tET4gQPV4) · [X](https://x.com/lusor_ai) · [Privacy](https://lusor.ai/privacy) · [Terms](https://lusor.ai/terms)
