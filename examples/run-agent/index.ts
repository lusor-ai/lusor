// Give an agent a task on one of your phones, wait for it to finish, and
// print its answer and the link to its recording.
//
//   LUSOR_API_KEY=lusor_... npm start
//   LUSOR_API_KEY=lusor_... npm start -- "Open Settings and tell me the battery level."

import { randomUUID } from "node:crypto";
import { LusorClient } from "@lusor/sdk";

const apiKey = process.env.LUSOR_API_KEY;
if (!apiKey) throw new Error("Set LUSOR_API_KEY to an API key from the Lusor app (Settings → API Keys).");

const lusor = new LusorClient({ apiKey });
const prompt = process.argv[2] ?? "Open Settings and tell me which software version this phone runs.";

// 1. Pick a phone: LUSOR_DEVICE_ID if set, otherwise the first connected one.
const { data: devices } = await lusor.devices.list();
const device = process.env.LUSOR_DEVICE_ID
  ? devices.find((d) => d.id === process.env.LUSOR_DEVICE_ID)
  : devices.find((d) => d.connected);
if (!device) throw new Error("No connected phone. Add one in the Lusor app under Phones.");
console.log(`Phone: ${device.name ?? device.id} (${device.platform ?? "unknown platform"})`);

// 2. Reuse this phone's example agent, or create it on the first run, then
//    send it the task. An agent works on the phone it is attached to, so each
//    phone gets its own. Resending the request with the same Idempotency-Key
//    never starts a second run.
const agentName = `SDK example ${device.id.slice(0, 8)}`;
const { data: agents } = await lusor.agents.list();
const agent =
  agents.find((a) => a.name === agentName) ??
  (await lusor.agents.create({ name: agentName, devices: [{ device_id: device.id }] })).data;
const { data: turn } = await lusor.agents.turns.create({
  id: agent.id,
  prompt,
  "Idempotency-Key": randomUUID(),
});
console.log(`Session ${turn.sessionId} started: ${prompt}`);

// 3. Wait until the run ends, or pauses because the agent has a question.
const stop = new Set(["completed", "complete", "failed", "cancelled", "awaiting_human"]);
let status = await lusor.sessions.status({ id: turn.sessionId });
while (!stop.has(status.status)) {
  await new Promise((r) => setTimeout(r, 3000));
  status = await lusor.sessions.status({ id: turn.sessionId });
}

const session = await lusor.sessions.get({ id: turn.sessionId });
console.log(`Status: ${session.status}`);
if (session.status === "awaiting_human") {
  const { data: events } = await lusor.sessions.events({ id: turn.sessionId });
  const ask = events.findLast((e) => e.type === "hitl_requested");
  console.log("The agent is asking:", ask?.data?.question ?? ask?.data);
  console.log("Answer it with lusor.sessions.answer(), or in the Lusor app.");
} else if (session.error) {
  console.log(`Error: ${session.error}`);
} else {
  // Without a schema the output is a small table plus a one-line summary.
  // See the structured-output example for a shape of your own.
  const output = session.output as { summary?: string } | null | undefined;
  console.log("Answer:", output?.summary ?? session.output);
}

// 4. Every run is recorded. The video is ready a few seconds after the run ends.
for (let i = 0; i < 10; i++) {
  const recording = await lusor.sessions.recording({ id: turn.sessionId });
  if (recording.recording_status !== "pending") {
    const url = recording.data?.segments[0]?.url;
    console.log(url ? `Recording: ${url}` : `Recording: ${recording.recording_status}`);
    break;
  }
  await new Promise((r) => setTimeout(r, 3000));
}
