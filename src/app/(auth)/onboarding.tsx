import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Onboarding() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Onboarding Screen</Text>
      <Link href="/login" style={styles.link}>
        Login ↗️
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#cecece",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 20,
  },
});
