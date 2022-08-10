import { getModelForClass, prop } from '@typegoose/typegoose'

export class Product {
  _id!: string

  @prop({ type: () => String, required: true, unique: true })
  name!: string

  @prop({ type: () => String, required: true, unique: true })
  sku!: string

  @prop({ type: () => Number, required: true })
  price!: number

  @prop({ type: () => Number, required: true })
  quantity!: number

  @prop({ type: () => String })
  categoryId?: string

  @prop({ type: () => String })
  imageUrl?: string

  @prop({ type: () => String })
  imagePublicId?: string

  @prop({ type: () => Date })
  createAt?: Date

  @prop({ type: () => Date })
  updateAt?: Date
}

const ProductModel = getModelForClass(Product, {
  schemaOptions: { timestamps: true }
})

export default ProductModel