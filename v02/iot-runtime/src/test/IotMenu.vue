<template>
	<div class="iot-menu-main">
		<ul class="box-menu">
			<li v-for="(it,ix) in menus" :class="'mn-root mn-items-' + it.children.length + ' ' + it.css">
				<a :href="it.url"><span class="mn-item" v-html="it.title"></span></a>
				<div class="bx-popup" :id="'bx-popup--'+ix">
					<div :id="'mn-column1--'+ix" :class="'bx-popup-item bx-popup-item--' + it.column1_size"></div>
					<div :id="'mn-column2--'+ix" :class="'bx-popup-item bx-popup-item--' + it.column2_size"></div>
					<div :id="'mn-column3--'+ix"
						:class="'bx-popup-item bx-popup-item-3 bx-popup-item--' + it.column3_size"></div>
				</div>
			</li>
		</ul>
		<div class="box-search">
			<IotInput :icon="'icon-svg-search'"></IotInput>
		</div>
		<div class="box-search-result hide">
			<IotMenuBoxSearch></IotMenuBoxSearch>
		</div>
		<ul class="box-link">
			<li v-for="it in links">
				<a :href="it.url" v-html="it.title"></a>
			</li>
		</ul>
	</div>
</template>

<script>
	import MixinComs from '^runtimejs/core/MixinComs.js'
	import IotMenu from '^runtimejs/coms/IotMenu.js'
	export default {		
		mixins: [MixinComs, IotMenu],
		name: 'IotMenu',
	}
</script>

<style>
	@import '../css/IotMenu.css';
</style>
