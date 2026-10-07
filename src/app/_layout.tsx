import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="_playground/index"
          options={{ title: "Playground" }}
        />
        <Stack.Screen name="shop/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
