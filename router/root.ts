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

router.get('/', (req, res) => {
  const accepts = req.headers['accept-language']?.split(',');
  res.redirect(accepts?.[0].match('en') ? 'en/' : 'vi/');
})
router.get('/:lang/', pageController.home)
router.use(express.static('static'))
router.use((_req, res) => res.status(404).render('errors/404'))

export default router
