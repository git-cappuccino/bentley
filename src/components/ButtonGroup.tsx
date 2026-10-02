import { Pressable, Text, View } from "react-native";

export type ButtonItem = { id: string; action: () => void; label: string };
export type ButtonGroupProps = {
  buttons: ButtonItem[];
};

export default function ButtonGroup({ buttons }: ButtonGroupProps) {
  const shopRedirects = buttons.map((button) => (
    <Pressable key={button.id} onPress={button.action}>
      <Text>{button.label}</Text>
    </Pressable>
  ));
  return <View>{shopRedirects}</View>;
}
