import { Request, Response, NextFunction } from 'express'
import { Liquid } from 'liquidjs'
import { minify } from 'html-minifier-terser'
import vi from '../models/vi.json'
import en from '../models/en.json'

const engine = new Liquid({ extname: '.liquid', root: 'views' })

async function home(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { lang } = req.params

  if (!lang || !lang.match(/vi|en/)) {
    return next()
  }

  const data = lang === 'en' ? en : vi
  const page = await engine.renderFile('pages/home', { data })
  const theme = await engine.renderFile('layout/theme', {
    data,
    page_content: page
  })
  const minified = await minify(theme, { collapseWhitespace: true })
  res.send(minified)
}

export default { home }
