module.exports = {
  "env": {
    "browser": true,
    "es6": true,
  },
  "extends": ["eslint:recommended", "react-app"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    // "indent": ["error", 2],
    "no-unused-vars": 0,
    "comma-dangle": 0,
    "eol-last": 1,
    "no-console": 1,
    "semi": 1,
    "require-atomic-updates": "off"
  }

};
