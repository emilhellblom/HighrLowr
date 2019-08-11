const INDENTS = 2;
const MAX_PROPS_PER_LINE = 2;
const STATEMENTS_PER_LINE = 2;

module.exports = {
  root: true,
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'project': './tsconfig.json',
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint',
    'typescript',
    'react-native',
  ],
  'env': {
    'es6': true,
  },
  'plugins': [
    'react',
  ],
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
  'rules': {
    'jsx-quotes': ['error', 'prefer-double'],

    'react/jsx-indent': ['error', INDENTS],
    'react/jsx-indent-props': ['error', INDENTS],
    'react/jsx-max-props-per-line': ['error', { maximum: MAX_PROPS_PER_LINE }],
    'react/jsx-curly-spacing': ['error', 'always'],
    'react/no-multi-comp': ['error', { 'ignoreStateless': true }],

    'react/jsx-one-expression-per-line': 'error',
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-curly-spacing': ['error', 'always'],
    'react/jsx-curly-brace-presence': ['error', { props: 'always' }],

    'quotes': ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'padded-blocks': [ 'error',
      { 'classes': 'always' },
    ],
    'template-curly-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    'max-statements-per-line': ['error', { 'max': STATEMENTS_PER_LINE }],
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],

    'indent': [ 'error', 2, { 'SwitchCase': 1 } ],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always',
    }],
    'padded-blocks': [ 'error',
      { 'classes': 'always' },
    ],
    'no-undef': 'error',
    'semi': 'error',
    'array-bracket-spacing': 'error',
    'object-curly-spacing': ['error', 'always'],
    'comma-spacing': 'error',
    'space-in-parens': 'error',
    'key-spacing': 'error',
    'prefer-const': 'error',
    'no-magic-numbers': 'off',

    'react/jsx-one-expression-per-line': 'error',
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-curly-spacing': ['error', 'always'],
    'react/jsx-curly-brace-presence': ['error', { props: 'always' }],
    'react/jsx-closing-bracket-location': [1, 'tag-aligned'],

  },
};
