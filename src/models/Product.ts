import { prop, getModelForClass } from '@typegoose/typegoose'
import shortid from 'shortid'

export class Product {
  @prop({ type: () => String, required: true, unique: true })
  name!: string

  @prop({ type: () => Number, required: true })
  price!: number

  @prop({ type: () => Number })
  categoryId?: number

  @prop({ type: () => String, required: true, unique: true, default: shortid.generate() })
  sku!: string

  @prop({ type: () => String })
  image?: string

  @prop({ type: () => Date })
  createAt!: Date

  @prop({ type: () => Date })
  updateAt!: Date
}

const ProductModel = getModelForClass(Product, {
  schemaOptions: { timestamps: true }
})

export default ProductModel