import { palette as p } from "./palette";

export interface ColorTokens {
  background: string;
  surface: string;
  surfaceMuted: string;
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    onPrimary: string;
    disabled: string;
  };
  border: string;
  borderStrong: string;
  primary: string;
  accent: string;
  focusBorder: string;
  selectedTint: string;
  chip: {
    active: { bg: string; text: string };
    inactive: { bg: string; text: string };
  };
  overlay: string;
  status: Record<
    | "success"
    | "error"
    | "warning"
    | "info"
    | "successBg"
    | "errorBg"
    | "warningBg"
    | "infoBg",
    string
  >;
}

const status = {
  success: p.success[0],
  error: p.error[0],
  warning: p.warning[1],
  info: p.info[1],
  // Background tints use ramp step 4 of each status ramp.
  successBg: p.success[4],
  errorBg: p.error[4],
  warningBg: p.warning[4],
  infoBg: p.info[4],
};

const overlay = "rgba(28,28,40,0.96)";

export const lightColors: ColorTokens = {
  background: p.light[4],
  surface: p.light[4],
  surfaceMuted: p.light[2],
  text: {
    primary: p.dark[0],
    secondary: p.dark[3],
    tertiary: p.dark[3],
    onPrimary: p.light[4],
    disabled: p.dark[3],
  },
  border: p.dark[4],
  borderStrong: p.dark[0],
  primary: p.purple[2],
  accent: p.purple[2],
  focusBorder: p.purple[2],
  selectedTint: "rgba(100,64,254,0.10)",
  chip: {
    active: { bg: p.dark[0], text: p.light[4] },
    inactive: { bg: p.light[1], text: p.dark[0] },
  },
  overlay,
  status,
};

export const darkColors: ColorTokens = {
  background: p.dark[0],
  surface: p.dark[1],
  surfaceMuted: p.dark[1],
  text: {
    primary: p.light[4],
    secondary: p.light[0],
    tertiary: p.dark[4],
    onPrimary: p.light[4],
    disabled: p.dark[3],
  },
  border: p.dark[2],
  borderStrong: p.light[0],
  primary: p.purple[2],
  accent: p.purple[3],
  focusBorder: p.purple[3],
  selectedTint: "rgba(100,64,254,0.40)",
  chip: {
    active: { bg: p.light[0], text: p.dark[0] },
    inactive: { bg: p.dark[2], text: p.light[4] },
  },
  overlay,
  status,
};
