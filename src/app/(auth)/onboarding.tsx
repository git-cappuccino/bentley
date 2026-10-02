import { Link } from "expo-router";
import { Text } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Onboarding() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Onboarding Screen</Text>
      <Link href="/login" style={styles.link}>
        Login ↗️
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  title: {
    ...theme.typography.h5,
    color: theme.colors.text.primary,
  },
  link: {
    ...theme.typography.button2,
    color: theme.colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.xs,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    marginVertical: theme.spacing.xl,
  },
}));
