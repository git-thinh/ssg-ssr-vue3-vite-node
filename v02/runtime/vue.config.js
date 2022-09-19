const {
	defineConfig
} = require("@vue/cli-service");
const path = require('path');

module.exports = defineConfig({
	configureWebpack: {
		resolve: {
			alias: {
				'^runtime': path.resolve(__dirname, './src'),
				'^runtimejs': path.resolve(__dirname, './src/js'),
			},
			extensions: ['.js', '.vue', '.json']
		}
	}
});
