import express from 'express'
import router from './router/root'

const PORT = 8000
const app = express()

app.listen(PORT, () => console.log(`[Server is running on port: ${PORT}]`, ))
app.disable('x-powered-by')
app.use(router)