<template>
	<h1>LibTest01</h1>
	<button @click="count++">LibTest01 = {{count}}</button>
</template>

<script>
	export default {
		name: 'LibTest01',
		data() {
			return {
				count: 0
			}
		}
	}
</script>

<style scoped>
	h1 {
		background-color: aquamarine;
	}
</style>
