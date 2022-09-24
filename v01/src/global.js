export default {
	install(app) {
		//import.meta.env.SSR

		const cs =
			//import.meta.globEager('^runtimecom/*.vue');
			import.meta.globEager('./iot/src/templates/*.vue');
		//console.log('templates = ', cs);
		Object.entries(cs).forEach(([path, m], k) => {
			let name = 'iot' + path.split('/').pop().replace(/\.\w+$/, '');			
			// const name = 'iot' + _.upperFirst(_.camelCase(path.split('/').pop().replace(/\.\w+$/, '')));			
			app.component(name, m.default);			
			console.log(`Runtime [${k}] = ${name}`);
		})
	},
};
