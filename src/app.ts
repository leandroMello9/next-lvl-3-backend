import express from 'express';
import cors from 'cors'
import Routes from './routes';
import 'express-async-errors'
import './database/connection'
import erroHandler from './errors/handle'
import path from 'path'

const pathStatic = path.join(__dirname, '..', 'uploads')
const app = express()

app.use(express.json())
app.use(cors());

app.use('/uploads', express.static(pathStatic))


app.use(Routes)


app.use(erroHandler)

export default app;