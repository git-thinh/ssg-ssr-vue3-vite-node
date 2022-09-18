import {
	h,
	compile,
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
	// 	// console.log('resolveComponent -> ', this.name);
	// 	// //const c = resolveComponent(this.name)
	// 	// //return h(c)
	// 	return createVNode('h3', {
	// 			class: 'btn'
	// 		},
	// 		'[ RENDER RUNTIME = ' + this.name + ']'
	// 	);

	// 	// fetch code from some external source here
	// 	//let code = '<h2>hello</h2>';
	// 	//let c = compile(code);
	// 	//return h(c);
	// },
	setup(props) {
		return () => {
			const name = props.name;
			console.log('runtime.setup = ', name);

			// return createVNode(
			// 	'div', {
			// 		class: 'btn'
			// 	},
			// 	'[ SETUP RUNTIME = ' + name + ']'
			// )

			// console.log('resolveComponent -> ', name);
			// const c = resolveComponent(name)
			// return h(c)

			//let code = '<h2>hello</h2>';
			//let c = compile(code);
			//console.log(c);

			const c = defineAsyncComponent(() => import(`./_runtime/templates/${name}.vue`))
			return h(c);

		}
	}
})
