import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'
import { Category } from '../../models/Category'
import { Product } from '../../models/Product'
import { get, put, remove } from '../../utils/api'
import { currencyFormat } from '../../utils/currencyFormat'
import BarcodeModal from '../BarcodeModal'
import ProductModal from '../ProductModal'

export const initialProduct = {
  name: '',
  price: 0,
  sku: '',
  quantity: 0,
  _id: '',
  image: ''
}

const ProductTable = ({ color = 'light' }: { color?: string }) => {
  const [showModal, setShowModal] = useState(false)
  const [productQuantity, setProductQuantity] = useState(0)
  const [barcodeValue, setBarcodeValue] = useState('')
  const [showBarcodeModal, setShowBarcodeModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product>(initialProduct)
  const [searchValue, setSearchValue] = useState('')

  const queryClient = useQueryClient()

  const mutationDelProduct = useMutation(
    (_id: string) => remove(`/api/product/${_id}`),
    {
      onSuccess: () => {
        queryClient.refetchQueries(['fetchProducts'])
      }
    }
  )

  const { isLoading, isError, isSuccess, data } = useQuery(
    ['fetchProducts'],
    () => get(`/api/products/`)
  )

  const { data: dataCategories } = useQuery(
    ['fetchCategories'],
    () => get(`/api/categories/`).then(res => res.data.categories)
  )

  // const debounedSearchValue = useDebounce(searchValue, 1000)
  // const { dataProduct } = useQuery(
  //   ['searchProduct', debounedSearchValue],
  //   () => get(`/api/product/`, ${debounedSearchValue}),
  //   {
  //     enabled: debounedSearchValue.length > 0
  //   }
  // )

  const mutationPutProduct = useMutation(
    (updatedProduct: Product) => put('/api/product', updatedProduct),
    {
      onSuccess: () => {
        queryClient.refetchQueries(['fetchProducts'])
      }
    }
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
                Ảnh
              </th>
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
                Đơn giá
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-gray-50 text-gray-500 border-gray-100'
                    : 'bg-gray-600 text-gray-200 border-gray-500')
                }>
                Số lượng
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-gray-50 text-gray-500 border-gray-100'
                    : 'bg-gray-600 text-gray-200 border-gray-500')
                }>
                Danh mục
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-gray-50 text-gray-500 border-gray-100'
                    : 'bg-gray-600 text-gray-200 border-gray-500')
                }>
                Mã số
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
            {data?.data.products.map((item: Product) => (
              <tr key={item.sku} className='border-t'>
                <td className='px-6 align-middle text-xs whitespace-nowrap p-4 text-left'>
                  <Image
                    className='h-24'
                    src={item.imageUrl || '/image/product-placeholder.png'}
                    width={100}
                    height={100}
                    alt=''
                  />
                </td>
                <td className='px-6 align-middle text-xs whitespace-nowrap p-4 text-left'>
                  <span>{item.name}</span>
                </td>
                <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                  {currencyFormat(item.price)}
                </td>
                <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                  <i
                    className='fas fa-minus text-lg text-emerald-500 cursor-pointer'
                    onClick={() =>
                      mutationPutProduct.mutate({
                        ...item,
                        quantity: item.quantity - 1
                      })
                    }></i>
                  <input
                    type='number'
                    className='mx-2 px-2 py-1 bg-whiterounded text-sm shadow outline-none focus:outline-none focus:shadow-outline border w-16'
                    value={item.quantity}
                    onChange={() => { }}
                  />
                  <i
                    className='fas fa-plus text-lg text-emerald-500  cursor-pointer'
                    onClick={() =>
                      mutationPutProduct.mutate({
                        ...item,
                        quantity: item.quantity + 1
                      })
                    }></i>
                </td>
                <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                  {String(dataCategories?.find((category: Category) => item.categoryId === category._id)?.name)}
                </td>
                <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                  <div
                    className='flex items-center text-blue-500 font-bold cursor-pointer'
                    onClick={() => {
                      setBarcodeValue(item.sku)
                      setShowBarcodeModal(true)
                      setProductQuantity(item.quantity)
                    }}>
                    {item.sku}
                  </div>
                </td>
                <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                  <i
                    className='fas fa-edit text-lg text-emerald-500 mr-4 cursor-pointer'
                    onClick={() => {
                      setEditingProduct(item)
                      setShowModal(true)
                    }}></i>
                  <i
                    className='fas fa-close text-lg text-emerald-500 mr-2 cursor-pointer'
                    onClick={() => mutationDelProduct.mutate(item._id)}></i>
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
    <>
      {/* Form */}
      <form className='md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3 mb-5'>
        <div className='relative flex w-full flex-wrap items-stretch'>
          <span className='z-10 h-full leading-snug font-normal absolute text-center text-gray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3'>
            <i className='fas fa-search'></i>
          </span>
          <input
            type='text'
            placeholder='Tìm tên sản phẩm '
            className='border px-3 py-3 placeholder-gray-500 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-1/3 pl-10'
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>
      </form>
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
                Danh sách sản phẩm
              </h3>
            </div>
            <span className='cursor-pointer' onClick={() => setShowModal(true)}>
              <i className='fas fa-plus text-lg text-emerald-500 mr-4'></i>Thêm
              Sản Phẩm
            </span>
          </div>
        </div>
        <div className='block w-full overflow-x-auto'>{renderResult()}</div>
        <ProductModal
          showModal={showModal}
          setShowModal={(val: boolean) => setShowModal(val)}
          editingProduct={editingProduct}
          dataCategories={dataCategories}
          setEditingProduct={(val: any) => setEditingProduct(val)}
        />
        <BarcodeModal
          barcodeValue={barcodeValue}
          showBarcodeModal={showBarcodeModal}
          setShowBarcodeModal={(val: boolean) => setShowBarcodeModal(val)}
          productQuantity={productQuantity}
        />
      </div>
    </>
  )
}

export default ProductTable
