import { darkColors, lightColors } from "./colors";
import { elevation } from "./elevation";
import { palette } from "./palette";
import { radii } from "./radii";
import { spacing } from "./spacing";
import { typography } from "./typography";

const shared = { palette, typography, spacing, radii, elevation };

export const lightTheme = { colors: lightColors, ...shared } as const;
export const darkTheme = { colors: darkColors, ...shared } as const;

export const themes = { light: lightTheme, dark: darkTheme };
export { breakpoints } from "./breakpoints";
