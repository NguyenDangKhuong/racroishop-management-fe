import { NextApiRequest, NextApiResponse } from 'next'
import { v2 } from 'cloudinary'
import {
  API_KEY_CLOUDINARY,
  API_SECRET_CLOUDINARY,
  CLOUD_NAME_CLOUDINARY
} from '../../../helpers/constants'
import ProductModel, { Product } from '../../../models/Product'
import connectDb from '../../../utils/connectDb'

connectDb()
v2.config({
  cloud_name: CLOUD_NAME_CLOUDINARY,
  api_key: API_KEY_CLOUDINARY,
  api_secret: API_SECRET_CLOUDINARY
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res)
      break
    case 'DELETE':
      await handleDeleteRequest(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed!`)
      break
  }
}

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { _id } = req.query
    const product: Product | null = await ProductModel.findById(_id)
    return res.status(200).json(product)
  } catch (err) {
    console.log(err)
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
  }
}

async function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { _id } = req.query
    if (!_id) return
    const deletedProduct: Product | null = await ProductModel.findOneAndDelete({
      _id
    })
    deletedProduct && v2.uploader.destroy(String(deletedProduct?.imagePublicId))
    return res.status(200).json(deletedProduct)
  } catch (err) {
    console.log(err)
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
  }
}
