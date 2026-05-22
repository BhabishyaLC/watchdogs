import express from 'express'
import { authLogin,authLogOut,authRegister, updateProfile, savedReport, getSavedReport } from '../controllers/authController.js'
import upload from '../middlewares/cloudinary.js'
import { requireAuth } from '../middlewares/jwt.js'
const router=express.Router()

router.post('/login',authLogin)
router.post('/register',authRegister)
router.post('/logout',authLogOut)
router.post('/updateProfile/:id',upload.single('image'),updateProfile)
router.put('/saved/:id',requireAuth,savedReport)
router.get('/getSavedReport',requireAuth,getSavedReport)


export default router