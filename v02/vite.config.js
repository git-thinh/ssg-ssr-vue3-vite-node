import {
	defineConfig
} from 'vite'
import PATH from 'node:path'

import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import {
	pluginSSRBuiltUrl,
	experimentalBuiltUrl
} from './config/pluginSSRBuiltUrl'
import pluginVirtualModule from './config/pluginVirtualModule'
import pluginVirtualFoo from './config/pluginVirtualFoo'

import configBuild from './config/configBuild'


const base = '/test/'

let __pathRuntimeCom = PATH.resolve(__dirname, './iot-runtime/src/templates/');
console.log(`>>>>> [ RUNTIME_PATH = ${__pathRuntimeCom} ]`);

// preserve this to test loading __filename & __dirname in ESM as Vite polyfills them.
// if Vite incorrectly load this file, node.js would error out.
globalThis.__vite_test_filename = __filename
globalThis.__vite_test_dirname = __dirname

export default defineConfig(({
	command,
	ssrBuild
}) => ({
	base,
	resolve: {
		alias: {
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
	build: configBuild(),
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
