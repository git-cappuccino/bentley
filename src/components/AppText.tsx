import { ColorTokens } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { Text, type TextProps } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type Variant = Exclude<keyof typeof typography, "family">;
type Tone = keyof ColorTokens["text"];
interface AppTextProps extends TextProps {
  variant?: Variant;
  tone?: Tone;
}

export default function AppText({
  variant = "paragraph1",
  tone = "primary",
  style,
  ...rest
}: AppTextProps) {
  return <Text style={[styles.text(variant, tone), style]} {...rest} />;
}

const styles = StyleSheet.create((theme) => ({
  text: (variant: Variant, tone: Tone) => ({
    ...theme.typography[variant],
    color: theme.colors.text[tone],
  }),
}));
