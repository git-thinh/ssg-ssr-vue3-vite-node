<template>
	<h1>Home</h1>
	<component :is="c"></component>
	<Runtime :name="'rtTestRuntime'"/>
</template>

<script setup>
	import {
		h,
		compile,
		createVNode,
		defineComponent,
		resolveComponent,
		defineAsyncComponent
	} from 'vue'
	import Runtime from '@/runtime'

	const name = 'rtTestRuntime';
	
	function loadTest(file) {
	  return defineAsyncComponent(() => import(`../_runtime/templates/${file}.vue`))
	}
	const c = loadTest(name);
</script>
