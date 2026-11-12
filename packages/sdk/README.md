# @lusor/sdk

TypeScript client for the [Lusor API](https://docs.lusor.ai): run AI agents on phones, follow their runs, and drive a phone directly.

The client is generated from the Lusor OpenAPI specification, so every endpoint in the [API reference](https://docs.lusor.ai/api-reference/introduction) is available here with typed requests and responses.

## Install

```bash
npm install @lusor/sdk
```

Node 18.17+ (or any runtime with `fetch`).

## Authenticate

Create an API key in the Lusor app: open your workspace and choose **API keys** in the sidebar. Keep it on your server.

```ts
import { randomUUID } from "node:crypto";
import { LusorClient } from "@lusor/sdk";

const lusor = new LusorClient({ apiKey: process.env.LUSOR_API_KEY! });
```

A key is bound to one workspace, so `workspaceId` is optional wherever it appears as a query or body field.

## Run an agent

```ts
const { data: devices } = await lusor.devices.list();
const { data: agent } = await lusor.agents.create({
  name: "My agent",
  devices: [{ device_id: devices[0].id }],
});

const { data: turn } = await lusor.agents.turns.create({
  id: agent.id,
  prompt: "Open Settings and tell me which Android version this phone runs.",
  "Idempotency-Key": randomUUID(),
});

const done = new Set(["completed", "complete", "failed", "cancelled"]);
let status = await lusor.sessions.status({ id: turn.sessionId });
while (!done.has(status.status)) {
  await new Promise((r) => setTimeout(r, 3000));
  status = await lusor.sessions.status({ id: turn.sessionId });
}
const session = await lusor.sessions.get({ id: turn.sessionId });
console.log(session.status, session.output, session.error);
```

## Answer the agent, follow up, and watch the recording

When the agent asks a question, the run pauses with status
`awaiting_human`. Its question is the latest `hitl_requested` event.

```ts
const { data: events } = await lusor.sessions.events({ id: turn.sessionId });
const ask = events.findLast((e) => e.type === "hitl_requested");
await lusor.sessions.answer({
  id: turn.sessionId,
  correlation_id: ask!.data!.correlation_id as string,
  response: "The open issues only",
});

await lusor.sessions.continue({
  id: turn.sessionId,
  prompt: "Now count the closed ones too.",
  "Idempotency-Key": randomUUID(),
});

// Poll while recording_status is "pending"; segment URLs expire.
const recording = await lusor.sessions.recording({ id: turn.sessionId });
console.log(recording.recording_status, recording.data?.segments.map((s) => s.url));
```

## Drive a phone directly

```ts
const workspaceId = agent.workspaceId;
const deviceId = devices[0].id;

const state = await lusor.devices.state({ workspaceId, deviceId });
console.log(state.a11yTree);

await lusor.devices.tap({ workspaceId, deviceId, index: 3, capture: true });
await lusor.devices.type({ workspaceId, deviceId, text: "hello" });
```

On a Lusor Phone, direct control with an API key uses Lusor Phone minutes. See [Direct phone control](https://docs.lusor.ai/phones/direct-control).

## Errors

Non-2xx responses throw a subclass of `LusorError` (for example `Lusor.UnauthorizedError`, `Lusor.PaymentRequiredError`, `Lusor.NotFoundError`), with `statusCode` and the parsed `body`. Timeouts throw `LusorTimeoutError`.

**Retries.** Reads (`GET`) are retried automatically on `408`, `429`, `502`, `503` and `504`, twice by default (`maxRetries` on the client or per request). Writes are never retried automatically, because most of them are not idempotent: a retried tap taps twice, and a retried chain re-runs steps that already ran. To retry a turn safely, send an `Idempotency-Key` and retry it yourself with the same key.

## Options

| Option | Default | |
| --- | --- | --- |
| `apiKey` | none | Your Lusor API key (Settings → API Keys). |
| `baseUrl` | `https://api.lusor.ai` | Override for testing. |
| `timeoutInSeconds` | 60 | Per request. |
| `maxRetries` | 2 | Retries for reads. Writes are never retried. |

## License

MIT, see `LICENSE`. The request runtime under `src/core/` is generator template code under the Apache License 2.0; see `THIRD_PARTY_NOTICES.md` and `LICENSE-APACHE-2.0.txt`.
