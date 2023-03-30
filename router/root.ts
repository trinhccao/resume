import express from 'express'
import engine from '../engine/engine'
import { minify } from 'html-minifier'

const router = express.Router({ strict: true })

router.use('/', express.static('static'))
router.get('/:lang/', async (req, res, next) => {
  const { lang } = req.params
  if (!lang || !lang.match(/vi|en/)) {
    return next()
  }
  const content = await engine.render('home', lang)
  const minified = minify(content, { collapseWhitespace: true })
  res.send(minified)
})

export default router