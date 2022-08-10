import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { Category } from '../../models/Category'
import { post, put } from '../../utils/api'
import { initialCategory } from '../CategoryTable'

type FormData = {
  _id: string
  name: string
}

export default function CategoryModal({
  showModal,
  setShowModal,
  editingCategory,
  setEditingCategory
}: {
  showModal: boolean
  setShowModal: any
  editingCategory: Category
  setEditingCategory: any
}) {
  const isEditing = editingCategory._id



  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => handleCloseModal())

  const queryClient = useQueryClient()
  const mutationPostCategory = useMutation(
    (newCategory: FormData) => post('/api/category', newCategory),
    {
      onSuccess: () => {
        handleCloseModal()
        queryClient.refetchQueries(['fetchCategories'])
      }
    }
  )
  const mutationPutCategory = useMutation(
    (updatedCategory: FormData) => put('/api/category', updatedCategory),
    {
      onSuccess: () => {
        handleCloseModal()
        queryClient.refetchQueries(['fetchCategories'])
      }
    }
  )

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<FormData>()
  const onSubmit = handleSubmit(data =>
    isEditing
      ? mutationPutCategory.mutate({ ...data, _id: editingCategory._id })
      : mutationPostCategory.mutate({ ...data })
  )

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingCategory(initialCategory)
    reset()
  }

  useEffect(() => {
    const { name } = editingCategory
    setValue('name', name)
  }, [editingCategory])

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
                <div className='flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t'>
                  <h3 className='text-3xl font-semibold'>{`${isEditing ? 'Sửa' : 'Thêm'
                    } sản phẩm`}</h3>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => handleCloseModal()}>
                    <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                <form onSubmit={onSubmit}>
                  {/*body*/}
                  <div className='relative p-6 flex-auto'>
                    <div className='mb-3 pt-0'>
                      <input
                        type='text'
                        placeholder='Tên danh mục'
                        className='px-3 py-3 border placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full'
                        defaultValue={isEditing ? editingCategory.name : ''}
                        {...register('name')}
                      />
                    </div>
                  </div>
                  {/*footer*/}
                  <div className='flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b'>
                    <button
                      className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={() => handleCloseModal()}>
                      Đóng
                    </button>
                    <button
                      type='submit'
                      className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>
                      {isEditing ? 'Sửa' : 'Thêm'}
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
