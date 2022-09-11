<template>
	<h3>ImportType.vue</h3>
	<p>import type should be removed without side-effect</p>
</template>

<script setup lang="ts">
	import {
		Foo
	} from 'dep-import-type/deep'
	const msg: Foo = {}
</script>
