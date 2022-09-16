import {
	h,
	createVNode,
	defineComponent,
	resolveComponent,
	defineAsyncComponent
} from 'vue'
 
export default defineComponent({
	props: {
		name: {
			type: String,
			default: ''
		},
		text: {
			type: String,
			default: ''
		},
	},
	// render() {
	// 	console.log('resolveComponent -> ', this.name);
	// 	//const c = resolveComponent(this.name)
	// 	//return h(c)
	// 	return createVNode('h3', {
	// 			class: 'btn'
	// 		},
	// 		'[ RENDER RUNTIME = ' + this.name + ']'
	// 	);
	// },
	setup(props) {
		return () => {
			const name = 'Test'
			const c = defineAsyncComponent(() => import(`./_runtime/templates/${name}.vue`))

			return h(c);

			// return createVNode(
			// 	'div', {
			// 		class: 'btn'
			// 	},
			// 	'[ SETUP RUNTIME = ' + props.name + ']'
			// )
		}
	}
})
