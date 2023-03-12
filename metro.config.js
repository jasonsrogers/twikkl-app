// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/**
 * This is to avoid permission issues when running the expo server on Windows. <br>
 * Check [this GitHub issue.](https://github.com/expo/expo-cli/issues/2021#issuecomment-1239989633)
 * @returns {RegExp}
 */
const getBlacklistRE = function getBlacklistRE() {
  return new RegExp(
    "(.*\\android\\.*|.*__fixtures__\\.*|node_modules[\\\\]react[\\\\]dist[\\\\].*|website\\node_modules\\.*|heapCapture\\bundle.js|.*__tests__\\.*)$",
  );
};
module.exports = {
  ...getDefaultConfig(__dirname),
  resolver: {
    blockList: getBlacklistRE(),
    blockListRE: getBlacklistRE(),
  },
};
