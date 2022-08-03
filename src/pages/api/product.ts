import { NextApiRequest, NextApiResponse } from 'next'
import ProductModel, { Product } from '../../models/Product'
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
    const { name, price, quantity } = req.body
    if (!name || !price || !quantity) {
      return res.status(422).send('Sản phẩm thiếu một hay nhiều mục')
    }

    const existedName = await ProductModel.findOne({ name })
    if (existedName) {
      return res
        .status(422)
        .send(`Đã có sản phẩm tên này rồi, vui lòng đặt tên khác`)
    }

    const product: Product = await new ProductModel({ ...req.body }).save()
    return res.status(201).json(product)
  } catch (err) {
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
  }
}

async function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { _id } = req.body
    await ProductModel.findByIdAndUpdate(_id, req.body, { new: true })
    res.status(200).send(`Sản phẩm đã được cập nhật!`)
  } catch (err) {
    console.log(err)
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
  }
}
