import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Shop() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Shop {id}</Text>
        <Pressable onPress={() => router.dismissTo("/")}>
          <Text>Home</Text>
        </Pressable>
        <Pressable onPress={() => router.replace("/")}>
          <Text>Home (Replace)</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
