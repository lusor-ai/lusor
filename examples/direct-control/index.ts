// Drive an Android phone yourself, with no agent: open Settings, read the
// screen, tap its search box, type, and save a screenshot.
//
//   LUSOR_API_KEY=lusor_... npm start
//
// Works on your own Android phone and on a Lusor Phone. On a Lusor Phone each
// call uses Lusor Phone minutes.

import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { LusorClient } from "@lusor/sdk";

const apiKey = process.env.LUSOR_API_KEY;
if (!apiKey) throw new Error("Set LUSOR_API_KEY to an API key from the Lusor app (Settings → API Keys).");

const lusor = new LusorClient({ apiKey });

// 1. Pick an Android phone: LUSOR_DEVICE_ID if set, otherwise the first connected one.
const { data: devices } = await lusor.devices.list();
const device = process.env.LUSOR_DEVICE_ID
  ? devices.find((d) => d.id === process.env.LUSOR_DEVICE_ID)
  : devices.find((d) => d.connected && d.platform === "android");
if (!device) throw new Error("No connected Android phone. Add one in the Lusor app under Phones.");
const deviceId = device.id;

// 2. Phone actions are addressed by workspace. An API key belongs to one
//    workspace, and every agent carries its id.
const { data: agents } = await lusor.agents.list();
const workspaceId =
  agents[0]?.workspaceId ??
  (await lusor.agents.create({ name: `SDK example ${deviceId.slice(0, 8)}`, devices: [{ device_id: deviceId }] }))
    .data.workspaceId;
const phone = { workspaceId, deviceId };

// Each action gets its own Idempotency-Key. To retry an action after a network
// error, resend it with the same key: the first result comes back and the
// phone isn't touched again. A new key (or re-running this script) acts again.
const once = () => ({ "Idempotency-Key": randomUUID() });

// 3. Open Settings on its main screen: stop it first, so it doesn't resume
//    wherever it was left.
await lusor.devices.stopApp({ ...phone, ...once(), package: "com.android.settings" });
await lusor.devices.startApp({ ...phone, ...once(), package: "com.android.settings" });
await new Promise((r) => setTimeout(r, 1500));

// 4. Read the screen. Interactive elements are numbered [N] in the tree.
const state = await lusor.devices.state(phone);
const numbered = state.a11yTree.split("\n").filter((line) => /\[\d+\]/.test(line));
console.log(`${state.deviceContext.interactiveCount} interactive elements on screen:`);
console.log(numbered.slice(0, 10).map((line) => line.trim()).join("\n"));

// 5. Tap the search box by its number, then type into it.
const search = state.a11yTree.match(/\[(\d+)\][^\n]*search/i);
if (search) {
  await lusor.devices.tap({ ...phone, ...once(), index: Number(search[1]) });
  await new Promise((r) => setTimeout(r, 1000));
  await lusor.devices.type({ ...phone, ...once(), text: "battery", clear: true });
  await new Promise((r) => setTimeout(r, 1500));
} else {
  console.log("No search box on this screen; skipping the tap and type.");
}

// 6. Save what the phone shows now.
const png = await lusor.devices.screenshot(phone);
await writeFile("screenshot.png", Buffer.from(await png.arrayBuffer()));
console.log("Saved screenshot.png");

// 7. Back to the home screen.
await lusor.devices.home({ ...phone, ...once() });
