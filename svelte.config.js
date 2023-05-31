import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		// See https://github.com/metonym/sveltekit-gh-pages
		paths: {
			base: process.env.NODE_ENV === "production" ? "/obsidian-geo-helper" : "",
		}
	},
};

export default config;
