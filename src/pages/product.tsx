import ProductTable from '../components/ProductTable'
import { renderPageWithLayout } from '../utils/renderPageWithLayout'

const Product = () => {
  return (
    <>
      {renderPageWithLayout(
        <div className='flex flex-wrap mt-4'>
          <div className='w-full mb-12 px-4'>
            <ProductTable />
          </div>
        </div>
      )}
    </>
  )
}

export default Product
