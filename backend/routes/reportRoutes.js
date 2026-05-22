import express from 'express'
import {report,fetchReport, fetchAllReport, updateReport,deleteReport, likeReport} from '../controllers/reportController.js'
import {requireAuth} from '../middlewares/jwt.js'
import upload from '../middlewares/cloudinary.js'
const router=express.Router()

router.post('/',requireAuth,upload.array('images',5),report)
router.get('/my-reports',requireAuth,fetchReport)
router.get('/all-reports',requireAuth,fetchAllReport)
router.put('/updateReport/:id',requireAuth,updateReport)
router.delete('/deleteReport/:id',requireAuth,deleteReport)
router.put('/like/:id',requireAuth,likeReport)



export default router