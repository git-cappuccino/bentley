import ButtonGroup, { type ButtonItem } from "@/components/ButtonGroup";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

export default function Index() {
  const [counter, setCounter] = useState(0);
  const buttons: ButtonItem[] = [
    {
      id: "11",
      label: "Headquarters",
      action: () => router.push("/shop/11"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.count}>{counter}</Text>
      <Pressable
        onPress={() => setCounter((prev) => prev + 1)}
        style={styles.incrementButton}
      >
        <Text>Increment</Text>
      </Pressable>
      <Link href="/onboarding" style={styles.link}>
        Go to Onboarding ↗️
      </Link>
      {/* TODO: remove with the dev style-check screen before release. */}
      {__DEV__ && (
        <>
          <Link href="/_dev/style-check" style={styles.link}>
            Style check (dev) ↗️
          </Link>
          <Link href="/_playground" style={styles.link}>
            Playground (dev) ↗️
          </Link>
        </>
      )}
      <ButtonGroup buttons={buttons} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#cecece",
    padding: 10,
  },
  incrementButton: {
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "#e5e5e5",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 20,
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
