# Abnegation: Styling Foundation Spec

> Hand this file to Claude Code. Task: set up react-native-unistyles v3, DM Sans fonts and a full design-token theme for the Expo (Expo Router, CNG) app "Abnegation" (repo: `bentley`).
> Source of truth for values: the Figma kit "Beauty Services Appointment App (Community)" (file key `jbStZa7VFDY6Z9iu9FXEn1`). Values below were read from it and then snapped to standard scales.

## Ground rules

- **No NativeWind / Tailwind / className-based styling.** Styling layer is Unistyles v3 only.
- **Do NOT rebuild the dev client** and do **not** run `prebuild --clean`. The user does one native rebuild after reviewing your report.
- Follow the **current official Unistyles v3 docs** (https://www.unistyl.es/v3/start/getting-started/ and the Expo Router section) over memory. Versions and option names may have changed.
- Do not touch unrelated files. Report anything surprising instead of silently working around it.
- All styling must go through theme tokens. No hard-coded colors, font names, or spacing in components.

---

## Step 0: Inspect and report first

Before changing anything, report:

- Expo SDK version, react-native version, whether the New Architecture is enabled
- Folder layout (where `app/` and shared components live)
- Current `babel.config.js`, `package.json` `"main"`, and `tsconfig` paths
- Any existing styling libraries or leftover NativeWind/Tailwind config

## Step 1: Install and wire Unistyles

- `npx expo install react-native-unistyles react-native-nitro-modules expo-font`
- Install `react-native-edge-to-edge` **only if** the docs say this SDK still needs it.
- Add the Unistyles **babel plugin** with the correct `root` for this repo's layout (Expo Router `app/` next to components is a common mistake). Explain why you chose that root.
- Create a custom entry (`index.ts`) that imports `./unistyles` **before** `expo-router/entry`, and point `package.json` `"main"` at it. Unistyles must be configured before any `StyleSheet.create` runs.

## Step 2: Fonts (DM Sans, weights 400 / 500 / 700 only, no italics)

- Temporarily install `@expo-google-fonts/dm-sans`. Copy the three **static** TTFs into `assets/fonts/` as:
  - `DMSans-Regular.ttf`
  - `DMSans-Medium.ttf`
  - `DMSans-Bold.ttf`
- Include the OFL license file next to them, then **uninstall** the package.
- If the package only ships variable fonts, **stop and tell the user**.
- Verify each TTF's PostScript/family name (e.g. `fc-scan` or `otfinfo`) and report it. Name files so filename == PostScript name where possible. Embedded fonts can resolve by the internal name on iOS.
- Register the fonts with the **`expo-font` config plugin** in `app.json` (build-time embedding), not runtime `useFonts`. This avoids flash-of-unstyled-text and splash gating.
- Do not add any other fonts. SF Pro is iOS system chrome. Inter and Source Sans appear only in kit boilerplate.

## Step 3: Theme (`src/theme/`, one file per concern, composed into a single `themes` object)

### 3.1 `palette.ts` (raw ramps; 4 = lightest, 0 = darkest)

| Ramp    | 4         | 3         | 2                | 1         | 0         |
| ------- | --------- | --------- | ---------------- | --------- | --------- |
| purple  | `#CBBFFF` | `#9880FE` | `#6440FE` (base) | `#3F13FE` | `#2C01E2` |
| dark    | `#C7C9D9` | `#8F90A6` | `#555770`        | `#28293D` | `#1C1C28` |
| light   | `#FFFFFF` | `#FAFAFC` | `#F2F2F5`        | `#EBEBF0` | `#E4E4EB` |
| success | `#E3FFF1` | `#57EBA1` | `#39D98A`        | `#06C270` | `#05A660` |
| error   | `#FFE5E5` | `#FF8080` | `#FF5C5C`        | `#FF3B3B` | `#E53535` |
| warning | `#FFF8E5` | `#FCCC75` | `#FDAC42`        | `#FF8800` | `#E57A00` |
| info    | `#E5F0FF` | `#9DBFF9` | `#5B8DEF`        | `#0063F7` | `#004FC4` |
| alert   | `#FFFEE5` | `#FDED72` | `#FDDD48`        | `#FFCC00` | `#E5B800` |

### 3.2 `colors.ts` (semantic roles; components consume only these)

| Role                                      | Light                                   | Dark                    |
| ----------------------------------------- | --------------------------------------- | ----------------------- |
| `background`                              | `#FFFFFF`                               | `#1C1C28`               |
| `surface`                                 | `#FFFFFF`                               | `#28293D`               |
| `surfaceMuted`                            | `#F2F2F5`                               | `#28293D`               |
| `text.primary`                            | `#1C1C28`                               | `#FFFFFF`               |
| `text.secondary`                          | `#8F90A6`                               | `#E4E4EB`               |
| `text.tertiary`                           | `#8F90A6`                               | `#C7C9D9`               |
| `text.onPrimary`                          | `#FFFFFF`                               | `#FFFFFF`               |
| `text.disabled`                           | `#8F90A6`                               | `#8F90A6`               |
| `border`                                  | `#C7C9D9`                               | `#555770`               |
| `borderStrong`                            | `#1C1C28`                               | `#E4E4EB`               |
| `primary`                                 | `#6440FE`                               | `#6440FE`               |
| `accent`                                  | `#6440FE`                               | `#9880FE`               |
| `focusBorder`                             | `#6440FE`                               | `#9880FE`               |
| `selectedTint`                            | `rgba(100,64,254,0.10)`                 | `rgba(100,64,254,0.40)` |
| `chip.active.bg` / `.text`                | `#1C1C28` / `#FFFFFF`                   | `#E4E4EB` / `#1C1C28`   |
| `chip.inactive.bg` / `.text`              | `#EBEBF0` / `#1C1C28`                   | `#555770` / `#FFFFFF`   |
| `overlay`                                 | `rgba(28,28,40,0.96)`                   | `rgba(28,28,40,0.96)`   |
| `status.success / error / warning / info` | `#05A660 / #E53535 / #FF8800 / #0063F7` | same                    |

Status background tints use ramp step 4 of each status ramp.

### 3.3 `typography.ts`

Font families (use the **verified PostScript names** from Step 2):

- `regular` = `DMSans-Regular`, `medium` = `DMSans-Medium`, `bold` = `DMSans-Bold`

Each variant sets `fontFamily`, `fontSize`, `lineHeight`, `letterSpacing`. **Never set `fontWeight`**; weight is chosen by family name, because `fontWeight` doesn't reliably select custom font files on Android.

| Variant         | Size / line height | Family                                    | Letter spacing |
| --------------- | ------------------ | ----------------------------------------- | -------------- |
| `h1`            | 96 / 104           | medium                                    | -1.5           |
| `h2`            | 60 / 68            | medium                                    | -0.5           |
| `h3`            | 48 / 56            | medium                                    | 0              |
| `h4`            | 32 / 40            | bold                                      | 0.25           |
| `h5`            | 24 / 32            | bold                                      | -0.48          |
| `h6`            | 20 / 28            | bold                                      | -0.4           |
| `navTitle`      | 18 / 24            | bold (assumed; confirm when building nav) | 0              |
| `subtitle1`     | 15 / 22            | regular                                   | 0.15           |
| `subtitle2`     | 13 / 20            | regular                                   | 0.1            |
| `paragraph1`    | 15 / 22            | regular                                   | 0.5            |
| `paragraph2`    | 13 / 20            | regular                                   | 0.25           |
| `button1`       | 16 / 24            | bold                                      | 0              |
| `button2`       | 14 / 24            | bold                                      | 0              |
| `button3`       | 12 / 24            | bold                                      | 0              |
| `label1`        | 15 / 22            | bold                                      | 0              |
| `label1Regular` | 15 / 22            | regular                                   | 0              |
| `label2`        | 10 / 16            | regular                                   | 0              |
| `label2Bold`    | 10 / 16            | bold                                      | 0              |

### 3.4 `spacing.ts`, `radii.ts`, `breakpoints.ts`

```ts
spacing = {
  0: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
}; // screen margin = xl
radii = { none: 0, xs: 4, sm: 8, md: 12, lg: 16, full: 9999 };
breakpoints = { xs: 0, sm: 360, md: 414, lg: 768, xl: 1024 };
```

### 3.5 `elevation.ts` (use RN `boxShadow`, multi-shadow; each level = two layers, layer 1 first)

| Level | Layer 1 (color, x/y/blur) | Layer 2               |
| ----- | ------------------------- | --------------------- |
| e1    | `#60617029` 0/0.5/2       | `#28293D14` 0/0/1     |
| e2    | `#60617029` 0/2/4         | `#28293D0A` 0/0/1     |
| e3    | `#60617029` 0/4/8         | `#28293D0A` 0/0/2     |
| e4    | `#60617029` 0/8/16        | `#28293D0A` 0/2/4     |
| e5    | `#60617029` 0/16/24       | `#28293D0A` 0/2/8     |
| e6    | `#6061703D` 0/20/32       | `#28293D14` 0/2/8     |
| inset | inner `#60617052` 0/0.5/4 | (note if unsupported) |

- Colors are `RRGGBBAA` hex. **Convert the alpha correctly** to `rgba()`.
- The same shadows are used in light and dark.
- Elevation 03 is the most used in the Figma screens, then 04, 01, 02, 06.

### 3.6 `unistyles.ts`

- `StyleSheet.configure({ themes: { light, dark }, breakpoints, settings: { adaptiveThemes: true } })`
- Add the **TypeScript module augmentation** so the theme and breakpoints are typed everywhere.

## Step 4: Verification screen (temporary, dev-only)

- Route such as `app/_dev/style-check.tsx`, reachable from one temporary link.
- Style it **only** with theme tokens (no hard-coded values).
- Render:
  - every typography variant with sample text
  - the color roles as labelled swatches
  - spacing and radii samples
  - elevation e1-e6 on cards
  - the three DM Sans weights side by side
- Replace `StyleSheet` imports from `'react-native'` with Unistyles' in files that already define styles. This includes the duplicated `styles.link` objects in `ButtonGroup.tsx`, `onboarding.tsx`, `shop/[id].tsx` and `(tabs)/index.tsx`.

## Step 5: Checks (do NOT rebuild)

- `npx tsc --noEmit`
- `npx expo-doctor`
- `npx expo config --type introspect` (confirm the font plugin entries)
- Confirm there are no leftover NativeWind/Tailwind references.
- Report: every file changed, every version warning, the verified font names, and the exact commands for the single dev-client rebuild.

---

## Snapping decisions (Figma value -> value used)

| Area                                          | Figma                               | Used                                                          |
| --------------------------------------------- | ----------------------------------- | ------------------------------------------------------------- |
| Spacing                                       | 2, 4, 6, 8, 10, 12, 16, 24, 32, 48  | 0, 2, 4, 8, 12, 16, 24, 32, 48 (6->4, 10->8; ties round down) |
| Radii                                         | 2, 4, 5, 8, 10, 12, 16, 40, 60, 100 | 4, 8, 12, 16, full (icon-internal radii ignored)              |
| Type sizes                                    | 19 / 23 / 33 / 46 / 58 / 93         | 20 / 24 / 32 / 48 / 60 / 96                                   |
| Line heights                                  | 22.5, "auto"                        | even integers; headings on a 4px grid                         |
| Letter spacing                                | -2% on H5/H6                        | -0.48 / -0.4 px                                               |
| Chevron icon `#898989`                        |                                     | `text.secondary`                                              |
| Selected tint `#7B61FF` @10% / 40%            |                                     | primary `#6440FE` at the same opacities                       |
| Stray strokes `#D1D5DB`, `#D1D4E0`, `#393939` |                                     | `border`                                                      |
| Inactive chip `#F1F1F1` / `#393939`           |                                     | light `#EBEBF0`; dark `#555770`                               |
| Dark overlay `#1E1E1E` @96%                   |                                     | `#1C1C28` @96%                                                |

**Not theme tokens (ignore):** iOS keyboard and status-bar colors, `#C4C4C4` image placeholders, payment brand icon colors, and the SF Pro / 22.5px keyboard glyphs.

## Known caveats

1. **iOS font names are unconfirmed.** Verify on Android with the check screen. iOS needs a real test.
2. **Two-layer shadows via `boxShadow`:** check the Android rendering on the check screen. Adjust if it looks wrong.
3. **Dark-mode input styling** was ambiguous in Figma (light and dark reads came back identical). Verify visually when building the input.
4. **Blur overlays** (radius ~20 and ~109) appear on a few screens. They need `expo-blur` later. For now only the `overlay` token exists.
5. **The Figma "Tabs" component uses Inter.** Plan: restyle it in DM Sans when building tabs.
6. **Heading line heights** were "auto" in Figma, so the 4px-grid values above are our own choice.

## Acceptance checklist

- [ ] App boots with Unistyles configured before any `StyleSheet.create`
- [ ] Light and dark themes switch with the system color scheme
- [ ] Three DM Sans weights render distinctly (Android confirmed; iOS to test)
- [ ] No `fontWeight` and no hard-coded colors, fonts or spacing in components
- [ ] `tsc` and `expo-doctor` are clean, or warnings are explained
- [ ] No NativeWind/Tailwind remnants
- [ ] Check screen shows all typography variants, color roles, spacing, radii and elevations

---

## Additional details (add yours below)

<!-- Extra instructions, constraints, or file-location preferences for Claude Code -->
