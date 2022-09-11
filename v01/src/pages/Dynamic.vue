<template>
	<h1>Dynamic</h1>
	<hr>
	<!-- <component v-for="c in coms" :is="c"></component> -->
	<Test01/>
</template>

<script setup>
	// import {
	// 	reactive,
	// 	defineAsyncComponent
	// } from 'vue'

	function load(file) {
		return defineAsyncComponent(() => import(`../components/${file}.vue`))
	}

	const coms = [load('Header'), load('Test01'), load('Test02')];
</script>

<style scoped>
	h1,
	a {
		color: green;
	}
</style>
