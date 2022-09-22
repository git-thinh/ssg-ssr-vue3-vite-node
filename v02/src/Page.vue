<template>
	<h1>Page All: pageKey = {{pageKey}}</h1>
	<component :is="c"></component>
	<Runtime :name="'rtTestRuntime'" />
	<h1>Custom Element Demo</h1>
	<TestJs/>
</template>

<script setup>
	import {
		TestJs
	} from './_shared/components/lib-test.js'
	
	import Runtime from '@/runtime'
	import {
		h,
		compile,
		createVNode,
		defineComponent,
		resolveComponent,
		defineAsyncComponent
	} from 'vue'
	import {
		useRouter,
		useRoute
	} from 'vue-router'
	const router = useRouter()
	const route = useRoute()

	const pageKey = route.params.pageKey || '';
	const name = 'rtTestRuntime';

	function loadTest(file) {
		return defineAsyncComponent(() => import(`^/templates/${file}.vue`))
	}
	let c = loadTest(name);


	//const MyComponent = () => import(`./_shared/components/${name}.umd.min.js`);
	//const MyComponent = async () => await import(`./_shared/components/rtTestRuntime.umd.min.js`).then(o => o.default);
	//console.log(MyComponent);
</script>
