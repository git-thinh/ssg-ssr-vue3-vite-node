const MixinComs = {
	beforeUnmount: function() {
		//console.log('[RT] MixinComs.created....')
	},
	beforeCreate: function() {
		//console.log('[RT] MixinComs.beforeCreate....')
		//if (window['__config'].IsComRuntime) this.$options.components = window['__coms_run'];
	},
	created: function() {
		//console.log('[RT] MixinComs.created....')
		this.$emit('created__', this);
	},
	mounted: function() {
		//console.log('[RT] MixinComs.mounted....')
		this.$emit('mounted__', this);
	},
	methods: {
	},
	computed: {},
};
export default MixinComs;
