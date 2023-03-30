import { cp, readFile, writeFile } from 'node:fs/promises'
import CleanCSS from 'clean-css'

const cleanCss = new CleanCSS()

await cp('views', 'dist/views', { force: true, recursive: true })
await cp('static', 'dist/static', { force: true, recursive: true })

const content = await readFile('static/styles/main.css')
const minified = cleanCss.minify(content)

await writeFile('dist/static/styles/main.css', minified.styles)