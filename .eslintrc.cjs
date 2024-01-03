/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-prettier/skip-formatting',
        './.eslintrc-auto-import.json'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        process: true
    },
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'vue/script-indent': ['off', 4],
        'vue/html-indent': ['off', 4],
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/no-explicit-any': ['off'],
        // 禁止使用拖尾逗号
        'comma-dangle': [1, 'never'],
        // 禁止使用分号
        'semi': [1, 'never'],
        // 使用单引号
        'quotes': [1, 'single'],
        // 禁用行尾空白
        'no-trailing-spaces': [1],
        // 强制一行的最大长度
        'max-len': 0
    }
}
