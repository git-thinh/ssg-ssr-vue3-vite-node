// Example of a plugin that injects a helper from a virtual module that can
// be used in renderBuiltUrl

const experimentalBuiltUrl = () => {
	return {
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
	};
}

const pluginSSRBuiltUrl = (base) => {
	const queryRE = /\?.*$/s
	const hashRE = /#.*$/s
	const cleanUrl = (url) => url.replace(hashRE, '').replace(queryRE, '')
	const virtualId = '\0virtual:ssr-vue-built-url'
	let config

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
}

export {
	pluginSSRBuiltUrl,
	experimentalBuiltUrl,
}
