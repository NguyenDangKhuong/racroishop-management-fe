import { prop, getModelForClass } from '@typegoose/typegoose'

export class Category {
  _id!: string

  @prop({ type: () => String, required: true, unique: true })
  name!: string

  @prop({ type: () => Date })
  createAt?: Date

  @prop({ type: () => Date })
  updateAt?: Date
}

const CategoryModel = getModelForClass(Category, {
  schemaOptions: { timestamps: true }
})

export default CategoryModel