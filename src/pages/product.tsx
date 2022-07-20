import { useQuery } from '@tanstack/react-query'
import Table from '../components/Table'
import { get } from '../utils/api'
import { renderPageWithLayout } from '../utils/renderPageWithLayout'

const Product = () => {

  const { isLoading, isError, isSuccess, data, refetch } = useQuery(
    ['fetchProducts'],
    () => get(`/api/products/`),
  )

  const refetchProduct = refetch

  return (
    <>
      {renderPageWithLayout(
        <div className='flex flex-wrap mt-4'>
          <div className='w-full mb-12 px-4'>
            <Table products={data?.data.products} />
          </div>
        </div>
      )}
    </>
  )
}

export default Product
