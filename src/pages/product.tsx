import { useQuery } from 'react-query'
import Table from '../components/Table'
import { get } from '../utils/api'
import { renderPageWithLayout } from '../utils/renderPageWithLayout'

const Product = () => {

  const { isLoading, isError, isSuccess, data } = useQuery(
    ['fetchProducts'],
    () => get(`/api/products/`),
  )

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
