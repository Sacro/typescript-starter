import { defineConfig } from 'eslint/config'
import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import typescript from 'typescript-eslint'
import vitest from '@vitest/eslint-plugin'

export default defineConfig(
  stylistic.configs.recommended,

  eslint.configs.recommended,

  typescript.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': [
        'error',
        {
          allowForKnownSafeCalls: [
            { from: 'package', name: ['suite', 'test'], package: 'node:test' },
          ],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  typescript.configs.stylisticTypeChecked,
  {
    files: ['**/*.(c|m)?js'],
    extends: [typescript.configs.disableTypeChecked],
  },

  // @ts-expect-error vitest isn't quite typescript compliant
  {
    ...vitest.configs.all,
  },
)
