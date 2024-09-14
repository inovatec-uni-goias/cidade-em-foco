const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
	env: {
		es2020: true,
		node: true,
		jest: true
	},
	extends: ['airbnb-base'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 11,
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'prettier', 'eslint-plugin-import-helpers'],
	settings: {
		'import/resolver': {
			typescript: {
				project
			}
		}
	},
	rules: {
		'import/prefer-default-export': 'off',
		'import/extensions': 'off',
		'prettier/prettier': 'off',
		'comma-dangle': 'off',
		'lines-between-class-members': 'off'
	}
};
