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
  const [productList, setProductList] = useState<Product[]>([])

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
      productList.length > 0 &&
      data?.data &&
      productList.find(item => item._id === data?.data._id),
    [productList, data?.data]
  )
  useEffect(() => {
    const newProductList = existedProduct
      ? productList.map(item =>
          item._id === data?.data._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...productList, { ...data?.data, quantity: 1 }]
    data?.data && setProductList(newProductList)
    setSearchValue('')
  }, [data?.data])

  const onChangeSearchInput = useCallback(
    (e: any) => setSearchValue(e.target.value),
    [searchValue]
  )

  const totalProduct: number = productList.reduce(
    (acc, { quantity }) => acc + quantity,
    0
  )

  const totalPrice: number = productList.reduce(
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
  //         productList={productList}
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
        <title>Thanh to??n</title>
      </Head>
      <div className='container mx-auto mt-5 select-none'>
        <CartInput
          inputValue={searchValue}
          handleSearchValue={onChangeSearchInput}
        />
        <div className='flex-col md:flex-row flex shadow-md my-5'>
          {/* {renderResult()} */}
          <CartListItem
            totalProduct={totalProduct}
            productList={productList}
            setProductList={(newProductList: Product[]) =>
              setProductList(newProductList)
            }
          />
          <CartSumary
            totalProduct={totalProduct}
            productList={productList}
            totalPrice={totalPrice}
            handlePrint={handlePrint}
          />
        </div>
      </div>
      <div className='mt-80'>
        <div
          ref={componentRef}
          className='content-invoice flex flex-col justify-center items-center'>
          <h1 className='text-4xl font-bold mt-2'>R???c r???i shop</h1>
          <div className='mt-2 text-md text-center'>
            ?????a ch???: 223A, Nguy???n V??n Kh???, ???p C??y S???p. T??n An H???i, C??? Chi, TPHCM
            <br />
            S??T/Zalo : 0393.022.997 / 0966.813.400
          </div>
          <h2 className='text-xl font-bold mt-2'>H??a ????n thanh to??n</h2>
          <div>
            Ng??y:{' '}
            {`${new Date().getUTCDate()}/${
              new Date().getUTCMonth() + 1
            }/${new Date().getUTCFullYear()}`}
          </div>

          <table className='table-auto mt-3 border-collapse border'>
            <thead>
              <tr>
                <th className='border p-3'>T??n</th>
                <th className='border p-3'>S??? l?????ng</th>
                <th className='border p-3'>????n gi??</th>
                <th className='border p-3'>Th??nh ti???n</th>
              </tr>
            </thead>
            <tbody>
              {productList.map(item => (
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
                <td className='border border-t-4 text-left p-3'>T???ng</td>
                <td className='border border-t-4 text-right p-3'>
                  {totalProduct}
                </td>
                <td colSpan={2} className='border border-t-4 text-right p-3'>
                  {currencyFormat(totalPrice)}
                </td>
              </tr>
            </tbody>
          </table>
          <div className='mt-4'>Xin c???m ??n qu?? kh??ch v?? h???n g???p l???i!</div>
        </div>
      </div>
    </>
  )
}

export default Cart
