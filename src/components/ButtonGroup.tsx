import { Pressable, StyleSheet, Text, View } from "react-native";

export type ButtonItem = { id: string; action: () => void; label: string };
export type ButtonGroupProps = {
  buttons: ButtonItem[];
};

export default function ButtonGroup({ buttons }: ButtonGroupProps) {
  const shopRedirects = buttons.map((button) => (
    <Pressable key={button.id} onPress={button.action} style={styles.link}>
      <Text>{button.label} ↗️</Text>
    </Pressable>
  ));
  return <View>{shopRedirects}</View>;
}

const styles = StyleSheet.create({
  link: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#cecece",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 20,
  },
});
