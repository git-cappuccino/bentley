// Weight is selected by font family name. Never set fontWeight: it does not reliably
// pick custom font files on Android.
const family = {
  regular: "DMSans-Regular",
  medium: "DMSans-Medium",
  bold: "DMSans-Bold",
} as const;

const v = (
  fontFamily: (typeof family)[keyof typeof family],
  fontSize: number,
  lineHeight: number,
  letterSpacing: number,
) => ({ fontFamily, fontSize, lineHeight, letterSpacing });

export const typography = {
  family,
  h1: v(family.medium, 96, 104, -1.5),
  h2: v(family.medium, 60, 68, -0.5),
  h3: v(family.medium, 48, 56, 0),
  h4: v(family.bold, 32, 40, 0.25),
  h5: v(family.bold, 24, 32, -0.48),
  h6: v(family.bold, 20, 28, -0.4),
  navTitle: v(family.bold, 18, 24, 0), // weight assumed; confirm when building nav
  subtitle1: v(family.regular, 15, 22, 0.15),
  subtitle2: v(family.regular, 13, 20, 0.1),
  paragraph1: v(family.regular, 15, 22, 0.5),
  paragraph2: v(family.regular, 13, 20, 0.25),
  button1: v(family.bold, 16, 24, 0),
  button2: v(family.bold, 14, 24, 0),
  button3: v(family.bold, 12, 24, 0),
  label1: v(family.bold, 15, 22, 0),
  label1Regular: v(family.regular, 15, 22, 0),
  label2: v(family.regular, 10, 16, 0),
  label2Bold: v(family.bold, 10, 16, 0),
} as const;
