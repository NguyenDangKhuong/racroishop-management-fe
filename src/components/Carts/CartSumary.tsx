import { useState } from 'react'
import { Product } from '../../models/Product'
import { currencyFormat } from '../../utils/currencyFormat'

const CartSumary: React.FC<{
  totalCart: number
  cartList: Product[]
  handlePrint: any
  totalPrice: number
}> = ({ totalCart, cartList, handlePrint, totalPrice }) => {
  const [customerCash, setCustomerCash] = useState(0)

  const exchange = customerCash > 0 ? customerCash - totalPrice : 0

  return (
    <div id='summary' className='w-1/4 px-8 py-10'>
      <h1 className='font-semibold text-2xl border-b pb-8'>
        Tổng quan đơn hàng
      </h1>
      <div className='flex justify-between mt-10 mb-5'>
        <span className='font-semibold text-sm uppercase'>
          {totalCart} sản phẩm
        </span>
        <span className='font-semibold text-sm'>
          {currencyFormat(totalPrice)}
        </span>
      </div>
      <div>
        <label className='font-medium inline-block mb-3 text-sm uppercase'>
          Tiền ship
        </label>
        <select className='block p-2 text-gray-600 w-full text-sm'>
          <option>Giao hàng tiết kiệm 0 vnd</option>
        </select>
      </div>
      {/* <div className='py-10'>
        <label
          htmlFor='promo'
          className='font-semibold inline-block mb-3 text-sm uppercase'>
          Mã giảm giá
        </label>
        <input
          type='text'
          id='promo'
          placeholder='Enter your code'
          className='p-2 text-sm w-full'
        />
      </div>
      <button className='bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase'>
        Apply
      </button> */}
      <div className='py-10'>
        <label
          htmlFor='customerPrice'
          className='font-semibold inline-block mb-3 text-sm uppercase'>
          Tiền khách đưa
        </label>
        <input
          type='text'
          id='customerPrice'
          placeholder='Nhập số tiền khách đưa'
          className='p-2 text-sm w-full bg-gray-200'
          value={customerCash || ''}
          onChange={e => setCustomerCash(Number(e.target.value))}
        />
      </div>
      {customerCash > 0 && customerCash < 999 && (
        <>
          <span
            className='text-xs font-semibold inline-block py-1 px-2 rounded border text-gray-600 bg-gray-200 uppercase mr-1 cursor-pointer'
            onClick={() => setCustomerCash(customerCash * 1000)}>
            {currencyFormat(customerCash * 1000)}
          </span>
          <span
            className='text-xs font-semibold inline-block py-1 px-2 rounded border text-gray-600 bg-gray-200 uppercase mr-1 cursor-pointer'
            onClick={() => setCustomerCash(customerCash * 10000)}>
            {currencyFormat(customerCash * 10000)}
          </span>
          <span
            className='text-xs font-semibold inline-block py-1 px-2 rounded border text-gray-600 bg-gray-200 uppercase mr-1 cursor-pointer'
            onClick={() => setCustomerCash(customerCash * 100000)}>
            {currencyFormat(customerCash * 100000)}
          </span>
          <span
            className='text-xs font-semibold inline-block py-1 px-2 rounded border text-gray-600 bg-gray-200 uppercase mr-1 mt-2 cursor-pointer'
            onClick={() => setCustomerCash(customerCash * 1000000)}>
            {currencyFormat(customerCash * 1000000)}
          </span>
        </>
      )}
      <div className='border-t mt-8'>
        <div className='flex font-semibold justify-between py-6 text-sm uppercase'>
          <span>Tổng tiền</span>
          <span>{currencyFormat(totalPrice)}</span>
        </div>
        <button
          className='bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full'
          onClick={handlePrint}>
          Thanh toán
        </button>
      </div>
      <div className='border-t mt-8'>
        <div className='flex font-semibold justify-between py-6 text-sm uppercase'>
          <span>Tiền thối lại cho khách</span>
          <span>{currencyFormat(exchange)}</span>
        </div>
      </div>
    </div>
  )
}

export default CartSumary
