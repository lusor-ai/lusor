# Examples

Runnable TypeScript examples for [`@lusor/sdk`](../packages/sdk). Each folder is a standalone project that installs the SDK from npm.

| Example | What it does |
| --- | --- |
| [`run-agent`](run-agent) | Gives an agent a task on a phone, waits for it, and prints the answer and the recording link. |
| [`structured-output`](structured-output) | Gets the result back as JSON in a shape you define with a JSON Schema. |
| [`direct-control`](direct-control) | Drives an Android phone without an agent: opens an app, reads the screen, taps, types and saves a screenshot. |

## Run one

You need Node 18.17 or later, a Lusor API key and a connected phone.

1. Create an API key in the [Lusor app](https://app.lusor.ai) under **Settings → API Keys**.
2. Add a phone under **Phones**: your own iPhone or Android, or a Lusor Phone.
3. Run the example:

```bash
cd run-agent
npm install
LUSOR_API_KEY=lusor_... npm start
```

Each example uses the first connected phone. Set `LUSOR_DEVICE_ID` to choose one; `GET /v1/devices` (`lusor.devices.list()`) lists their ids.

Agent runs use credits, and on a Lusor Phone, agent runs and direct control use Lusor Phone minutes. See [Credits and minutes](https://docs.lusor.ai/billing/credits-and-minutes).
