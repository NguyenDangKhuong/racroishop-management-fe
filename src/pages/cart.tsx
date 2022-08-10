import { NextPage } from 'next'
import Head from 'next/head'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import CartInput from '../components/Carts/CartInput'
import CartListItem from '../components/Carts/CartListItem'
import CartSumary from '../components/Carts/CartSumary'
import useDebounce from '../hooks/useDebounce'
import { Product } from '../models/Product'
import { get } from '../utils/api'
import { currencyFormat } from './../utils/currencyFormat'

const Cart: NextPage = () => {
  const [searchValue, setSearchValue] = useState('')
  const [cartList, setCartList] = useState<Product[]>([])

  const debounedSearchValue = useDebounce(searchValue, 1000)

  const { isLoading, isError, isSuccess, data } = useQuery(
    ['searchProduct', debounedSearchValue],
    () => get(`/api/product/sku/${debounedSearchValue}`),
    {
      enabled: debounedSearchValue.length > 0
    }
  )

  const existedProduct = useMemo(
    () =>
      cartList.length > 0 &&
      data?.data &&
      cartList.find(item => item._id === data?.data._id),
    [cartList, data?.data]
  )
  useEffect(() => {
    const newProductList = existedProduct
      ? cartList.map(item =>
          item._id === data?.data._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cartList, { ...data?.data, quantity: 1 }]
    data?.data && setCartList(newProductList)
    setSearchValue('')
  }, [data?.data])

  const onChangeSearchInput = useCallback(
    (e: any) => setSearchValue(e.target.value),
    [searchValue]
  )

  const totalCart: number = cartList.reduce(
    (acc, { quantity }) => acc + quantity,
    0
  )

  const totalPrice: number = cartList.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  )

  // const renderResult = () => {
  //   if (isLoading) {
  //     return <div className='search-message'>Loading...</div>
  //   }
  //   if (isError) {
  //     return <div className='search-message'>Something went wrong</div>
  //   }
  //   if (isSuccess) {
  //     return (
  //       <CartListItem
  //         totalProduct={totalProduct}
  //         cartList={cartList}
  //         setProductList={(newProductList: Product[]) =>
  //           setProductList(newProductList)
  //         }
  //       />
  //     )
  //   }
  //   return <></>
  // }

  //print
  const componentRef: any = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true
  })

  return (
    <>
      <Head>
        <title>Thanh toán</title>
      </Head>
      <div className='container mx-auto mt-5 select-none'>
        <CartInput
          inputValue={searchValue}
          handleSearchValue={onChangeSearchInput}
        />
        <div className='flex-col md:flex-row flex shadow-md my-5'>
          {/* {renderResult()} */}
          <CartListItem
            totalCart={totalCart}
            cartList={cartList}
            setCartList={(newProductList: Product[]) =>
              setCartList(newProductList)
            }
          />
          <CartSumary
            totalCart={totalCart}
            cartList={cartList}
            totalPrice={totalPrice}
            handlePrint={handlePrint}
          />
        </div>
      </div>
      <div className='mt-80'>
        <div
          ref={componentRef}
          className='content-invoice flex flex-col justify-center items-center'>
          <h1 className='text-4xl font-bold mt-2'>Rắc rối shop</h1>
          <div className='mt-2 text-md text-center'>
            Địa chỉ: 223A, Nguyễn Văn Khạ, ấp Cây Sộp. Tân An Hội, Củ Chi, TPHCM
            <br />
            SĐT/Zalo : 0393.022.997 / 0966.813.400
          </div>
          <h2 className='text-xl font-bold mt-2'>Hóa đơn thanh toán</h2>
          <div>
            Ngày:{' '}
            {`${new Date().getUTCDate()}/${
              new Date().getUTCMonth() + 1
            }/${new Date().getUTCFullYear()}`}
          </div>

          <table className='table-auto mt-3 border-collapse border'>
            <thead>
              <tr>
                <th className='border p-3'>Tên</th>
                <th className='border p-3'>Số lượng</th>
                <th className='border p-3'>Đơn giá</th>
                <th className='border p-3'>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {cartList.map(item => (
                <tr key={item._id}>
                  <td className='border text-left p-3'>{item.name}</td>
                  <td className='border text-right p-3'>{item.quantity}</td>
                  <td className='border text-right p-3'>
                    {currencyFormat(item.price)}
                  </td>
                  <td className='border text-right p-3'>
                    {currencyFormat(item.quantity * item.price)}
                  </td>
                </tr>
              ))}
              <tr>
                <td className='border border-t-4 text-left p-3'>Tổng</td>
                <td className='border border-t-4 text-right p-3'>
                  {totalCart}
                </td>
                <td colSpan={2} className='border border-t-4 text-right p-3'>
                  {currencyFormat(totalPrice)}
                </td>
              </tr>
            </tbody>
          </table>
          <div className='mt-4'>Xin cảm ơn quý khách và hẹn gặp lại!</div>
        </div>
      </div>
    </>
  )
}

export default Cart
