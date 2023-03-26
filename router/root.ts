import express from 'express'
import engine from '../engine/engine'
import { minify } from 'html-minifier'

const router = express.Router({ strict: true })

router.use('/', express.static('static'))
router.use('/assets/', express.static('assets'))
router.get('/:lang/', async (req, res) => {
  const content = await engine.render('home', req.params.lang)
  const minified = minify(content, { collapseWhitespace: true })
  res.send(minified)
})

export default router