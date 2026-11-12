# Structured output

Starts a run with a JSON Schema and reads the result back as typed JSON. Here the agent reads the phone's model, software version and battery level from Settings.

```bash
npm install
LUSOR_API_KEY=lusor_... npm start
```

```text
Session f49c6c2a69f347e8 started on Lusor Phone
{
  "model": "SM-A166P",
  "batteryPercent": 100,
  "softwareVersion": "15"
}
Model SM-A166P, software version 15, battery 100%.
```

How it works:

1. Passes the schema as `schema` to `lusor.devices.sessions.create()`, which starts a run on one phone without an agent.
2. Waits for the run to finish, then reads `session.output`, which matches the schema.

Describe each field in the schema: the agent reads the descriptions. A run on a phone is addressed by workspace; the example takes the workspace id from your agents, and creates an "SDK example" agent on the phone if there is none yet.

Docs: [Structured output](https://docs.lusor.ai/agents/structured-output)
