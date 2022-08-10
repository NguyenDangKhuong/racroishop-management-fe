import { NextApiRequest, NextApiResponse } from 'next'
import CategoryModel from '../../models/Category'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const categories = await CategoryModel.find()
  res.status(200).json({ categories })
}