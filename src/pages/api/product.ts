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
  const { name, price, description, mediaUrl } = req.body
  if (!name || !price || !description || !mediaUrl) {
    return res.status(422).send('Product missing one or more fidld')
  }
  const product: Product = await new ProductModel({ ...req.body }).save()
  return res.status(201).json(product)
}

