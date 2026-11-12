# Direct control

Drives an Android phone with no agent: opens Settings, reads the screen's numbered UI elements, taps the search box, types into it, and saves a screenshot to `screenshot.png`.

```bash
npm install
LUSOR_API_KEY=lusor_... npm start
```

```text
13 interactive elements on screen:
[1]<LinearLayout id="search_action_bar" />  [45,91][1035,294]
[2]<ScrollView id="main_content_scrollable_container" />  [0,339][1080,2340]
…
Saved screenshot.png
```

How it works:

1. `lusor.devices.stopApp()` and `startApp()` open Settings on its main screen.
2. `lusor.devices.state()` returns the UI tree. Interactive elements are numbered `[N]`, and `tap({ index: N })` taps one.
3. `type()` types into the focused field; `clear: true` replaces what was there.
4. `screenshot()` returns the screen as PNG bytes.

Every action sends its own `Idempotency-Key`. To retry an action after a network error, resend it with the same key: Lusor returns the first result without acting again. A new key, or running the example again, taps and types again.

Works on your own Android phone and on a Lusor Phone, where each call uses Lusor Phone minutes. On an iPhone, use `screenshot()` and tap with `{ x, y }` coordinates; app ids and key codes are Android ones.

Docs: [Direct phone control](https://docs.lusor.ai/phones/direct-control)
