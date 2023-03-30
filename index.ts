import express from 'express'
import router from './router/root'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.APP_PORT
const app = express()

app.listen(PORT, () => console.log(`[Server is running on port: ${PORT}]`))
app.disable('x-powered-by')
app.use(router)
