const __PORT = 12345;
const __BASE = 'test'

// @ts-check
import fs from 'node:fs'
import path from 'node:path'
import {
  fileURLToPath
} from 'node:url'
import express from 'express'

const entryServerInport = '../dist/server/entry-server.js'
console.log('entryServerFile = ', entryServerInport);

export async function __createServer() {
  const root = process.cwd();
  //const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const ssrManifestFile = root + '/dist/client/ssr-manifest.json'
  const indexHtmlFile = root + '/dist/client/server/index.html'
  //console.log('ssrManifestFile = ', ssrManifestFile);
  //console.log('indexHtmlFile = ', indexHtmlFile);

  const indexProd = fs.readFileSync(indexHtmlFile, 'utf-8')
  const manifest = JSON.parse(fs.readFileSync(ssrManifestFile, 'utf8'))

  const app = express()
  app.use((await import('compression')).default())
  app.use(
    `/${__BASE}/`,
    (await import('serve-static')).default(root + '/dist/client', {
      index: false
    })
  )

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl.replace(`/${__BASE}/`, '/')
      let template = indexProd
      // @ts-ignore
      let render = (await import(entryServerInport)).render

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
