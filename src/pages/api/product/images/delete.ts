import { NextApiRequest, NextApiResponse } from 'next'
import connectDb from '../../../../utils/connectDb'

connectDb()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'DELETE':
      await handleDeleteRequest(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed!`)
      break
  }
}

async function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const publicId = req.body.publicId
    // cloudinary.v2.uploader.destroy(publicId)
    return res.status(200).json({
      status: 'success',
      message: 'Sản phẩm đã bị xoá'
    })
  } catch (error) {
    return res.status(500).json({
      message: error
    })
  }
}
