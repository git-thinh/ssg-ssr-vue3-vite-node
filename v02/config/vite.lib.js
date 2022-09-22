import {
	defineConfig
} from 'vite'
import PATH from 'node:path'
import vue from '@vitejs/plugin-vue'

const base = '/test/'
const root = process.cwd()
export default defineConfig(async ({
	command,
	mode,
	ssrBuild
}) => {
	//const data = await asyncFunction()	
	console.log(`root     = ${root}`);

	return {
		publicDir: `${root}/lib/public`,
		build: {
			emptyOutDir: true,
			outDir: `${root}/src/_shared/components`,
			lib: {
				entry: 'lib/index.ts',
				formats: ['es'],
				fileName: 'lib-test',
			},
			rollupOptions: {
				// Externalize deps that shouldn't be bundled into the library.
				external: ['vue', '@vueuse/core'],
			},
			sourcemap: true,
			// Reduce bloat from legacy polyfills.
			target: 'esnext',
			// Leave minification up to applications.
			minify: false,
		},
		plugins: [
			vue({
				reactivityTransform: true,
			}),
		]
	};
})
