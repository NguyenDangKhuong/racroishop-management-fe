import { NextApiRequest, NextApiResponse } from 'next'
import CategoryModel, { Category } from '../../../models/Category'
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
  try {
    const { _id } = req.query
    const category: Category | null = await CategoryModel.findById(_id)
    return res.status(200).json(category)
  } catch (err) {
    console.log(err)
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
  }
}

async function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { _id } = req.query
    if (!_id) return
    const deletedCategory: Category | null =
      await CategoryModel.findOneAndDelete({
        _id
      })
    return res.status(200).json(deletedCategory)
  } catch (err) {
    console.log(err)
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
  }
}