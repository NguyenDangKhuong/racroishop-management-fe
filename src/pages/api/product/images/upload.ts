import { NextApiRequest, NextApiResponse } from 'next'
import { v2 } from 'cloudinary'
import connectDb from '../../../../utils/connectDb'

connectDb()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await handlePostRequest(req, res)
      break
    case 'DELETE':
      await handleDeleteRequest(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed!`)
      break
  }
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const imageFiles = req.body.image
    console.log('load', imageFiles)
    //Check if files exist
    if (!imageFiles)
      return res.status(400).json({ message: 'Không có hình được thêm!' })

      console.log('upload')
    const iamgeResponse = await v2.uploader.upload(
      imageFiles.path,
      {
        folder: 'racroishop/products/'
      },
      function (error: any, result: any) {
        console.log(result, error)
      }
    )
    return res.status(200).json({ images: iamgeResponse })
    //upload nhiều file cùng lúc
    //map through images and create a promise array using cloudinary upload function
    // const multiplePicturePromise = [...imageFiles].map(image =>
    //   v2.uploader.upload(
    //     image.path,
    //     {
    //       folder: 'racroishop/products/'
    //     },
    //     // callback function
    //     function (error: any, result: any) {
    //       console.log(result, error)
    //     }
    //   )
    // )
    // // // await all the cloudinary upload functions in promise.all, exactly where the magic happens
    // const imageResponses = await Promise.all(multiplePicturePromise)
    // return res.status(200).json({ images: imageResponses })
  } catch (error) {
    console.log('lỗi', error)
    return res.status(500).json({
      message: error
    })
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
