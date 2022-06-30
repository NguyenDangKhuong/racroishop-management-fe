import { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import CartInput from '../components/Carts/CartInput'
import CartListItem from '../components/Carts/CartListItem'
import CartSumary from '../components/Carts/CartSumary'
import useDebounce from '../hooks/useDebounce'
import { Product } from '../types/Product'
import { get } from '../utils/api'

const Cart: NextPage = () => {
  const [searchValue, setSearchValue] = useState('')
  const [productList, setProductList] = useState<Product[]>([])

  const debounedSearchValue = useDebounce(searchValue, 1000)

  const { isLoading, isError, isSuccess, data } = useQuery(
    ['searchProduct', debounedSearchValue],
    () => get(`/api/product/${debounedSearchValue}`),
    {
      enabled: debounedSearchValue.length > 0
    }
  )

  const existedProduct = useMemo(
    () =>
      productList.length > 0 &&
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
  return (
    <>
      <Head>
        <title>Thanh toán</title>
      </Head>
      <div className='container mx-auto mt-10'>
        <CartInput
          inputValue={searchValue}
          handleSearchValue={onChangeSearchInput}
        />
        <div className='flex shadow-md my-10'>
          {/* {renderResult()} */}
          <CartListItem
            totalProduct={totalProduct}
            productList={productList}
            setProductList={(newProductList: Product[]) =>
              setProductList(newProductList)
            }
          />
          <CartSumary totalProduct={totalProduct} productList={productList} />
        </div>
      </div>
    </>
  )
}

export default Cart
