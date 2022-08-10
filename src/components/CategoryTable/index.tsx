import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Category } from '../../models/Category'
import { get, remove } from '../../utils/api'
import CategoryModal from '../CategoryModal'

export const initialCategory = {
  _id: '',
  name: ''
}

const CategoryTable = ({ color = 'light' }: { color?: string }) => {
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] =
    useState<Category>(initialCategory)
  const queryClient = useQueryClient()
  const mutationDelCategory = useMutation(
    (_id: string) => remove(`/api/category/${_id}`),
    {
      onSuccess: () => {
        queryClient.refetchQueries(['fetchCategories'])
      }
    }
  )
  const { isLoading, isError, isSuccess, data } = useQuery(
    ['fetchCategories'],
    () => get(`/api/categories/`)
  )
  const renderResult = () => {
    if (isLoading) {
      return (
        <div className='text-center py-5 border-t'>
          <i className='fas fa-spinner fa-spin animate-spin text-xl mr-2'></i>
          Đang tải...
        </div>
      )
    }
    if (isError) {
      return (
        <div className='text-center text-red-500'>
          Đã xảy ra lỗi, vui lòng liên hệ Khương
        </div>
      )
    }
    if (isSuccess) {
      return (
        <table className='items-center w-full bg-transparent border-collapse'>
          <thead>
            <tr>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-gray-50 text-gray-500 border-gray-100'
                    : 'bg-gray-600 text-gray-200 border-gray-500')
                }>
                Tên
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-gray-50 text-gray-500 border-gray-100'
                    : 'bg-gray-600 text-gray-200 border-gray-500')
                }>
                Sửa/Xóa
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.categories.map((item: Category) => (
              <tr key={item._id} className='border-t'>
                <td className='px-6 align-middle text-xs whitespace-nowrap p-4 text-left'>
                  <span>{item.name}</span>
                </td>
                <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                  <i
                    className='fas fa-edit text-lg text-emerald-500 mr-4 cursor-pointer'
                    onClick={() => {
                      setEditingCategory(item)
                      setShowModal(true)
                    }}></i>
                  <i
                    className='fas fa-close text-lg text-emerald-500 mr-2 cursor-pointer'
                    onClick={() => mutationDelCategory.mutate(item._id)}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
    return <></>
  }
  return (
    <div
      className={
        'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg border rounded ' +
        (color === 'light' ? 'bg-white' : 'bg-gray-700 text-white')
      }>
      <div className='rounded-t mb-0 px-4 py-3 border-0'>
        <div className='flex flex-wrap items-center'>
          <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
            <h3
              className={
                'font-semibold text-lg ' +
                (color === 'light' ? 'text-gray-700' : 'text-white')
              }>
              Danh sách danh mục
            </h3>
          </div>
          <span className='cursor-pointer' onClick={() => setShowModal(true)}>
            <i className='fas fa-plus text-lg text-emerald-500 mr-4'></i>Thêm
            danh mục
          </span>
        </div>
      </div>
      <div className='block w-full overflow-x-auto'>
        {renderResult()}
      </div>
      <CategoryModal
        showModal={showModal}
        setShowModal={(val: boolean) => setShowModal(val)}
        editingCategory={editingCategory}
        setEditingCategory={(val: any) => setEditingCategory(val)}
      />
    </div>
  )
}

export default CategoryTable
