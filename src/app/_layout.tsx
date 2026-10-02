import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen
          name="about"
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen name="shop/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
