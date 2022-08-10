import CategoryTable from '../components/CategoryTable'
import { renderPageWithLayout } from '../utils/renderPageWithLayout'

const Category = () => {
  return (
    <>
      {renderPageWithLayout(
        <div className='flex flex-wrap mt-4'>
          <div className='w-full mb-12 px-4'>
            <CategoryTable />
          </div>
        </div>
      )}
    </>
  )
}

export default Category
