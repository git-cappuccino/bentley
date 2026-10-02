// TODO: delete this dev-only screen (and its link in (tabs)/index.tsx) before release.
import { Redirect } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";

const typographyKeys = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "navTitle",
  "subtitle1",
  "subtitle2",
  "paragraph1",
  "paragraph2",
  "button1",
  "button2",
  "button3",
  "label1",
  "label1Regular",
  "label2",
  "label2Bold",
] as const;
const spacingKeys = [
  "xxs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "xxl",
  "xxxl",
] as const;
const radiiKeys = ["none", "xs", "sm", "md", "lg", "full"] as const;
const elevationKeys = ["e1", "e2", "e3", "e4", "e5", "e6", "inset"] as const;

export default function StyleCheck() {
  const { theme } = useUnistyles();
  if (!__DEV__) return <Redirect href="/" />;

  const { colors } = theme;
  const swatches: [string, string][] = [
    ["background", colors.background],
    ["surface", colors.surface],
    ["surfaceMuted", colors.surfaceMuted],
    ["text.primary", colors.text.primary],
    ["text.secondary", colors.text.secondary],
    ["text.tertiary", colors.text.tertiary],
    ["text.onPrimary", colors.text.onPrimary],
    ["text.disabled", colors.text.disabled],
    ["border", colors.border],
    ["borderStrong", colors.borderStrong],
    ["primary", colors.primary],
    ["accent", colors.accent],
    ["focusBorder", colors.focusBorder],
    ["selectedTint", colors.selectedTint],
    ["chip.active.bg", colors.chip.active.bg],
    ["chip.active.text", colors.chip.active.text],
    ["chip.inactive.bg", colors.chip.inactive.bg],
    ["chip.inactive.text", colors.chip.inactive.text],
    ["overlay", colors.overlay],
    ["status.success", colors.status.success],
    ["status.error", colors.status.error],
    ["status.warning", colors.status.warning],
    ["status.info", colors.status.info],
    ["status.successBg", colors.status.successBg],
    ["status.errorBg", colors.status.errorBg],
    ["status.warningBg", colors.status.warningBg],
    ["status.infoBg", colors.status.infoBg],
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.section}>Typography</Text>
        {typographyKeys.map((k) => (
          <Text key={k} style={styles.variant(k)}>
            {k} — Sphinx of black quartz
          </Text>
        ))}

        <Text style={styles.section}>DM Sans weights</Text>
        <View style={styles.row}>
          <Text style={styles.regular}>Regular</Text>
          <Text style={styles.medium}>Medium</Text>
          <Text style={styles.bold}>Bold</Text>
        </View>

        <Text style={styles.section}>Colors</Text>
        <View style={styles.wrap}>
          {swatches.map(([name, value]) => (
            <View key={name} style={styles.swatchItem}>
              <View style={styles.swatch(value)} />
              <Text style={styles.caption}>{name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.section}>Spacing</Text>
        {spacingKeys.map((k) => (
          <View key={k} style={styles.row}>
            <View style={styles.spaceBar(k)} />
            <Text style={styles.caption}>{k}</Text>
          </View>
        ))}

        <Text style={styles.section}>Radii</Text>
        <View style={styles.wrap}>
          {radiiKeys.map((k) => (
            <View key={k} style={styles.swatchItem}>
              <View style={styles.radiusBox(k)} />
              <Text style={styles.caption}>{k}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.section}>Elevation</Text>
        <View style={styles.wrap}>
          {elevationKeys.map((k) => (
            <View key={k} style={styles.card(k)}>
              <Text style={styles.caption}>{k}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.xl, gap: theme.spacing.md },
  section: {
    ...theme.typography.h5,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.xl,
  },
  variant: (k: (typeof typographyKeys)[number]) => ({
    ...theme.typography[k],
    color: theme.colors.text.primary,
  }),
  row: { flexDirection: "row", alignItems: "center", gap: theme.spacing.lg },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.lg },
  regular: {
    ...theme.typography.label1Regular,
    color: theme.colors.text.primary,
  },
  medium: {
    ...theme.typography.h6,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.text.primary,
  },
  bold: { ...theme.typography.label1, color: theme.colors.text.primary },
  caption: { ...theme.typography.label2, color: theme.colors.text.secondary },
  swatchItem: { alignItems: "center", gap: theme.spacing.xs, width: 96 },
  swatch: (color: string) => ({
    width: 48,
    height: 48,
    borderRadius: theme.radii.sm,
    backgroundColor: color,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
  }),
  spaceBar: (k: (typeof spacingKeys)[number]) => ({
    width: theme.spacing[k],
    height: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  }),
  radiusBox: (k: (typeof radiiKeys)[number]) => ({
    width: 48,
    height: 48,
    borderRadius: theme.radii[k],
    backgroundColor: theme.colors.selectedTint,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  }),
  card: (k: (typeof elevationKeys)[number]) => ({
    width: 96,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.surface,
    boxShadow: theme.elevation[k],
  }),
}));
