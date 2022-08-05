import { v2 as cloudinary } from 'cloudinary'
import {
  API_KEY_CLOUDINARY,
  API_SECRET_CLOUDINARY,
  CLOUD_NAME_CLOUDINARY
} from '../helpers/constants'

const removeImage = (publicId: string) => {
  cloudinary.config({
    cloud_name: CLOUD_NAME_CLOUDINARY,
    api_key: API_KEY_CLOUDINARY,
    api_secret: API_SECRET_CLOUDINARY
  })
  cloudinary.uploader.destroy(publicId)
}

export default removeImage
