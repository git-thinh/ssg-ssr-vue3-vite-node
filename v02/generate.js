const __outDir  = 'dist/static/test'

import fs from 'node:fs'
import path from 'node:path'

//const toAbsolute = (p) => path.resolve(__dirname, p)
const toAbsolute = (p) => './' + p

const manifest = JSON.parse(fs.readFileSync(`./${__outDir}/ssr-manifest.json`, 'utf8'))
const template = fs.readFileSync(toAbsolute(`${__outDir}/index.html`), 'utf-8')
const {
	render
} = await import('./dist/server/entry-server.js')

// determine routes to pre-render from src/pages
const routesToPrerender = fs
	.readdirSync(toAbsolute('src/pages'))
	.map((file) => {
		const name = file.replace(/\.vue$/, '').toLowerCase()
		return name === 'home' ? `/` : `/${name}`
	});

(async () => {
	// pre-render each route...
	for (const url of routesToPrerender) {
		const [appHtml, preloadLinks] = await render(url, manifest)

		const html = template
			.replace(`<!--preload-links-->`, preloadLinks)
			.replace(`<!--app-html-->`, appHtml)

		const filePath = `${__outDir}${url === '/' ? '/index' : url}.html`
		fs.writeFileSync(toAbsolute(filePath), html)
		console.log('pre-rendered:', filePath)
	}

	// done, delete ssr manifest
	fs.unlinkSync(toAbsolute(`${__outDir}/ssr-manifest.json`))
})()
