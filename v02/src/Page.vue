<template>
	<h1>Page All: pageKey = {{pageKey}}</h1>
	<component :is="c1"></component>
	<component :is="c2"></component>
	<Runtime :name="'rtTestRuntime'" />
	<!-- <TestJs/> -->
</template>

<script setup>
	let c1, c2;
	import * as lib from './_shared/components/lib-test.js'
	import TestJs from './lib.js'
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
	//c = loadTest(name);
	c1 = lib['LibTest01'];
	c2 = lib['LibTest02'];

</script>
