// svelte.config.js

import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// Specify the directory where the build output will be placed
			pages: 'dist',
			assets: 'dist',
			fallback: 'index.html' // Enables SPA fallback for dynamic routes
		})

		// Optional: Specify the base path if your app is served from a subdirectory
		// paths: {
		//   base: '/your-subdirectory'
		// },
	}
};

export default config;
