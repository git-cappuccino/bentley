import ShopCard from "@/components/concepts/ShopCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

export default function PlaygroundScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ShopCard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
}));
