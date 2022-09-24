
// https://vitejs.dev/guide/api-plugin.html
// https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention

const pluginVirtualModule = () => {
	const virtualFile = '@virtual-file'
	const virtualId = '\0' + virtualFile
	
	const nestedVirtualFile = '@nested-virtual-file'
	const nestedVirtualId = '\0' + nestedVirtualFile
	
	return {
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
	}
}
export default pluginVirtualModule;
