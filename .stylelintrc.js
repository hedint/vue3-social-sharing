export default {
  extends: [
    "stylelint-config-standard-scss",
  ],
  plugins: [
    "stylelint-order",
  ],
  overrides: [
    {
      files: ["**/*.vue"],
      customSyntax: "postcss-html",
    },
  ],

  rules: {
    "string-no-newline": true,
    "block-no-empty": true,
    "comment-no-empty": true,
    "alpha-value-notation": "number",
    "at-rule-no-unknown": null,
    "no-descending-specificity": null,
    "no-empty-source": null,
    "rule-empty-line-before": [
      "always-multi-line",
      {
        except: ["first-nested"],
      },
    ],
    "scss/at-mixin-pattern": null,
    "font-family-name-quotes": "always-unless-keyword",
    "selector-no-vendor-prefix": [true, { ignoreSelectors: ["::-webkit-input-placeholder"] }],
    "property-no-vendor-prefix": [true, { ignoreProperties: ["appearance", "mask-composite"] }],
    "order/properties-alphabetical-order": true,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["deep"],
      },
    ],
    "selector-class-pattern": ["^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$", {
      message: selector => `Expected class selector "${selector}" to be in BEM format`,
    }],
    "scss/at-function-pattern": "^([a-z][a-z0-9]*)([a-z0-9_-]+)*$",
  },
};
