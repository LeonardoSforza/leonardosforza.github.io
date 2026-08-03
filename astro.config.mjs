// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

const isDev = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
	site: 'https://leonardosforza.github.io',
	output: 'static',
	integrations: [
		react(),
		markdoc(),
		// Keystatic admin is local-only (astro dev). Production is pure static for GitHub Pages.
		...(isDev ? [keystatic()] : []),
	],
});
