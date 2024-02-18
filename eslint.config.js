// eslint.config.js
import antfu from "@antfu/eslint-config";

export default antfu(
  {
    // customize the stylistic rules
    stylistic: {
      indent: 2, // 4, or 'tab'
      quotes: "double", // or 'single'
    },
    rules: {
      "node/prefer-global/process": ["off"],
      "antfu/top-level-function": ["off"],
      "style/semi": ["error", "always"],
      "vue/block-order": ["error", { order: ["template", "script", "style"] }],
      "eslint-comments/no-unlimited-disable": "off",
      "no-console": ["error", { allow: ["info", "error"] }],
      "style/brace-style": ["error", "1tbs"],
      "curly": ["error", "multi-line"],
      "camelcase": ["error", { properties: "never", ignoreDestructuring: true, ignoreImports: true, ignoreGlobals: true }],
    },
    jsonc: false,
    yaml: false,
  },
  {
    ignores: ["public/**"],
  },

);
