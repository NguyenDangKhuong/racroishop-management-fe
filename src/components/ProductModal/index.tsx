import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import shortid from 'shortid'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { Product } from '../../models/Product'
import { post, put } from '../../utils/api'
import { initialProduct } from '../ProductTable'

type FormData = {
  name: string
  price: string
  quantity: number
  categoryId: number
  sku: string
}

export default function ProductModal({
  showModal,
  setShowModal,
  editingProduct,
  setEditingProduct
}: {
  showModal: boolean
  setShowModal: any
  editingProduct: Product,
  setEditingProduct: any
}) {
  const isEditing = editingProduct._id

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProduct(initialProduct)
  }

  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => handleCloseModal())

  const queryClient = useQueryClient()
  const mutationPostProduct = useMutation(
    (newProduct: FormData) => post('/api/product', newProduct),
    {
      onSuccess: () => {
        handleCloseModal()
        queryClient.refetchQueries(['fetchProducts'])
      }
    }
  )
  const mutationPutProduct = useMutation(
    (updatedProduct: FormData) => put('/api/product', updatedProduct),
    {
      onSuccess: () => {
        handleCloseModal()
        queryClient.refetchQueries(['fetchProducts'])
      }
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()
  const onSubmit = handleSubmit(data =>
    isEditing
      ? mutationPutProduct.mutate(data)
      : mutationPostProduct.mutate({ ...data, sku: shortid.generate() })
  )

  return (
    <>
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-3/4 lg:w-1/3 my-6 mx-auto'>
              {/*content*/}
              <div
                ref={ref}
                className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                  <h3 className='text-3xl font-semibold'>{`${isEditing ? 'S???a' : 'Th??m'} s???n ph???m`}</h3>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => handleCloseModal()}>
                    <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ??
                    </span>
                  </button>
                </div>
                <form onSubmit={onSubmit}>
                  {/*body*/}
                  <div className='relative p-6 flex-auto'>
                    <div className='mb-3 pt-0'>
                      <input
                        type='text'
                        placeholder='T??n'
                        className='px-3 py-3 border placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full'
                        defaultValue={isEditing ? editingProduct.name : ''}
                        {...register('name')}
                      />
                    </div>
                    <div className='mb-3 pt-0'>
                      <input
                        type='number'
                        placeholder='????n gi??'
                        className='px-3 py-3 border placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full'
                        {...register('price')}
                      />
                    </div>
                    <div className='mb-3 pt-0'>
                      <input
                        type='number'
                        placeholder='S??? l?????ng'
                        className='px-3 py-3 border placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full'
                        {...register('quantity')}
                      />
                    </div>
                    <div className='mb-3 pt-0'>
                      <select
                        placeholder='Danh m???c'
                        defaultValue=''
                        {...register('categoryId')}
                        className='px-3 py-3 border placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full'>
                        <option value='' disabled>
                          Danh m???c
                        </option>
                        <option value='1'>Danh m???c 1</option>
                        <option value='2'>Danh m???c 2</option>
                      </select>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                    <button
                      className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={() => handleCloseModal()}>
                      ????ng
                    </button>
                    <button
                      type='submit'
                      className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>
                      {isEditing ? 'S???a' : 'Th??m'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  )
}
