// Ask an agent for data and get it back as JSON in a shape you define.
// The run's `output` matches the JSON Schema passed as `schema`.
//
//   LUSOR_API_KEY=lusor_... npm start

import { randomUUID } from "node:crypto";
import { LusorClient } from "@lusor/sdk";

const apiKey = process.env.LUSOR_API_KEY;
if (!apiKey) throw new Error("Set LUSOR_API_KEY to an API key from the Lusor app (Settings → API Keys).");

const lusor = new LusorClient({ apiKey });

// The shape of the answer. Keep it small and describe each field: the agent
// reads the descriptions.
const schema = {
  type: "object",
  properties: {
    model: { type: "string", description: "The phone's model name, as shown in Settings." },
    softwareVersion: { type: "string", description: "The Android or iOS version number." },
    batteryPercent: { type: "integer", description: "Battery level, 0 to 100." },
  },
  required: ["model", "softwareVersion", "batteryPercent"],
};

type PhoneInfo = { model: string; softwareVersion: string; batteryPercent: number };

// 1. Pick a phone: LUSOR_DEVICE_ID if set, otherwise the first connected one.
const { data: devices } = await lusor.devices.list();
const device = process.env.LUSOR_DEVICE_ID
  ? devices.find((d) => d.id === process.env.LUSOR_DEVICE_ID)
  : devices.find((d) => d.connected);
if (!device) throw new Error("No connected phone. Add one in the Lusor app under Phones.");

// 2. A run started on a phone is addressed by workspace. An API key belongs to
//    one workspace, and every agent carries its id.
const { data: agents } = await lusor.agents.list();
const workspaceId =
  agents[0]?.workspaceId ??
  (await lusor.agents.create({ name: `SDK example ${device.id.slice(0, 8)}`, devices: [{ device_id: device.id }] }))
    .data.workspaceId;

// 3. Start the run with the schema.
const run = await lusor.devices.sessions.create({
  workspaceId,
  deviceId: device.id,
  prompt: "Open Settings and find this phone's model name, software version and battery level.",
  schema,
  "Idempotency-Key": randomUUID(),
});
console.log(`Session ${run.id} started on ${device.name ?? device.id}`);

// 4. Wait for it to end, then read the typed result.
const done = new Set(["completed", "complete", "failed", "cancelled", "awaiting_human"]);
let status = await lusor.sessions.status({ id: run.id });
while (!done.has(status.status)) {
  await new Promise((r) => setTimeout(r, 3000));
  status = await lusor.sessions.status({ id: run.id });
}

const session = await lusor.sessions.get({ id: run.id });
if (session.status !== "completed" && session.status !== "complete") {
  throw new Error(`Run ended ${session.status}${session.error ? `: ${session.error}` : ""}`);
}

const info = session.output as PhoneInfo;
console.log(JSON.stringify(info, null, 2));
console.log(`Model ${info.model}, software version ${info.softwareVersion}, battery ${info.batteryPercent}%.`);
