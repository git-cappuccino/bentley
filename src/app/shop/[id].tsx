import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Shop() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Shop {id}</Text>
        <Pressable onPress={() => router.dismissTo("/")} style={styles.link}>
          <Text>Home ↗️</Text>
        </Pressable>
      </View>
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
