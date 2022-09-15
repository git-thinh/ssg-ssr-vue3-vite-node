const __PORT = 12345;
const __BASE = 'test'

// @ts-check
import fs from 'node:fs'
import path from 'node:path'
import {
	fileURLToPath
} from 'node:url'
import express from 'express'

export async function __createServer() {
	const __dirname = path.dirname(fileURLToPath(
		import.meta.url))
	const resolve = (p) => path.resolve(__dirname, p)

	const indexProd = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
	const manifest = JSON.parse(fs.readFileSync('./dist/client/ssr-manifest.json', 'utf8'))

	const app = express()
	app.use((await import('compression')).default())
	app.use(
		`/${__BASE}/`,
		(await import('serve-static')).default(resolve('dist/client'), {
			index: false
		})
	)

	app.use('*', async (req, res) => {
		try {
			const url = req.originalUrl.replace(`/${__BASE}/`, '/')
			let template = indexProd
			// @ts-ignore
			let render = (await import('./dist/server/entry-server.js')).render

			const [appHtml, preloadLinks] = await render(url, manifest)

			const html = template
				.replace(`<!--preload-links-->`, preloadLinks)
				.replace(`<!--app-html-->`, appHtml)

			res.status(200).set({
				'Content-Type': 'text/html'
			}).end(html)
		} catch (e) {
			console.log(e.stack)
			res.status(500).end(e.stack)
		}
	})

	return app;
}

__createServer().then(app => app.listen(__PORT, () => console.log(`\n\t\t http://localhost:${__PORT} \n\n`)))
