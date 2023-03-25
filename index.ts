import express from 'express'
import router from './router/root'

const app = express()

app.listen(8080)
app.disable('x-powered')
app.use('/assets', express.static('assets'))
app.use('/', router)