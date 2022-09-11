<template>
	<div>
		<div :id="boxId"></div>
		<component v-if="dynComponent" :is="dynComponent" @created__="__dynComponentCreated"
			@mounted__="__dynComponentMounted" />
	</div>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				dynComponent: null,
				boxId: ''
			}
		},
		created() {
			this.boxId = this._guid();
		},
		mounted() {
			const self = this;
			//if (this.$config.IsComRuntime) {
			//_vueRuntimeCreateNew(self.boxId, self.name, self.callback);
			//} else {
			//const pathRuntime = this.$config.scRuntimePath;
			//this.dynComponent = () => import(`~/components-runtime/src/runtime/${this.name}.vue`);
			//this.dynComponent = () => import(`../../${pathRuntime}/${this.name}.vue`);
			//this.dynComponent = () => import(`^runtimecom/${this.name}.vue`);
			//}

			//this.dynComponent = () => import(`^runtimecom/${this.name}.vue`);
			//this.dynComponent = () => import(`D:/MMO/ssg-ssr-vue3-vite-node/iot-runtime/src/templates/${this.name}.vue`);
			
			
			console.log(this.name);
			
			this.dynComponent = () => defineAsyncComponent(() =>
				import(`D:/MMO/ssg-ssr-vue3-vite-node/iot-runtime/src/templates/${this.name}.vue`));
		},
		methods: {
			_guid() {
				return 'id-xxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					var r = Math.random() * 16 | 0,
						v = c == 'x' ? r : (r & 0x3 | 0x8);
					return v.toString(16);
				});
			},
			callback(type, c) {
				this.$emit(type, c);
			},
			__dynComponentCreated(c) {
				this.callback('created__', c);
			},
			__dynComponentMounted(c) {
				this.callback('mounted__', c);
			},
		}

	}
</script>
