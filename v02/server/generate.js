const __outDir = 'dist/static/test'

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const manifest = JSON.parse(fs.readFileSync(`${root}/${__outDir}/ssr-manifest.json`, 'utf8'))
const template = fs.readFileSync(`${root}/${__outDir}/server/index.html`, 'utf-8')
const {
  render
} = await import('../dist/server/entry-server.js')

// determine routes to pre-render from src/pages
const routesToPrerender = fs
  .readdirSync(`${root}/src/pages`)
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

    const fileName = `${url === '/' ? '/index' : url}.html`;
    const filePath = `${root}/${__outDir}${fileName}`
    fs.writeFileSync(filePath, html)

    console.log(`GEN -> ${fileName}`)
  }

  // done, delete ssr manifest
  //fs.unlinkSync(`${root}/${__outDir}/ssr-manifest.json`)
})()
