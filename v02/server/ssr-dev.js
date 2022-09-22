const __PORT = 12345;
const __BASE = 'test'

// @ts-check
import fs from 'node:fs'
import path from 'node:path'
import {
	fileURLToPath
} from 'node:url'
import {
	createServer as createServerVite
} from 'vite'
import express from 'express'

export async function createServer(root = process.cwd(), hmrPort) {
	const __dirname = path.dirname(fileURLToPath(
		import.meta.url))

	const configFile = root + '/config/vite.dev.js'
	const entryServerFile = root + '/src/entry-server.js'
	const indexHtmlFile = __dirname + '/index.html'

	//console.log('configFile = ', configFile);
	//console.log('indexHtmlFile = ', indexHtmlFile);
	//console.log('entryServerFile = ', entryServerFile);

	const indexProd = ''
	const manifest = {}

	const app = express()

	let vite = await createServerVite({
		base: `/${__BASE}/`,
		root: root,
		logLevel: 'error', //info, error
		configFile: configFile,
		server: {
			middlewareMode: true,
			watch: {
				// During tests we edit the files too fast and sometimes chokidar
				// misses change events, so enforce polling for consistency
				usePolling: true,
				interval: 100
			},
			hmr: {
				port: hmrPort
			}
		},
		appType: 'custom'
	})
	// use vite's connect instance as middleware
	app.use(vite.middlewares)

	app.use('*', async (req, res) => {
		try {
			const url = req.originalUrl.replace(`/${__BASE}/`, '/')

			let template, render;
			// always read fresh template in dev
			template = fs.readFileSync(indexHtmlFile, 'utf-8')
			template = await vite.transformIndexHtml(url, template)
			render = (await vite.ssrLoadModule(entryServerFile)).render

			const [appHtml, preloadLinks] = await render(url, manifest)
			const head = `${preloadLinks}<script src="/__data.js"></script>`;
			const content = `${appHtml}<input type="hidden" id="__ssr" value="0">`;
			const html = template
				//.replace(`<!--preload-links-->`, preloadLinks)
				//.replace(`<!--app-html-->`, appHtml)
				.replace(`<!--preload-links-->`, head)
				.replace(`<!--app-html-->`, content)

			res.status(200).set({
				'Content-Type': 'text/html'
			}).end(html)
		} catch (e) {
			vite && vite.ssrFixStacktrace(e)
			console.log(e.stack)
			res.status(500).end(e.stack)
		}
	})

	return app
}

createServer().then(app => app.listen(__PORT, () => console.log(`\n\t\t http://localhost:${__PORT} \n\n`)))
