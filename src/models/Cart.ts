import { prop, getModelForClass } from '@typegoose/typegoose'
import ProductModel, { Product } from './Product'

export class Cart {
  @prop({ type: () => String, required: true, unique: true })
  _id!: string

  @prop()
  products?: ProductList 

  @prop({ type: () => Date })
  createAt!: Date

  @prop({ type: () => Date })
  updateAt!: Date
}

const CartModel = getModelForClass(Cart, {
  schemaOptions: { timestamps: true }
})

class ProductList {
  @prop()
  public quantity?: number;

  @prop({ type: () => ProductModel })
  public product?: Product;
}

export default CartModel