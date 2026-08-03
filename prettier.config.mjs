/** @type {import('prettier').Config} */
export default {
	semi: true,
	singleQuote: true,
	trailingComma: 'all',
	printWidth: 100,
	useTabs: true,
	plugins: ['prettier-plugin-astro'],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
};
