import {
	defineConfig
} from 'vite'
import PATH from 'node:path'

import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import {
	pluginSSRBuiltUrl,
	experimentalBuiltUrl
} from './pluginSSRBuiltUrl'
import pluginVirtualModule from './pluginVirtualModule'
import pluginVirtualFoo from './pluginVirtualFoo'
import configBuild from './configBuild'

const base = '/test/'
const root = process.cwd()

// preserve this to test loading __filename & __dirname in ESM as Vite polyfills them.
// if Vite incorrectly load this file, node.js would error out.
globalThis.__vite_test_filename = __filename
globalThis.__vite_test_dirname = __dirname

export default defineConfig(async ({
	command,
	mode,
	ssrBuild
}) => {
	//const data = await asyncFunction()	
	const __pathRuntimeCom = root + '/iot/src/templates';
	
	console.log(`\nroot = ${root}`);
	console.log(`runtime = ${__pathRuntimeCom}`);
	console.log(`command = ${command}`);
	console.log(`ssrBuild = ${ssrBuild}`);


	return {
		base,
		resolve: {
			alias: {
				'@': root,
				'^runtimecom': __pathRuntimeCom
			},
		},
		plugins: [
			vuePlugin(),
			vueJsx(),
			pluginVirtualFoo(command, ssrBuild),
			pluginVirtualModule(),
			pluginSSRBuiltUrl(base),
		],
		experimental: experimentalBuiltUrl(),
		build: configBuild(root),
		ssr: {
			noExternal: [
				// this package has uncompiled .vue files
				'example-external-component'
			]
		},
		optimizeDeps: {
			exclude: ['example-external-component']
		}
	};
})
