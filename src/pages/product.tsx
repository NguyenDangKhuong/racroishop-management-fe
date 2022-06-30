import Table from '../components/Table'
import { renderPageWithLayout } from '../utils/renderPageWithLayout'

const Home = () => {
  return <>{renderPageWithLayout(<Table />)}</>
}

export default Home