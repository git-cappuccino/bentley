# Installing an EAS build on the Android emulator

Steps to get a build produced by `eas build` (as opposed to a local `expo run:android` build) onto a running AVD.

---

## 1. Boot the AVD

Skip this if you already started the emulator from Android Studio's Device Manager.

```bash
emulator -list-avds
emulator -avd <avd_name>
```

## 2. Wait for it to attach to adb

```bash
adb wait-for-device
adb devices
```

Expected output:

```
List of devices attached
emulator-5554          device
```

## 3. Install the latest development build

```bash
eas build --platform android --profile development
```

Then, once a build finishes (whether just triggered above, or an older one already sitting on EAS):

```bash
eas build:run --platform android --profile development --latest
```

This downloads the APK and installs it in one step.

### If `eas build:run` fails to install

It downloads the APK successfully but its own `adb install` call can fail for no clear reason (seen on Windows). If that happens, install the same APK manually — `eas build:run` caches it here:

```
%LOCALAPPDATA%\Temp\eas-cli-nodejs\eas-build-run-cache\<projectId>_<buildId>.apk
```

```bash
adb install "$LOCALAPPDATA/Temp/eas-cli-nodejs/eas-build-run-cache/<projectId>_<buildId>.apk"
```

(Get the exact filename from the `eas build:run` output, or just look for the most recently modified `.apk` in that folder.)

## 4. Launch the app

```bash
adb shell monkey -p com.hellopiyush.abnegation -c android.intent.category.LAUNCHER 1
```

## 5. Start the dev server so the JS bundle loads

```bash
npx expo start --dev-client
```

A development-client build has no bundled JS — it needs a running Metro server to connect to.

---

Steps 1–2 are only needed if the emulator isn't already running. Steps 3–4 are the ones you'll repeat most often once a build already exists on EAS and you just want it back on a fresh emulator instance.
