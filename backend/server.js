import express from 'express'
import authRoutes from '../backend/routes/authRoutes.js'
import googleAuth from '../backend/routes/googleAuth.js'
import reportRoutes from '../backend/routes/reportRoutes.js'
import aiController from '../backend/controllers/aiController.js'
import database from './database/db.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { requireAuth } from './middlewares/jwt.js'

import passport from 'passport'
import './config/passport.js'
import UserModel from './models/usersAuth.js'


dotenv.config()


const app=express()
app.use(express.json())

app.use(cors({
    origin:['http://localhost:5173', 'https://mywatchdogs.netlify.app'],
    credentials:true
}))
app.use(cookieParser())

app.use(passport.initialize())

database()

const PORT=process.env.PORT

app.get('/',(req,res)=>{
    res.send('Server is active...')
})

app.listen(PORT,()=>{
    console.log(`Server is active at http://localhost:${PORT}`)
})

app.use('/api/auth',authRoutes)
app.use('/api/auth',googleAuth)
app.use('/api/report',reportRoutes)
app.post('/api/ai/query', aiController)







app.get('/api/me',requireAuth,async(req,res)=>{
    const updatedUser= await UserModel.findById(req.user.id).select('-password')
    res.status(200).json({user:updatedUser})
})



