const {
  withAndroidManifest,
  withDangerousMod,
} = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

// A custom networkSecurityConfig fully replaces the manifest's default cleartext
// policy, so cleartextTrafficPermitted has to be restored explicitly (needed for
// the dev client's plain-HTTP connection to the Metro server on the LAN).
// debug-overrides is a no-op in release builds, so production APKs never trust
// anything beyond the system CA store — this only affects local dev builds,
// letting them trust a manually-installed corporate proxy CA on the emulator.
const NETWORK_SECURITY_CONFIG_XML = `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
    <debug-overrides>
        <trust-anchors>
            <certificates src="system" />
            <certificates src="user" />
        </trust-anchors>
    </debug-overrides>
</network-security-config>
`;

function withNetworkSecurityConfigFile(config) {
  return withDangerousMod(config, [
    "android",
    (config) => {
      const xmlDir = path.join(
        config.modRequest.platformProjectRoot,
        "app/src/main/res/xml",
      );
      fs.mkdirSync(xmlDir, { recursive: true });
      fs.writeFileSync(
        path.join(xmlDir, "network_security_config.xml"),
        NETWORK_SECURITY_CONFIG_XML,
      );
      return config;
    },
  ]);
}

function withNetworkSecurityConfigManifest(config) {
  return withAndroidManifest(config, (config) => {
    config.modResults.manifest.application[0].$[
      "android:networkSecurityConfig"
    ] = "@xml/network_security_config";
    return config;
  });
}

module.exports = function withDebugNetworkSecurityConfig(config) {
  config = withNetworkSecurityConfigFile(config);
  config = withNetworkSecurityConfigManifest(config);
  return config;
};
