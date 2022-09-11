import PATH from 'node:path'
import { fileURLToPath, URL } from "node:url";
import {
	defineConfig
} from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

const virtualFile = '@virtual-file'
const virtualId = '\0' + virtualFile
const nestedVirtualFile = '@nested-virtual-file'
const nestedVirtualId = '\0' + nestedVirtualFile

const base = '/test/'

// preserve this to test loading __filename & __dirname in ESM as Vite polyfills them.
// if Vite incorrectly load this file, node.js would error out.
globalThis.__vite_test_filename = __filename
globalThis.__vite_test_dirname = __dirname

let __pathRuntimeCom = PATH.resolve(__dirname, '../iot-runtime/src/templates/');
let __pathRuntimeJs = PATH.resolve(__dirname, '../iot-runtime/src/js/');
console.log(`>>>>> [ RUNTIME_PATH = ${__pathRuntimeCom} ]`);

export default defineConfig(({
	command,
	ssrBuild
}) => ({
	base,


	plugins: [
		vuePlugin(),
		vueJsx(),

		// https://github.com/antfu/unplugin-auto-import
		// AutoImport({
		//   imports: [
		//     'vue',
		//     'vue-router',
		//   ],      
		//   dts: 'src/auto-imports.d.ts'
		// }),

		// https://github.com/antfu/unplugin-auto-import
		AutoImport({
			include: [/\.ts$/, /\.vue$/, /\.md$/],
			imports: [
				//'vue',
				//'vue-router',
				//'vue/macros',
				//'@vueuse/head',
				//'@vueuse/sound',
				//'@vueuse/core',

				{
					'vue': ['createSSRApp', 'useSSRContext', 'ref', 'reactive',
						'defineAsyncComponent'
					],
					'@vueuse/core': ['useElementVisibility'],

					// '@vueuse/head': ['head'],
					// '@nuxt/devalue': ['devalue'],
					// 'pinia': ['createPinia'],		
					// '~/router': ['createRouter'],
					// '~/store/page': ['usePageStore'],
				},

				// 		{
				// 			'@vueuse/core': [
				// 				// https://vueuse.org/guide/
				// 				// import { useMouse } from '@vueuse/core',
				// 				'useScriptTag',//https://vueuse.org/core/useScriptTag/
				// 				'useNetwork', 'useOnline',
				// 				'useClipboard',
				// 				'useFullscreen', //https://vueuse.org/core/useFullscreen/#demo
				// 				'useObjectUrl', //https://vueuse.org/core/useObjectUrl/#usage
				// 				'useFileDialog', //https://vueuse.org/core/useFileDialog/#demo
				// 				'useFileSystemAccess', //https://vueuse.org/core/useFileSystemAccess/#demo
				// 				'useEyeDropper', //https://vueuse.org/core/useEyeDropper/#component-usage
				// 				'useCssVar', 'useDark', 'useToggle', 'useMouse', 'onClickOutside', 'useConfirmDialog',
				// 				'useMediaControls', //https://vueuse.org/core/useMediaControls/
				// 				'useImage', 'useInfiniteScroll', 'useMouseInElement',
				// 				'useElementVisibility', 'useDocumentVisibility',
				// 				'useDevicesList', 'useUserMedia', 'useSpeechRecognition', 'useSpeechSynthesis',
				// 				// alias
				// 				['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
				// 			],
				// 			'@vueuse/sound': ['useSound'], //import { useSound } from '@vueuse/sound'

				// 			//'vue': ['defineComponent', 'computed'],
				// 			//'~store/user': ['useUserStore'] 

				// 			'axios': [['default', 'axios']], //// import { default as axios } from 'axios',
				// 			'vue-request': ['useRequest', 'usePagination'],

				// 			//'^/type/speech-types': ['__postApi'],

				// 			'♥/setup/AppSetup': ['AppSetup'],

				// 			'^/mixin/GlobalFunction': ['__getWindow', '__postApi'],
				// 			'^/mixin/MixLayout': ['MixLayout'],
				// 			'^/mixin/MixPage': ['MixPage'],
				// 			'^/mixin/MixComponent': ['MixComponent'],
				// 		},
				// '[package-name]': [
				// 	 '[import-names]',
				// 	 ['[from]', '[alias]'],
				// ],
			],

			// Auto import for all module exports under directories
			// dirs: [
			// 	// './hooks',
			// 	// './composables'
			// 	// ...
			// ],

			// Filepath to generate corresponding .d.ts file.
			// Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
			// Set `false` to disable.
			dts: 'src/auto-imports.d.ts',
			//dts: `src/${_projectCode}/auto-imports.d.ts`,

			// Auto import inside Vue template
			// see https://github.com/unjs/unimport/pull/15
			//vueTemplate: false,

			// Custom resolvers, compatible with `unplugin-vue-components`
			// see https://github.com/antfu/unplugin-auto-import/pull/23/
			//resolvers: [/* ... */],
		}),

		// https://github.com/antfu/unplugin-vue-components
		// Components({
		// 	// relative paths to the directory to search for components
		// 	dirs: ['src/**/components'],
		// 	// allow auto load markdown components under `./src/components/`
		// 	extensions: ['vue'],
		// 	// allow auto import and register components used in markdown
		// 	include: [/\.vue$/, /\.vue\?vue/],
		// 	dts: 'src/components.d.ts'
		// }),
		// https://github.com/antfu/unplugin-vue-components
		Components({
			// relative paths to the directory to search for components.
			dirs: [
				`./src/Test`,
				//__pathRuntimeCom,
				//`src/${_projectCode}/components`,
				//`src/${_projectCode}/contents`,
				//__pathRuntimeShared,
				//__pathRuntimeProject,
			],

			// search for subdirectories
			deep: true,
			// resolvers for custom components
			resolvers: [],

			// generate `components.d.ts` global declarations,
			// also accepts a path for custom filename
			// default: `true` if package typescript is installed
			dts: false,

			// Allow subdirectories as namespace prefix for components.
			directoryAsNamespace: false,
			// Subdirectory paths for ignoring namespace prefixes
			// works when `directoryAsNamespace: true`
			globalNamespaces: [],

			// auto import for directives
			// default: `true` for Vue 3, `false` for Vue 2
			// Babel is needed to do the transformation for Vue 2, it's disabled by default for performance concerns.
			// To install Babel, run: `npm install -D @babel/parser`
			directives: true,

			// Transform path before resolving
			//importPathTransform: v => v,

			// Allow for components to override other components with the same name
			allowOverrides: false,

			// valid file extensions for components.
			extensions: ['vue'],
			// filters for transforming targets
			include: [/\.vue$/, /\.vue\?vue/],
			exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
		}),


		{
			name: 'virtual',
			resolveId(id) {
				if (id === '@foo') {
					return id
				}
			},
			load(id, options) {
				const ssrFromOptions = options?.ssr ?? false
				if (id === '@foo') {
					// Force a mismatch error if ssrBuild is different from ssrFromOptions
					const v1 = (command === 'build' && !!ssrBuild !== ssrFromOptions) ?
						`defineConfig ssrBuild !== ssr from load options` : 'hi'
					return `export default { msg: '${v1}' }`
				}
			}
		},

		{
			name: 'virtual-module',
			resolveId(id) {
				if (id === virtualFile) {
					return virtualId
				} else if (id === nestedVirtualFile) {
					return nestedVirtualId
				}
			},
			load(id) {
				if (id === virtualId) {
					return `export { msg } from "@nested-virtual-file";`
				} else if (id === nestedVirtualId) {
					return `export const msg = "[success] from conventional virtual file"`
				}
			}
		},

		// Example of a plugin that injects a helper from a virtual module that can
		// be used in renderBuiltUrl
		(function() {
			const queryRE = /\?.*$/s
			const hashRE = /#.*$/s
			const cleanUrl = (url) => url.replace(hashRE, '').replace(queryRE, '')
			let config

			const virtualId = '\0virtual:ssr-vue-built-url'
			return {
				name: 'built-url',
				enforce: 'post',
				configResolved(_config) {
					config = _config
				},
				resolveId(id) {
					if (id === virtualId) {
						return id
					}
				},
				load(id) {
					if (id === virtualId) {
						return {
							code: `export const __ssr_vue_processAssetPath = (url) => '${base}' + url`,
							moduleSideEffects: 'no-treeshake'
						}
					}
				},
				transform(code, id) {
					const cleanId = cleanUrl(id)
					if (
						config.build.ssr &&
						(cleanId.endsWith('.js') || cleanId.endsWith('.vue')) &&
						!code.includes('__ssr_vue_processAssetPath')
					) {
						return {
							code: `import { __ssr_vue_processAssetPath } from '${virtualId}';__ssr_vue_processAssetPath;` +
								code,
							sourcemap: null // no sourcemap support to speed up CI
						}
					}
				}
			}
		})()
	],
	
	// resolve: {
	// 	alias: {
	// 		//'@': path.resolve(__dirname, './src')
	// 		'^runtimecom': __pathRuntimeCom
	// 		//"@": fileURLToPath(new URL("./src", import.meta.url)),
	// 		//"@": fileURLToPath(new URL("../iot-runtime/src", import.meta.url)),
	// 	},
	// },
	
	experimental: {
		renderBuiltUrl(filename, {
			hostType,
			type,
			ssr
		}) {
			if (ssr && type === 'asset' && hostType === 'js') {
				return {
					runtime: `__ssr_vue_processAssetPath(${JSON.stringify(filename)})`
				}
			}
		}
	},

	build: {
		minify: false,
		emptyOutDir: true,
		ssrManifest: true,
		//outDir: `./build`,
		//manifest: true,
		assetsDir: 'assets__',
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					let extType = assetInfo.name.split('.').at(1);
					if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
						extType = 'img';
					} else if (/woff|woff2/i.test(extType)) {
						extType = 'font';
					}
					//return `assets__/${extType}/[name]-[hash][extname]`;
					return `assets__/${extType}/[name][extname]`;
				},
				//chunkFileNames: 'assets__/js/[name]-[hash].js',
				//entryFileNames: 'assets__/js/[name]-[hash].js',
				chunkFileNames: 'assets__/js/[name].js',
				entryFileNames: '[name].js',
			},
		}
	},
	ssr: {
		noExternal: [
			// this package has uncompiled .vue files
			'example-external-component'
		]
	},
	optimizeDeps: {
		exclude: ['example-external-component']
	}
}))
