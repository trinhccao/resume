import express from 'express'
import router from './router/root'
import dotenv from 'dotenv'
import { Liquid } from 'liquidjs'

dotenv.config()

const PORT = process.env.APP_PORT
const app = express()
const engine = new Liquid({
  extname: '.liquid',
  cache: process.env.NODE_ENV === 'production'
})

app.listen(PORT, () => console.log(`[Server is running on port: ${PORT}]`))
app.disable('x-powered-by')
app.engine('liquid', engine.express())
app.set('view engine', 'liquid')
app.use(router)
