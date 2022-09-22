<template>
	<h1>This is TestJs</h1>
	<button @click="count++">Count++ = {{count}}</button>
</template>

<script>
	export default {
		name: 'TestJs',
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
