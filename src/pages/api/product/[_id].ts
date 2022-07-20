import { NextApiRequest, NextApiResponse } from 'next'
import ProductModel, { Product } from '../../../models/Product'
import connectDb from '../../../utils/connectDb'

connectDb()

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
  const { _id } = req.query
  const product: Product | null = await ProductModel.findById(_id)
  return res.status(200).json(product)
}

async function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
  const { _id } = req.query
  const deletedProduct: Product | null = await ProductModel.findOneAndDelete({
    _id
  })
  return res.status(200).json(deletedProduct)
}
