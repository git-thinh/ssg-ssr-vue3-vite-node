const pluginVirtualFoo = (command, ssrBuild) => {

	return {
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
	}
}
export default pluginVirtualFoo;
