/**
 * -----------------------------------------------------
 * NOTES ON CONFIGURATION STRUCTURE
 * -----------------------------------------------------
 *
 * Out of the box, ESLint does not support TypeScript or HTML. Naturally those are the two
 * main file types we care about in Angular projects, so we have to do a little extra work
 * to configure ESLint exactly how we need to.
 *
 * Fortunately, ESLint gives us an "overrides" configuration option which allows us to set
 * different lint tooling (parser, plugins, rules etc) for different file types, which is
 * critical because our .ts files require a different parser and different rules to our
 * .html (and our inline Component) templates.
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['plugin:prettier/recommended'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        usePrettierrc: true,
      },
    ],
  },
  overrides: [
    /**
     * -----------------------------------------------------
     * TYPESCRIPT FILES (COMPONENTS, SERVICES ETC) (.ts)
     * -----------------------------------------------------
     */
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.*?.json', 'e2e/tsconfig.e2e.json'],
        sourceType: 'module',
        createDefaultProgram: true,
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@angular-eslint/recommended',
      ],
      plugins: [
        'eslint-plugin-import',
        '@angular-eslint/eslint-plugin',
        'eslint-plugin-jsdoc',
        'eslint-plugin-prefer-arrow',
        '@typescript-eslint',
      ],
      rules: {
        'import/no-default-export': 'error',
        '@angular-eslint/component-class-suffix': 'error',
        '@angular-eslint/directive-class-suffix': 'error',
        '@angular-eslint/no-host-metadata-property': 'error',
        '@angular-eslint/no-input-rename': 'error',
        '@angular-eslint/no-inputs-metadata-property': 'error',
        '@angular-eslint/no-output-on-prefix': 'error',
        '@angular-eslint/no-output-rename': 'error',
        '@angular-eslint/no-outputs-metadata-property': 'error',
        '@angular-eslint/use-lifecycle-interface': 'error',
        '@angular-eslint/use-pipe-transform-interface': 'error',
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'array-simple',
          },
        ],
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              Object: {
                message:
                  'Avoid using the `Object` type. Did you mean `object`?',
              },
              Function: {
                message:
                  'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
              },
              Boolean: {
                message:
                  'Avoid using the `Boolean` type. Did you mean `boolean`?',
              },
              Number: {
                message:
                  'Avoid using the `Number` type. Did you mean `number`?',
              },
              String: {
                message:
                  'Avoid using the `String` type. Did you mean `string`?',
              },
              Symbol: {
                message:
                  'Avoid using the `Symbol` type. Did you mean `symbol`?',
              },
            },
          },
        ],
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/dot-notation': 'error',
        '@typescript-eslint/explicit-module-boundary-types': [
          'warn',
          {
            allowedNames: [
              // only Angular lifecycle hooks
              'ngOnChanges',
              'ngOnInit',
              'ngDoCheck',
              'ngAfterContentInit',
              'ngAfterContentChecked',
              'ngAfterViewInit',
              'ngAfterViewChecked',
              'ngOnDestroy',
            ],
          },
        ],
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/member-delimiter-style': [
          'off',
          {
            multiline: {
              delimiter: 'none',
              requireLast: true,
            },
            singleline: {
              delimiter: 'semi',
              requireLast: false,
            },
          },
        ],
        '@typescript-eslint/member-ordering': [
          'error',
          {
            default: [
              'static-field',
              'static-method',
              'field',
              'constructor',
              'public-method',
              'protected-method',
              'private-method',
            ],
          },
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE', 'snake_case'],
          },
          {
            selector: 'variable',
            modifiers: ['const'],
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          },
          {
            selector: ['variable'],
            types: ['boolean'],
            format: ['PascalCase'],
            prefix: ['is', 'should', 'has', 'can', 'did', 'will', 'match'],
          },
          {
            selector: 'enum',
            format: ['PascalCase'],
          },
          {
            selector: 'enumMember',
            format: ['PascalCase', 'UPPER_CASE'],
          },
          {
            selector: 'class',
            format: ['PascalCase'],
          },
          {
            selector: 'method',
            format: ['camelCase'],
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: 'I[A-Z]',
              match: true,
            },
          },
        ],
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': [
          'error',
          {
            allowSingleExtends: true,
          },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-floating-promises': [
          'warn',
          {
            ignoreVoid: true,
            ignoreIIFE: true,
          },
        ],
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/quotes': [
          'error',
          'single',
          {
            avoidEscape: true,
            allowTemplateLiterals: true,
          },
        ],
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/restrict-template-expressions': [
          'warn',
          {
            allowAny: true,
          },
        ],
        '@typescript-eslint/semi': ['off', null],
        '@typescript-eslint/triple-slash-reference': [
          'error',
          {
            path: 'always',
            types: 'prefer-import',
            lib: 'always',
          },
        ],
        '@typescript-eslint/type-annotation-spacing': 'off',
        '@typescript-eslint/unbound-method': 0,
        '@typescript-eslint/no-unused-expressions': 0,
        '@typescript-eslint/unified-signatures': 'error',
        'arrow-parens': ['off', 'always'],
        'brace-style': ['off', 'off'],
        'comma-dangle': 'off',
        complexity: 'off',
        'constructor-super': 'error',
        'eol-last': 'off',
        eqeqeq: ['error', 'smart'],
        'guard-for-in': 'error',
        'id-blacklist': [
          'error',
          'any',
          'Number',
          'String',
          'string',
          'Boolean',
          'boolean',
          'Undefined',
          'undefined',
        ],
        'id-match': 'error',
        'import/no-deprecated': 'warn',
        'jsdoc/check-alignment': 'error',
        'jsdoc/check-indentation': [
          'error',
          {
            excludeTags: ['example', 'description'],
          },
        ],
        'jsdoc/newline-after-description': 'error',
        'linebreak-style': 'off',
        'max-len': 'off',
        'new-parens': 'off',
        'newline-per-chained-call': 'off',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-cond-assign': 'error',
        'no-debugger': 'error',
        'no-empty': 'off',
        'no-eval': 'error',
        'no-extra-semi': 'off',
        'no-fallthrough': 'error',
        'no-invalid-this': 'off',
        'no-irregular-whitespace': 'off',
        'no-multiple-empty-lines': 'off',
        'no-new-wrappers': 'error',
        'no-restricted-imports': ['error', 'rxjs/Rx'],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'off',
        'no-undef-init': 'error',
        'no-underscore-dangle': 'warn',
        'no-unsafe-finally': 'error',
        'no-unused-labels': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'one-var': ['error', 'never'],
        'prefer-arrow/prefer-arrow-functions': [
          'warn',
          {
            disallowPrototype: false,
            singleReturnOnly: true,
            classPropertiesAllowed: false,
            allowStandaloneDeclarations: true,
          },
        ],
        'prefer-const': 'error',
        'quote-props': 'off',
        radix: 'error',
        'react/jsx-curly-spacing': 'off',
        'react/jsx-equals-spacing': 'off',
        'react/jsx-wrap-multilines': 'off',
        'space-before-function-paren': 'off',
        'space-in-parens': ['off', 'never'],
        'spaced-comment': [
          'error',
          'always',
          {
            markers: ['/'],
          },
        ],
        'use-isnan': 'error',
        'valid-typeof': 'off',
        /**
         * Any TypeScript related rules you wish to use/reconfigure over and above the
         * recommended set provided by the @angular-eslint project would go here.
         *
         * There are some examples below from the @angular-eslint plugin and ESLint core:
         */
        '@angular-eslint/directive-selector': [
          'error',
          { type: 'attribute', prefix: ['app'], style: 'camelCase' },
        ],
        '@angular-eslint/component-selector': [
          'error',
          { type: 'element', prefix: ['app'], style: 'kebab-case' },
        ],
        '@angular-eslint/no-output-native': 'warn',
        quotes: ['error', 'single', { avoidEscape: true }],
        'no-console': 1,
      },
    },
    {
      files: ['src/**/*.spec.ts', 'src/**/*.d.ts'],
      parserOptions: {
        project: './src/tsconfig.spec.json',
      },
      extends: ['plugin:jasmine/recommended'],
      plugins: ['jasmine'],
      env: { jasmine: true },
      rules: {
        'jasmine/new-line-before-expect': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
      },
    },

    /**
     * -----------------------------------------------------
     * COMPONENT TEMPLATES
     * -----------------------------------------------------
     *
     * If you use inline templates, make sure you read the notes on the configuration
     * object after this one to understand how they relate to this configuration directly
     * below.
     */
    {
      files: ['*.component.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        /**
         * Any template/HTML related rules you wish to use/reconfigure over and above the
         * recommended set provided by the @angular-eslint project would go here.
         *
         * There is an example below from ESLint core (note, this specific example is not
         * necessarily recommended for all projects):
         * "max-len": ["error", { "code": 140 }]
         */
        '@angular-eslint/template/no-negated-async': 'warn',
      },
    },

    /**
     * -----------------------------------------------------
     * EXTRACT INLINE TEMPLATES (from within .component.ts)
     * -----------------------------------------------------
     *
     * This extra piece of configuration is necessary to extract inline
     * templates from within Component metadata, e.g.:
     *
     * @Component({
     *  template: `<h1>Hello, World!</h1>`
     * })
     * ...
     *
     * It works by extracting the template part of the file and treating it as
     * if it were a full .html file, and it will therefore match the configuration
     * specific for *.component.html above when it comes to actual rules etc.
     *
     * NOTE: This processor will skip a lot of work when it runs if you don"t use
     * inline templates in your projects currently, so there is no great benefit
     * in removing it, but you can if you want to.
     *
     * You won"t specify any rules here. As noted above, the rules that are relevant
     * to inline templates are the same as the ones defined for *.component.html.
     */
    // {
    //   "files": ["*.component.ts"],
    //   "extends": ["plugin:@angular-eslint/template/process-inline-templates"]
    // }
  ],
};
