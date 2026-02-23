import eslint from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';
import tslint from '@typescript-eslint/eslint-plugin';
import { defineConfig } from 'eslint/config';

/** @type {import('eslint/config').Config['rules']} */
const commonRules = {
  'no-console': 1,
  'eol-last': ['error', 'always'],

  '@stylistic/arrow-parens': ['error', 'always'],
  '@stylistic/comma-dangle': ['error', 'never'],
  '@stylistic/indent': ['error', 2, {
    ignoredNodes: ['TSTypeParameterInstantiation'], // FIXME:
    MemberExpression: 1,
    SwitchCase: 1
  }],
  '@stylistic/keyword-spacing': ['error', {
    before: true,
    after: true
  }],
  '@stylistic/newline-per-chained-call': ['error', {
    ignoreChainWithDepth: 2
  }],
  '@stylistic/no-multiple-empty-lines': ['error', {
    max: 1,
    maxBOF: 0,
    maxEOF: 1
  }],
  '@stylistic/no-multi-spaces': 'error',
  '@stylistic/quotes': [2, 'single'],
  '@stylistic/semi': [2, 'always'],
  '@stylistic/space-before-blocks': ['error', 'always']
};

export default defineConfig([
  {
    extends: [
      eslint.configs.recommended,
      stylistic.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: true,
        // projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tslint,
      '@stylistic': stylistic
    },
    rules: {
      ...commonRules,

      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', {
        allowConstantExport: true
      }],
  
      '@stylistic/jsx-closing-bracket-location': ['error', {
        selfClosing: 'line-aligned',
        nonEmpty: 'line-aligned'
      }],
      '@stylistic/jsx-closing-tag-location': ['error', 'line-aligned'],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/jsx-curly-spacing': ['error', 'never', {
        allowMultiline: false,
        spacing: {
          objectLiterals: 'never'
        }
      }],
      '@stylistic/jsx-equals-spacing': ['error', 'never'],
      '@stylistic/jsx-max-props-per-line': ['error', {
        maximum: {
          single: 2,
          multi: 1
        }
      }],
      '@stylistic/jsx-one-expression-per-line': ['error', { 
        allow: 'non-jsx'
      }],
      // FIXME: below not required in `.tsx` as camel case not recognised as JSX?
      '@stylistic/jsx-pascal-case': [2, {
        allowNamespace: true  
      }],
      // FIXME:
      // '@stylistic/jsx-tag-spacing': ['error', { 
      //   closingSlash: 'never',
      //   beforeSelfClosing: 'never',
      //   afterOpening: 'never',
      //   beforeClosing: 'proportional-always'
      // }],
      '@stylistic/jsx-wrap-multilines': [2, {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
        propertyValue: 'parens-new-line'
      }],

      '@stylistic/member-delimiter-style': ['error', {
        singleline: {
          delimiter: 'semi',
          requireLast: true
        },
        multiline: {
          delimiter: 'semi',
          requireLast: true
        }
      }],
  
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/naming-convention': ['error', {
        selector: [
          'objectLiteralProperty',
          'parameter',
          'parameterProperty',
          'typeProperty',
          'variable'
        ],
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'has', 'can']
      }],
      '@typescript-eslint/no-confusing-void-expression': ['error', {
        ignoreArrowShorthand: true
      }],
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-inferrable-types': ['error', {
        ignoreParameters: true
      }],
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/restrict-plus-operands': ['error', {
        allowNumberAndString: true
      }],
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off'
    }
  },
  {
    extends: [
      eslint.configs.recommended
    ],
    languageOptions: {
      globals: globals.node
    },
    files: ['**/*.js', '**/*.mjs'],
    plugins: {
      '@stylistic': stylistic
    },
    rules: commonRules,
    ignores: ['./dist/**']
  }
]);
