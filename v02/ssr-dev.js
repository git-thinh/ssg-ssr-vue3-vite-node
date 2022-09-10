const __PORT = 12345;
const __BASE = 'test'

// @ts-check
import fs from 'node:fs'
import path from 'node:path'
import {
	fileURLToPath
} from 'node:url'
import express from 'express'

export async function createServer(root = process.cwd(), hmrPort) {
	const __dirname = path.dirname(fileURLToPath(
		import.meta.url))
	const resolve = (p) => path.resolve(__dirname, p)

	const indexProd = ''
	const manifest = {}

	const app = express()

	let vite = await (await import('vite')).createServer({
		base: `/${__BASE}/`,
		root,
		logLevel: 'error', //info, error
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
			template = fs.readFileSync(resolve('index.html'), 'utf-8')
			template = await vite.transformIndexHtml(url, template)
			render = (await vite.ssrLoadModule('/src/entry-server.js')).render

			const [appHtml, preloadLinks] = await render(url, manifest)

			const html = template
				.replace(`<!--preload-links-->`, preloadLinks)
				.replace(`<!--app-html-->`, appHtml)

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

createServer().then(app =>
	app.listen(12345, () => {
		console.log('http://localhost:12345')
	})
)
