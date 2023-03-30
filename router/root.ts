import express from 'express'
import pageController from '../controllers/page-controller'

const router = express.Router({ strict: true })

router.use('/', express.static('static'))
router.get('/:lang/', pageController.home)

export default router
