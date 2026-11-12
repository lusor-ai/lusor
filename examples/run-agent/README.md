# Run an agent

Gives an agent a task on one of your phones, waits for the run to finish, and prints the agent's answer and a link to the run's recording.

```bash
npm install
LUSOR_API_KEY=lusor_... npm start
LUSOR_API_KEY=lusor_... npm start -- "Open Settings and tell me the battery level."
```

```text
Phone: Lusor Phone (android)
Session d935cb0dcfcdb308 started: Open Settings and tell me the battery level.
Status: completed
Answer: The battery is at 100%, and Settings shows the phone as charged.
Recording: https://…/segment-000.mp4?…
```

How it works:

1. Picks the first connected phone, or the one in `LUSOR_DEVICE_ID`.
2. Reuses the phone's agent ("SDK example" plus the start of the phone's id), creating it on the first run, and sends it the task with `lusor.agents.turns.create()`. An agent works on the phone it is attached to, so each phone gets its own. Resending the request with the same `Idempotency-Key` never starts a second run.
3. Polls `lusor.sessions.status()` until the run ends, then reads the result with `lusor.sessions.get()`.
4. If the agent stops to ask a question (`awaiting_human`), prints the question. Answer it with `lusor.sessions.answer()` or in the Lusor app.
5. Prints the recording link from `lusor.sessions.recording()`. Links expire, so fetch a new one when you need it.

Docs: [Send a turn](https://docs.lusor.ai/agents/send-a-turn) · [Answer the agent](https://docs.lusor.ai/agents/answer-the-agent)
