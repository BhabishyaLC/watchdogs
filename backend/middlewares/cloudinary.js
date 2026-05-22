import {v2 as cloudinary} from 'cloudinary'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})


const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'app_reports',
        allowed_format:['jpg','png','webp'],
        transformation:[{width:1000, height:1000, crop:'limit'}]
    }
})

const upload=multer({
    storage:storage,
    limits:{fileSize:5*1024*1024}
})

export default upload