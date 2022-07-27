import cloudinary from 'cloudinary'
import multer from 'multer'

const storage = multer.diskStorage({
  filename: function (_req: any, file: any, cb: any) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({ storage })

cloudinary.v2.config({
  cloud_name: 'ndk',
  api_key: '289726382347229',
  api_secret: '1ZVIqT3UPAOt3nBjlW5go0cW640'
})