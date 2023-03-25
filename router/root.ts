import express from 'express'
import engine from '../engine/engine'

const router = express.Router()

router.get('/:lang', async (req, res) => {
  res.send(await engine.render('home', req.params.lang))
})

router.get('*', (req, res) => {
  res.send('Not found')
})

export default router