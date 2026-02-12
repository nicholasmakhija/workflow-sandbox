import eslint from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import stylistic from '@stylistic/eslint-plugin';
import stylisticJsx from '@stylistic/eslint-plugin-jsx';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import tseslint from 'typescript-eslint';
import tslint from  '@typescript-eslint/eslint-plugin';

const commonRules = {
  'no-console': 1,
  'eol-last': ['error', 'always'],

  '@stylistic/arrow-parens': ['error'],
  '@stylistic/comma-dangle': ['error'],
  '@stylistic/indent': ['error', 2, {
    ignoredNodes: ['TSTypeParameterInstantiation'], // FIXME:
    SwitchCase: 1
  }],
  '@stylistic/keyword-spacing': ['error', {
    before: true,
    after: true
  }],
  '@stylistic/no-multiple-empty-lines': ['error', {
    max: 1,
    maxBOF: 0,
    maxEOF: 1
  }],
  '@stylistic/quotes': [2, 'single'],
  '@stylistic/semi': [2, 'always'],
  '@stylistic/space-before-blocks': ['error', 'always']
};

export default tseslint.config(
  {
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: true,
        // projectService: true,
        // @ts-ignore
        tsconfigRootDir: import.meta.dirname
      }
    },
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tslint,
      '@stylistic': stylistic,
      '@stylistic/jsx': stylisticJsx,
      '@stylistic/ts': stylisticTs
    },
    // @ts-ignore
    rules: {
      ...commonRules,

      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', {
        allowConstantExport: true
      }],
  
      '@stylistic/jsx-closing-bracket-location': [1, 'line-aligned'],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/jsx/jsx-curly-spacing': [2, 'never'],
      '@stylistic/jsx/jsx-equals-spacing': [2, 'never'],
      '@stylistic/jsx/jsx-max-props-per-line': [2, {
        maximum: {
          single: 2,
          multi: 1
        }
      }],
      '@stylistic/jsx/jsx-pascal-case': [2, {
        allowNamespace: true  
      }],
      '@stylistic/jsx/jsx-props-no-multi-spaces': 2,
      // FIXME:
      // '@stylistic/jsx/jsx-tag-spacing': ['error', { 
      //   closingSlash: 'never',
      //   beforeSelfClosing: 'never',
      //   afterOpening: 'never',
      //   beforeClosing: 'proportional-always'
      // }],
      '@stylistic/jsx/jsx-wrap-multilines': [2, {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
        propertyValue: 'parens-new-line'
      }],

      '@stylistic/ts/member-delimiter-style': ['error', {
        singleline: {
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
      globals: globals.browser
    },
    files: ['scripts/*.js', '**/*.mjs'],
    plugins: {
      '@stylistic': stylistic
    },
    rules: commonRules
  }
);
