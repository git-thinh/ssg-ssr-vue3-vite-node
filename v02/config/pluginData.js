// https://github.com/vitejs/vite/discussions/6562
// https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention
// https://vitejs.dev/guide/api-plugin.html

import path from 'path'
import fs from 'fs'

export default (options) => ({
	name: 'data-binding',
	configureServer(server) {
		// return a post hook that is called after internal middlewares are
		// installed
		return () => {			
			server.middlewares.use((req, res, next) => {
				// Check extensionless URLs but ignore the `/` root path
				// if (req.originalUrl.length > 1 && !path.extname(req.originalUrl)) {
				//   if (fs.existsSync(path.join(options.rootDir, `${req.originalUrl}.html`))) {
				//     req.url += '.html'
				//   }
				// }
				// next()
			
				const url = req.url;
				if (url === '/__data.js') {
					console.log('PD.URL = ', url);
					res.setHeader("Content-Type", "text/javascript");
					res.end('console.log("DATA = 12345")');
					//res.end(JSON.stringify({}));
					return;
				}
				next()
			
			})
		}
	}
})
