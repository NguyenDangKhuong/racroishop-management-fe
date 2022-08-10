import { NextApiRequest, NextApiResponse } from 'next'
import ProductModel, { Product } from '../../models/Product'
import connectDb from '../../utils/connectDb'
import removeImage from '../../utils/removeImage'

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
  try {
    const { name } = req.query
    const products = await ProductModel.find({
      name: { $regex: name, $options: 'i' }
    }).limit(5)
    return res.status(200).json(products)
  } catch (err) {
    console.log(err)
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
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
    return res.status(201).send('Sản phẩm đã được thêm!')
  } catch (err) {
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
  }
}

async function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { _id, name, price, quantity, imagePublicId } = req.body
    if (!name || !price || !quantity) {
      return res.status(422).send('Sản phẩm thiếu một hay nhiều mục')
    }

    await ProductModel.findByIdAndUpdate(_id, req.body, { new: true })

    //remove unessesary image
    const currentProduct: Product | null = await ProductModel.findById({ _id })
    const currentImagePublicId = currentProduct?.imagePublicId
    currentImagePublicId !== imagePublicId &&
      removeImage(String(currentImagePublicId))

    res.status(200).send(`Sản phẩm đã được cập nhật!`)
  } catch (err) {
    console.log(err)
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
  }
}
