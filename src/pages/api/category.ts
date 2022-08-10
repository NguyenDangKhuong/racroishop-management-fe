import { NextApiRequest, NextApiResponse } from 'next'
import CategoryModel, { Category } from '../../models/Category'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
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

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(422).send('Danh mục thiếu tên')
    }

    const existedName = await CategoryModel.findOne({ name })
    if (existedName) {
      return res
        .status(422)
        .send(`Đã có danh mục tên này rồi, vui lòng đặt tên khác`)
    }

    const category: Category = await new CategoryModel({ ...req.body }).save()
    return res.status(201).send('Danh mục đã được thêm!')
  } catch (err) {
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
  }
}

async function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { _id, name } = req.body
    if (!name) {
      return res.status(422).send('Danh mục thiếu tên')
    }
    await CategoryModel.findByIdAndUpdate(_id, req.body, { new: true })
    res.status(200).send(`Danh mục đã được cập nhật!`)
  } catch (err) {
    console.log(err)
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
  }
}
