import { prop, getModelForClass } from '@typegoose/typegoose'

export class User {
  _id!: string

  @prop({ type: () => String, required: true })
  name!: string

  @prop({ type: () => String, required: true, unique: true })
  email!: string

  @prop({ type: () => Number, required: true })
  password!: number

  @prop({ type: () => Date })
  createAt?: Date

  @prop({ type: () => Date })
  updateAt?: Date
}

const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true }
})

export default UserModel