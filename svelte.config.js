import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		prerender: {
			// A missing image should warn, not stop the build
			handleHttpError: ({ status, path, message }) => {
				if (status === 404) return console.warn(`Missing file: ${path}`);
				throw new Error(message);
			}
		},
		paths: {
			relative: true
		}
	}
};

export default config;
