import express from 'express'
import pageController from '../controllers/page-controller'

const router = express.Router({ strict: true })

router.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    const { host } = req.headers
    if (!host || !host.match(process.env.APP_HOST as string)) {
      return res.status(400).end()
    }
  }

  next()
})

router.use('/', express.static('static'))
router.get('/:lang/', pageController.home)

export default router
