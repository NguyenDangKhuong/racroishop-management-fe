import React from 'react'
import { Product } from '../../models/Product'
import { currencyFormat } from '../../utils/currencyFormat'
import TableDropdown from '../Dropdowns/TableDropdown'

const Table = ({
  color = 'light',
  products = []
}: {
  color?: string
  products: Product[]
}) => {
  console.log(products)
  return (
    <div
      className={
        'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg border rounded ' +
        (color === 'light' ? 'bg-white' : 'bg-blueGray-700 text-white')
      }>
      <div className='rounded-t mb-0 px-4 py-3 border-0'>
        <div className='flex flex-wrap items-center'>
          <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
            <h3
              className={
                'font-semibold text-lg ' +
                (color === 'light' ? 'text-blueGray-700' : 'text-white')
              }>
              Danh sách sản phẩm
            </h3>
          </div>
          <span>
            <i className='fas fa-plus text-lg text-emerald-500 mr-4'></i>Thêm
            Sản Phẩm
          </span>
        </div>
      </div>
      <div className='block w-full overflow-x-auto'>
        {/* Projects table */}
        <table className='items-center w-full bg-transparent border-collapse'>
          <thead>
            <tr>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                }>
                Tên
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                }>
                Đơn giá
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                }>
                Số lượng
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                }>
                Danh mục
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                }>
                Mã số
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                }>
                Sửa/Xóa
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map(item => (
              <tr>
                <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center'>
                  <span>{item.name}</span>
                </th>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                  {currencyFormat(item.price)}
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                  {item.stock}
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                  {item.categoryId}
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                  <div className='flex items-center'>{item.sku}</div>
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                  <i className='fas fa-edit text-lg text-emerald-500 mr-4'></i>
                  <i className='fas fa-close text-lg text-emerald-500 mr-2'></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
