<template>
	<h2>LibTest02</h2>
	<button @click="count++">LibTest02 = {{count}}</button>
</template>

<script>
	export default {
		name: 'LibTest02',
		data() {
			return {
				count: 0
			}
		}
	}
</script>

<style scoped>
	h2 {
		background-color: aquamarine;
	}
</style>
