# Abnegation: Styling Standards

Rules for every screen and component in this repo. Written for humans and for Claude Code.
Foundation: Unistyles v3 + DM Sans (embedded via the `expo-font` config plugin) + a two-layer token theme in `src/theme/`. Values come from the Figma kit and were snapped to standard scales (see `docs/styling-foundation.md`).

## 1. Vocabulary

- **Token:** a named design value exported from `src/theme/`. Components use tokens instead of raw numbers or hex codes.
- **Primitive token:** `palette.*` (raw color ramps). Only `src/theme/colors.ts` may read these.
- **Semantic token:** `theme.colors.*` (roles such as `text.primary`, `surface`, `border`). Components read these. Dark mode lives in how each role maps to the palette.
- **Bundle token:** `theme.typography.*` (an object with `fontFamily`, `fontSize`, `lineHeight`, `letterSpacing`) that is spread into a style.
- **Single-layer tokens:** `theme.spacing.*`, `theme.radii.*`, `theme.elevation.*` (same in both themes).

## 2. Always

1. Import `StyleSheet` from `react-native-unistyles`, never from `react-native`.
2. Colors: use only `theme.colors.*`. Never import or read `palette` in a component.
3. Text: spread a variant, then set the color separately.
   `...theme.typography.label1, color: theme.colors.text.primary`
   Variants intentionally carry no color.
4. Layout values: use `theme.spacing.*` and `theme.radii.*`. Standard horizontal screen padding is `theme.spacing.xl` (24).
5. Depth: use `boxShadow: theme.elevation.eN` (e1 to e6). In dark mode, depth comes mostly from `surface` vs `background`, not shadows.
6. Keep all UI code under `src/` (the Unistyles Babel plugin `root` is `src`). Files outside it are not processed.
7. Use `StyleSheet.create((theme) => ({ ... }))`. For per-instance values, use dynamic style functions (for example `card: (selected: boolean) => ({ ... })`).
8. Verify every screen in **both light and dark** before calling it done.

## 3. Never

1. No hard-coded hex, rgba, font names, `fontWeight`, or magic-number spacing/radii in components.
2. No inline style objects (`style={{ ... }}`).
3. No `fontWeight`. Weight is chosen by font family (`DMSans-Regular`, `DMSans-Medium`, `DMSans-Bold`), because `fontWeight` does not reliably pick custom font files on Android.
4. Do not spread a Unistyles style into a new object at render time. Combine styles with arrays instead: `style={[styles.card, selected && styles.cardSelected]}`.
5. Do not use `useUnistyles()` for ordinary styling. It triggers React re-renders. Use it only when a theme value is needed as a JS value (an icon's `color` prop, `ActivityIndicator`, navigation theme).
6. Do not add NativeWind, Tailwind, or other styling libraries.
7. Do not edit generated native folders (`android/`, `ios/`). `app.json` and plugins are the source of truth (CNG).

## 4. Patterns

### Basic themed component

```tsx
import { View, Text } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export function ServiceCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Haircut</Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    padding: theme.spacing.lg,
    boxShadow: theme.elevation.e3,
  },
  title: { ...theme.typography.label1, color: theme.colors.text.primary },
}));
```

### Third-party components

Components that are not React Native primitives (for example `expo-image`) are not tracked automatically by Unistyles. Use `withUnistyles` or read the value with `useUnistyles()`. Confirm the current API in the Unistyles docs before using it.

### Adding or changing a token

1. New color: add to `palette.ts` only if it is a genuine new brand value. Then map it to a semantic role in `colors.ts` for **both** light and dark. Never use a one-off hex in a component.
2. Off-scale Figma value: snap it to the nearest token (ties round down) and note the decision in `docs/styling-foundation.md`.
3. Missing role: add the role to the `ColorTokens` interface and to **both** `lightColors` and `darkColors`.

### Adding a font (needs a native rebuild)

1. Add the static TTF to `assets/fonts/` (verify the PostScript name matches the filename).
2. Add its path to the `expo-font` plugin entry in `app.json`. A file in `assets/fonts/` is **not** registered until it is listed.
3. Add the family to `typography.family` and define variants in `typography.ts`.
4. Rebuild the dev client.

## 5. Rebuild vs hot reload

| Change                                               | Native rebuild?                                                  |
| ---------------------------------------------------- | ---------------------------------------------------------------- |
| Edit a token value, a style, a screen                | No (JS only; a full JS reload may occur for non-component files) |
| Edit `babel.config.js`                               | No, but restart Metro with `-c`                                  |
| Add or change a font file                            | **Yes**                                                          |
| Add a native module (for example `expo-blur`)        | **Yes**                                                          |
| Change plugins or `userInterfaceStyle` in `app.json` | **Yes**                                                          |

## 6. Known state and exceptions

- Migration status: `onboarding.tsx` is tokenized. `login.tsx`, `(tabs)/account.tsx`, `(tabs)/index.tsx`, `shop/[id].tsx` and `ButtonGroup.tsx` still contain hard-coded values. Migrate each file when it is next touched.
- `src/app/_dev/style-check.tsx` is a dev-only visual test page. Delete it (and its link in `(tabs)/index.tsx`) before release.
- iOS has not been tested yet (font names, shadows).
- Navigation header is not yet themed (white header in dark mode). To be wired to tokens when building navigation.
- Blur overlays in the design need `expo-blur` later. Only an `overlay` token exists now.

## 7. Review checklist for any styling change

- [ ] `StyleSheet` imported from `react-native-unistyles`
- [ ] No raw hex/rgba, font names, `fontWeight`, or magic numbers
- [ ] Colors are semantic roles, not palette entries
- [ ] Text variant spread plus a separate color
- [ ] Checked in light and dark
- [ ] New tokens exist in both themes
- [ ] `npx tsc --noEmit` is clean
