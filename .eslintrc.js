module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": 0,
        "indent": ["error", 4,{ "SwitchCase": 1 }],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "jsx-a11y/href-no-hash":0,
        "arrow-body-style": ["error", "always"],
        "arrow-parens": ["error", "as-needed"],
        "react/jsx-boolean-value":["error", "always"],
        "react/destructuring-assignment": "off",
        "react/jsx-props-no-spreading": "off",
        "react/no-unused-state":"off",
        "max-len": ["error", 200],
        "jsx-a11y/label-has-for": 0,
        "react/require-default-props": 0,
        "react/function-component-definition": "off",
        "react/no-unused-class-component-methods": "off",
        "default-param-last": "off",
        "function-paren-newline": "off",
        "no-underscore-dangle":0,
        "jsx-a11y/no-static-element-interactions":0,
        "lines-between-class-members": ["error", "always"],
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
        "class-methods-use-this": "off",
        "import/no-cycle": "off",
        "react/no-deprecated": "off"
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "mocha": true
    },
    "parser": "@babel/eslint-parser",
    "parserOptions": {
        "requireConfigFile": false,
        "babelOptions": { "presets": ["@babel/preset-react"] },
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "globalReturn": true,
            "jsx": true
        }
    }
};
