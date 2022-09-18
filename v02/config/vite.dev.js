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
	const __pathShared = root + '/src/_shared';
	const __pathRuntime = root + '/src/_runtime';

	console.log(`root     = ${root}`);
	console.log(`share    = ${__pathShared}`);
	console.log(`runtime  = ${__pathRuntime}`);
	console.log(`command  = ${command}`);
	console.log(`ssrBuild = ${ssrBuild}`);

	return {
		base,
		root: root,
		resolve: {
			alias: {
				'@': root + '/src',
				'~': __pathShared,
				'^': __pathRuntime,
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
