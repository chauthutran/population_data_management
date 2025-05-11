module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended', // This enables eslint-plugin-prettier and eslint-config-prettier
    ],
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                tabWidth: 4,
                useTabs: false,
                endOfLine: 'lf',
            },
        ],
    },
};
