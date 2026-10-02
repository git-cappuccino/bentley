// Raw ramps. Index 4 = lightest, 0 = darkest. Components must not consume these directly.
export const palette = {
  purple: {
    4: "#CBBFFF",
    3: "#9880FE",
    2: "#6440FE",
    1: "#3F13FE",
    0: "#2C01E2",
  },
  dark: {
    4: "#C7C9D9",
    3: "#8F90A6",
    2: "#555770",
    1: "#28293D",
    0: "#1C1C28",
  },
  light: {
    4: "#FFFFFF",
    3: "#FAFAFC",
    2: "#F2F2F5",
    1: "#EBEBF0",
    0: "#E4E4EB",
  },
  success: {
    4: "#E3FFF1",
    3: "#57EBA1",
    2: "#39D98A",
    1: "#06C270",
    0: "#05A660",
  },
  error: {
    4: "#FFE5E5",
    3: "#FF8080",
    2: "#FF5C5C",
    1: "#FF3B3B",
    0: "#E53535",
  },
  warning: {
    4: "#FFF8E5",
    3: "#FCCC75",
    2: "#FDAC42",
    1: "#FF8800",
    0: "#E57A00",
  },
  info: {
    4: "#E5F0FF",
    3: "#9DBFF9",
    2: "#5B8DEF",
    1: "#0063F7",
    0: "#004FC4",
  },
  alert: {
    4: "#FFFEE5",
    3: "#FDED72",
    2: "#FDDD48",
    1: "#FFCC00",
    0: "#E5B800",
  },
} as const;
