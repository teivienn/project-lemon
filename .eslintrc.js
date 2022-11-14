module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/*': ['off'],
      },
    },
    {
      files: [
        '*.spec.ts',
        '*.spec.tsx',
        '*.spec.js',
        '*.spec.jsx',
        '*.test.ts',
        '*.test.tsx',
        '*.test.js',
        '*.test.jsx',
      ],
      rules: {
        '@typescript-eslint/*': 'off',
      },
    },
  ],
  plugins: ['@typescript-eslint', 'jest', 'prettier', 'react'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.json'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
    'react': {
      version: 'detect',
    },
  },
  rules: {
    'react/jsx-uses-react': 'off', // react 17+ doesn't need react imports
    'react/react-in-jsx-scope': 'off', // react 17+ doesn't need react imports
    'eol-last': ['error', 'always'],
    'import/named': ['off'],
    'import/extensions': ['off'],
    'import/no-unresolved': ['off'],
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'react/display-name': 'off',
  },
};
