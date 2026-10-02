module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Must stay listed so it runs before the React Compiler (added by babel-preset-expo).
      // root is 'src' because both routes (src/app) and components (src/components) live there.
      ["react-native-unistyles/plugin", { root: "src" }],
    ],
  };
};
