import { NextFunction, Request, Response } from 'express'
import { Liquid } from 'liquidjs'
import { minify } from 'html-minifier-terser'
import localeModel from '../models/locale-model'

const engine = new Liquid({
  extname: '.liquid',
  root: 'views',
  cache: process.env.NODE_ENV === 'production'
})
const renderFile = engine.renderFile.bind(engine)

async function home(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const data = localeModel.getLocaleData(req.params.lang)

  if (!data) {
    return next()
  }

  const page = await renderFile('pages/home', { data })
  const theme = await renderFile('layout/theme', { data, page_content: page })
  const content = await minify(theme, { collapseWhitespace: true })

  res.send(content)
}

export default { home }
