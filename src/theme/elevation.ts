// RN multi-shadow `boxShadow`, layer 1 first. Same in light and dark.
// Alpha conversions from RRGGBBAA: 29 -> 0.16, 14 -> 0.08, 0A -> 0.04, 3D -> 0.24, 52 -> 0.32.
const key = "rgba(96,97,112,0.16)";
const keyStrong = "rgba(96,97,112,0.24)";
const ambient = "rgba(40,41,61,0.08)";
const ambientSoft = "rgba(40,41,61,0.04)";

export const elevation = {
  e1: `0px 0.5px 2px ${key}, 0px 0px 1px ${ambient}`,
  e2: `0px 2px 4px ${key}, 0px 0px 1px ${ambientSoft}`,
  e3: `0px 4px 8px ${key}, 0px 0px 2px ${ambientSoft}`,
  e4: `0px 8px 16px ${key}, 0px 2px 4px ${ambientSoft}`,
  e5: `0px 16px 24px ${key}, 0px 2px 8px ${ambientSoft}`,
  e6: `0px 20px 32px ${keyStrong}, 0px 2px 8px ${ambient}`,
  // Single inner layer only (the spec lists no second layer).
  inset: "inset 0px 0.5px 4px rgba(96,97,112,0.32)",
} as const;
