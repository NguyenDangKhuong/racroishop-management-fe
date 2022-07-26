import { NextApiRequest, NextApiResponse } from 'next'
import ProductModel, { Product } from '../../models/Product'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res)
      break
    case 'POST':
      await handlePostRequest(req, res)
      break
    case 'PUT':
      await handlePutRequest(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed!`)
      break
  }
}

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  const { _id } = req.query
  const product: Product | null = await ProductModel.findOne({ _id })
  res.status(200).json(product)
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  // const { name, price, description, mediaUrl } = req.body
  // if (!name || !price || !description || !mediaUrl) {
  //   return res.status(422).send('Sản phẩm thiếu một hay nhiều mục')
  // }
  const product: Product = await new ProductModel({ ...req.body }).save()
  return res.status(201).json(product)
}

async function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
  const { quantity, _id } = req.body
  try {
    await ProductModel.findOneAndUpdate({ _id }, { quantity })
    res.status(200).send('Sản phẩm đã được cập nhật')
  } catch (error) {
    res.status(403).send('Xin vui lòng thử lại')
  }
}
