import ButtonGroup, { type ButtonItem } from "@/components/ButtonGroup";
import { Link, router } from "expo-router";
import { Fragment, useState } from "react";
import { Pressable, Text } from "react-native";

export default function Index() {
  const [counter, setCounter] = useState(0);
  const buttons: ButtonItem[] = [
    {
      id: "11",
      label: "Headquarters",
      action: () => router.push("/shop/11"),
    },
    {
      id: "12",
      label: "Subsidiary",
      action: () => router.push("/shop/12"),
    },
    {
      id: "13",
      label: "Allies",
      action: () => router.push("/shop/13"),
    },
  ];

  return (
    <Fragment>
      <Text>{counter}</Text>
      <Pressable onPress={() => setCounter((prev) => prev + 1)}>
        <Text>Increment</Text>
      </Pressable>
      <Link href="/onboarding">Go to Onboarding</Link>
      <Link href="/about">Go to About</Link>
      <ButtonGroup buttons={buttons} />
    </Fragment>
  );
}
