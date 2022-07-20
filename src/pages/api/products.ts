import { NextApiRequest, NextApiResponse } from 'next'
import ProductModel from '../../models/Product'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, size } = req.query
  // Convert querystring values to number
  const pageNum = Number(page)
  const pageSize = 20
  // const pageSize = Number(size)
  let products = []
  const totalDocs = await ProductModel.countDocuments()
  const totalPages = Math.ceil(totalDocs / pageSize)
  if (pageNum === 1) {
    products = await ProductModel.find().limit(pageSize)
  } else {
    const skip = pageSize * (pageNum - 1)
    products = await ProductModel.find().skip(skip).limit(pageSize)
  }
  res.status(200).json({ products, totalPages })
}
