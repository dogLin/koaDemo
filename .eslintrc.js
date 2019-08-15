module.exports = {
    parser: '@typescript-eslint/parser',
    env: {
        es6: true,
        node: true
    },
    extends: [
        'standard',
        "eslint:recommended",
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        indent: 'off',
        "require-atomic-updates": "off",
        "camelcase": 'off',
        '@typescript-eslint/indent': [
          'error',
          2
        ],
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-use-before-define': 0
    }
}