Adding a native dependency to an existing Expo app

1. Install the dependency

```bash
yarn expo install react-native-keyboard-controller
```

2. Regenerate native project if required.

```bash
npx expo prebuild --clean
```

The --clean option deletes the existing android/ios directories and regenerates them from your Expo configuration

By running above, Expo will:

- Remove the existing generated android directory.
- Generate a fresh Android project.
- Apply your current app.json.
- Incorporate the newly installed native dependency/configuration.

3. Build the native app:

```bash
yarn expo run:android
```

This compiles the Android native project and installs the debug build on the emulator/device.

---

Troubleshooting dependency/version problems
Sometime there happens a version mismatch for eg:
ERROR [Error: [Worklets] Mismatch between JavaScript code version and Worklets Babel plugin version (0.10.0 vs. 0.10.1).

so below will help for troubleshoot:

Check by clearing Metro cache:

```bash
yarn start --clear
```

(`--reset-cache` is the classic React Native CLI flag — Expo's CLI uses `-c` / `--clear` instead. Passing `--reset-cache` doesn't error, it's just silently ignored, so it looks like it worked but never actually clears anything.)

If the problem remains:

Check for Expo/dependency/configuration issues using Expo Doctor. Expo Doctor checks package compatibility, app configuration, and other project-health issues.

```bash
npx expo-doctor
```

If Expo reports dependency version problems:

```bash
npx expo install --fix --yarn
```

Reverify the mismatch:

```bash
npx expo-doctor
```

If native dependencies/configuration changed, regenerate/rebuild the native project:

```bash
npx expo prebuild --clean
```

Local build:

```bash
yarn expo run:android
```

If APK installation fails:
Android's adb install is the mechanism being used to put the APK onto the emulator. Find the emulator/device ID:

```bash
adb devices

output: emulator-5554
```

Run:

```bash
adb -s emulator-5554 install -r -d --user 0 "C:\path\to\app-debug.apk"
```

It should output:

```bash
Performing Streamed Install
Success
```

Check whether Android sees the package:

PowerShell:

```powershell
adb -s emulator-5554 shell pm list packages | Select-String "hellopiyush"
```

Git Bash:

```bash
adb -s emulator-5554 shell pm list packages | grep "hellopiyush"
```

expected output: `package:com.hellopiyush.mobilepoc`

Then start Metro with a cleared cache if you're troubleshooting a bundling/runtime issue:

```bash
yarn start --clear
```

---

## Which shell / package manager should I use?

- **`npx` vs `yarn`:** for this project, running an Expo/React Native CLI command as `npx expo <command>` or `yarn expo <command>` (or the equivalent `yarn <script>` where one exists in `package.json`, e.g. `yarn start`) makes no functional difference — both resolve to the exact same locally-installed `expo` CLI in `node_modules/.bin`. Use whichever you have muscle memory for; the commands in this file mix both simply because they were written at different times, not because one is required over the other.
- **Git Bash vs PowerShell:** this does matter, but only for commands that use Unix-style syntax — pipes into `awk`/`grep`, `\` line continuations, `2>/dev/null`, etc. Those need Git Bash (PowerShell doesn't understand any of that syntax). Plain `npx`/`yarn`/`adb` commands with no pipes work fine in either shell. When a command block in this file (or `docs/android-emulator-network-trust-issue.md`) is Unix-flavored, run it in Git Bash; PowerShell-flavored blocks (like the `Select-String` one above) are labeled accordingly.

## Killing Metro / freeing port 8081

If a previous Metro/`expo run:android` session is still holding port 8081 (e.g. you see `EADDRINUSE`, or a rebuild needs a clean slate), find and kill the process holding it:

**PowerShell:**

```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 8081).OwningProcess | Stop-Process -Force
```

**Git Bash:**

```bash
netstat -ano | grep ":8081"
# note the PID in the last column, then:
powershell -NoProfile -Command "Stop-Process -Id <PID> -Force"
```

Verify the port is free afterward:

```bash
netstat -ano | grep ":8081" || echo "port 8081 free"
```
