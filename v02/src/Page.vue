<template>
	<h1>Page All: pageKey = {{pageKey}}</h1>
	<component :is="c"></component>
	<Runtime :name="'rtTestRuntime'" />
</template>

<script setup>
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

	let updatedCmp = defineComponent({
		template: '<div>test Me!</div>'
	})
	let c = h(updatedCmp);

	function loadTest(file) {
		return defineAsyncComponent(() => import(`^/templates/${file}.vue`))
	}
	//let c = loadTest(name);
</script>
